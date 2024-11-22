"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Typography, Link, Box } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'; // 使用 Prism 主题
import { useTheme } from "@emotion/react";

function Markdown({ markdown }) {
    const theme = useTheme();

    // 自定义 MUI 渲染组件
    const MarkdownComponents = {
        h1: ({ node, ...props }) => (
            <Typography variant="h4" gutterBottom {...props} />
        ),
        h2: ({ node, ...props }) => (
            <Typography variant="h5" gutterBottom {...props} />
        ),
        h3: ({ node, ...props }) => (
            <Typography variant="h6" gutterBottom {...props} />
        ),
        p: ({ node, ...props }) => (
            <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }} {...props} />
        ),
        a: ({ node, ...props }) => (
            <Link {...props} color="primary" />
        ),
        li: ({ node, ...props }) => (
            <Typography component="li" variant="body1" {...props} />
        ),
        code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={theme.palette.mode === 'dark'? oneDark : solarizedlight} // 选择一个高亮主题
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <Box
                    component="code"
                    sx={{
                        backgroundColor: 'grey.200',
                        padding: '2px 4px',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        fontFamily: 'monospace',
                    }}
                    {...props}
                >
                    {children}
                </Box>
            );
        },
        // 其他标签可以根据需要添加
    };
    return (
        <Box >
            <ReactMarkdown
                children={markdown}
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={MarkdownComponents}
            />
        </Box>
    );
}

export default Markdown;