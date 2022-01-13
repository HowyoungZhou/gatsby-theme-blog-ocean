const { match, compile } = require("path-to-regexp");
const path = require(`path`)
const {
  createFilePath,
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`)
const { createContentDigest, slash } = require(`gatsby-core-utils`)


exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    postsSource: Joi.string().default('posts').description('Name of the source passed to gatsby-source-filesystem'),
    postsFolderLayout: Joi.string().default('/:lang/:segment+').description('Layout of the posts folder'),
    postsPathTemplate: Joi.string().default('/:lang?/posts/:segment+').description('Path template for posts'),
    languages: Joi.array().items(Joi.string()).default(['en']).description('List of languages'),
    defaultLanguage: Joi.string().default('en').description('Default language'),
    i18nOptions: Joi.object().default({}),
    excerptLength: Joi.number().min(0).default(200).description('Length of the excerpt'),
  });
}


const mdxResolverPassthrough = (fieldName) => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`);
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  });
  return result;
}

function processRelativeImage(source, context, type) {
  // Image is a relative path - find a corresponding file
  const mdxFileNode = context.nodeModel.findRootNodeAncestor(
    source,
    (node) => node.internal && node.internal.type === `File`
  )
  if (!mdxFileNode) return;
  const imagePath = slash(path.join(mdxFileNode.dir, source[type]))

  const fileNodes = context.nodeModel.getAllNodes({ type: `File` })
  return fileNodes.find(node => node.absolutePath === imagePath)
}

exports.createSchemaCustomization = ({ actions, schema }, themeOptions) => {
  const { excerptLength } = themeOptions;
  const { createTypes } = actions;
  createTypes(`interface BlogPost implements Node {
      id: ID!
      title: String!
      body: String!
      slug: String!
      date: Date! @dateformat
      tags: [String]!
      excerpt: String!
      image: File
      imageAlt: String
      imageCaptionText: String
      imageCaptionLink: String
      socialImage: File
      tableOfContents: JSON
  }`);

  createTypes(
    schema.buildObjectType({
      name: `MdxBlogPost`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`,
        },
        slug: {
          type: `String!`,
        },
        date: { type: `Date!`, extensions: { dateformat: {} } },
        tags: { type: `[String]!` },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: excerptLength,
            },
          },
          resolve: mdxResolverPassthrough(`excerpt`),
        },
        image: {
          type: `File`,
          resolve: async (source, args, context) => {
            if (source.image___NODE) {
              return context.nodeModel.getNodeById({ id: source.image___NODE })
            } else if (source.image) {
              return processRelativeImage(source, context, `image`)
            }
          },
        },
        imageAlt: {
          type: `String`,
        },
        imageCaptionText: {
          type: `String`,
        },
        imageCaptionLink: {
          type: `String`,
        },
        socialImage: {
          type: `File`,
          resolve: async (source, args, context) => {
            if (source.socialImage___NODE) {
              return context.nodeModel.getNodeById({
                id: source.socialImage___NODE,
              })
            } else if (source.socialImage) {
              return processRelativeImage(source, context, `socialImage`)
            }
          },
        },
        tableOfContents: {
          type: `JSON`,
          resolve: mdxResolverPassthrough(`tableOfContents`),
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`),
        },
      },
      interfaces: [`Node`, `BlogPost`],
      extensions: {
        infer: false,
      },
    })
  );
}

function validURL(str) {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

// Create fields for post slugs and source
exports.onCreateNode = async (
  { node, actions, getNode, createNodeId, store, cache },
  themeOptions
) => {
  const { createNode, createParentChildLink } = actions;
  const { postsSource, postsFolderLayout, postsPathTemplate, defaultLanguage } = themeOptions;
  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) return;

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (source !== postsSource) return;

  let slug;
  if (node.frontmatter.slug) {
    // a relative slug gets turned into a sub path
    slug = node.frontmatter.slug;
  } else {
    // otherwise use the filepath function from gatsby-source-filesystem
    const path = createFilePath({
      node: fileNode,
      getNode,
    });

    const pathMatch = match(postsFolderLayout)(path);
    if (!pathMatch) reporter.panic(`Path ${path} does not match the layout ${postsFolderLayout}`);

    const params = pathMatch.params;
    // remove default language from slug
    if (params.lang === defaultLanguage) params.lang = undefined;
    slug = compile(postsPathTemplate)(params);
  }

  // normalize use of trailing slash
  slug = slug.replace(/\/*$/, `/`);

  const fieldData = {
    title: node.frontmatter.title,
    tags: node.frontmatter.tags || [],
    slug,
    date: node.frontmatter.date,
    image: node.frontmatter.image,
    imageAlt: node.frontmatter.imageAlt,
    imageCaptionText: node.frontmatter.imageCaptionText,
    imageCaptionLink: node.frontmatter.imageCaptionLink,
    socialImage: node.frontmatter.socialImage,
  };

  if (validURL(node.frontmatter.image)) {
    // create a file node for image URLs
    const remoteFileNode = await createRemoteFileNode({
      url: node.frontmatter.image,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
    })
    // if the file was created, attach the new node to the parent node
    if (remoteFileNode) {
      fieldData.image___NODE = remoteFileNode.id;
    }
  }

  if (validURL(node.frontmatter.socialImage)) {
    // create a file node for image URLs
    const remoteFileNode = await createRemoteFileNode({
      url: node.frontmatter.socialImage,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
    })
    // if the file was created, attach the new node to the parent node
    if (remoteFileNode) {
      fieldData.socialImage___NODE = remoteFileNode.id;
    }
  }

  const mdxBlogPostId = createNodeId(`${node.id} >>> MdxBlogPost`);
  await createNode({
    ...fieldData,
    // Required fields.
    id: mdxBlogPostId,
    parent: node.id,
    children: [],
    internal: {
      type: `MdxBlogPost`,
      contentDigest: createContentDigest(fieldData),
      content: JSON.stringify(fieldData),
      description: `Mdx implementation of the BlogPost interface`,
    },
  });
  createParentChildLink({ parent: node, child: getNode(mdxBlogPostId) });
}

const PostTemplate = require.resolve(`./src/templates/post-query`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  // Create Posts and Post pages.
  const { allBlogPost } = result.data;
  const posts = allBlogPost.nodes;

  // Create a page for each Post
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1];
    const next = index === 0 ? null : posts[index - 1];
    const { slug } = post;
    createPage({
      path: slug,
      component: PostTemplate,
      context: {
        id: post.id,
        previousId: previous ? previous.id : undefined,
        nextId: next ? next.id : undefined,
      },
    });
  })
}
