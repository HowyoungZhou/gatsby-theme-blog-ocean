import { styled } from '@mui/material';
import { Highlight, Language, PrismTheme } from 'prism-react-renderer';
import React from 'react';

export interface CodeBlockProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  theme?: PrismTheme;
}

export default function CodeBlock({ children, className, theme, sx }: CodeBlockProps) {
  const lang = className?.match(/language-(?<lang>.*)/)?.groups?.lang || '';

  return (
    <Highlight
      code={children.trim()}
      language={lang as Language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        const Code = React.useMemo(() => styled('code')({
          display: 'block',
          ...style,
        }), [style]);
        return (
          <Code className={className} sx={sx}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Code>
        )
      }}
    </Highlight>
  )
}
