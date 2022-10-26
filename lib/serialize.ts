import { serialize as mdxSerialize } from 'next-mdx-remote/serialize';

import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';

import rehypeSlug from 'rehype-slug';
import rehypeMathjax from 'rehype-mathjax';

export const serialize:any = async (content: any, data: any) => {
  return await mdxSerialize(content, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [remarkGfm, /*remarkBreaks, remarkMath*/],
      rehypePlugins: [rehypeSlug, /*rehypeMathjax*/],
    },
  });
}