import createMDX from '@next/mdx';

import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';

import rehypeSlug from 'rehype-slug';
import rehypeMathjax from 'rehype-mathjax';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, /*remarkBreaks,*/ remarkMath],
    rehypePlugins: [rehypeSlug, rehypeMathjax],
    providerImportSource: '@mdx-js/react', // for MDXProvider
  },
});

export default withMDX(nextConfig);
