<p align="center">
<img src="gatsby-theme-blog-ocean/static/icons/icon.svg?raw=true" width="200"/>
</p>

<h1 align="center">Gatsby Theme Blog Ocean</h1>

Blog Ocean is a Gatsby theme for personal homepages and blogs. It features material design, built-in [MDX](https://mdxjs.com/) support, dark mode, SEO-friendly localization, and more! You can have a look at the live demo at [www.howyoung.dev](https://www.howyoung.dev).

The theme is still under development and more thrilling features will be added to it soon. Meanwhile, it is designed with extendibility in mind, allowing you to customize each part of the website as you wish. Please refer to the section [Customization](#customization) for more details.

## How to install

The theme is available as an NPM package `gatsby-theme-blog-ocean`. Add it as a dependency to your project first with:

```bash
# Use NPM
npm install gatsby-theme-blog-ocean

# Use Yarn
yarn add gatsby-theme-blog-ocean
```

Then add the theme to the `gatsby-config.js` file in your project.

```js
// gatsby-config.js
module.exports = {
  // ...
  plugins: [
    // ...
    `gatsby-theme-blog-ocean`,
  ]
}
```

For most cases, you may want to specify your own options, which can be configured using:

```js
// gatsby-config.js
module.exports = {
  // ...
  plugins: [
    // ...
    {
      resolve: `gatsby-theme-blog-ocean`,
      options: {
        languages: ['en', 'zh']
        // ...
      }
    }
  ]
}
```

For more options available, please refer to the section [Available options](available-options).

## Available options

|Name|Type|Default Value|Description|
|--|--|--|--|
|postsSource|string|`'posts'`|Name of the posts source passed to the `gatsby-source-filesystem` plugin|
|postsFolderLayout|string|`'/:lang/:segment+'`|Layout of the posts folder|
|postsPathTemplate|string|`'/:lang?/posts/:segment+'`|Path template for the posts|
|languages|array of string|`['en']`|List of supported languages|
|defaultLanguage|string|`'en'`|Default language|
|i18nOptions|object|`{}`|Custom i18n options|
|excerptLength|number|`200`|Length of the excerpt of posts|
|title|string|`'Ocean Blog'`|The title of the site|
|description|string|`'A theme of blog and personal homepage for Gatsby.'`|Description for the site|
|siteUrl|string|`'https://www.example.com'`|URL of the site|
|localesSource|string|`'locales'`|Name of locale source passed to the `gatsby-source-filesystem` plugin|
|rssPath|string|`'/rss.xml'`|Path for the RSS feed file|
|rssTitle|string|Same as `title`|Title of the RSS feed|

## Examples of usage

Please refer to the `example` folder for a minimal example to use the theme.

To create posts, you need to create a posts folder and expose it as a source using the `gatsby-source-filesystem` plugin.

```js
// plugins in gatsby-config.js
{
  resolve: `gatsby-source-filesystem`,
  options: {
    path: `posts`,
    name: `posts`
  }
}
```

To support multiple locales, layout the posts as specified by the `postsFolderLayout` option, which is parsed with [path-to-regexp](https://github.com/pillarjs/path-to-regexp). A template for the generated path of posts can also be configured using `postsPathTemplate`. The language code (`/:lang` as in the default value) is recommended for an SEO-friendly localization.

## Customization

### Site metadata

Some of the components are automatically customized with the site metadata. `title`, `description`, and `siteUrl` passed to the options will be added to the metadata by default. You may also want to add `social` to it and it will appear on the banner.

```js
module.exports = {
  // ...
  siteMetadata: {
    // ...
    social: [
      {
        name: `GitHub`,
        url: `https://github.com/HowyoungZhou`,
      },
      {
        name: `Email`,
        url: `mailto:me@howyoung.dev`,
      },
      // ...
    ]
  }
}
```

### Add a new locale

To customize the text or add the translation for a new language. You need to add a locales folder and again expose it as a source using the `gatsby-source-filesystem` plugin.

```js
// plugins in gatsby-config.js
{
  resolve: `gatsby-source-filesystem`,
  options: {
    path: `locales`,
    name: `locales`
  }
}
```

Now copy the `en` folder in `gatsby-theme-blog-ocean/src/locales`, rename it to the new language code, and replace the translation in the `.json` files inside.

### Overwrite components or pages

If you want to deeply customize the components or pages, you may want to overwrite them using the [shadowing](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/) features of Gatsby.

To replace a file in the `gatsby-theme-blog-ocean/src` folder of the theme, you should place the file in the same relative path to the `src/gatsby-theme-blog-ocean` folder of your project.

To reuse part of the original components, you can import them from the `gatsby-theme-blog-ocean` package.

## How to run tests

Testing is still in progress.

## How to develop locally

Clone the repository and install the dependencies:

```bash
git clone https://github.com/HowyoungZhou/gatsby-theme-blog-ocean.git
yarn install
```

Start the development server:

```bash
yarn develop
```

Edit the code and you will see the change applies with hot-reload.

## How to contribute

Your generous contribution is highly appreciated! If you wish to contribute to the project, please fork this repository and edit it, then open up a Pull Request.
