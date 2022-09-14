import createMDX from '@next/mdx';

import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

import rehypeSlug from 'rehype-slug';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [rehypeSlug],
    providerImportSource: '@mdx-js/react', // for MDXProvider
  },
});

export default withMDX(nextConfig);
