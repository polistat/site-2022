import Head from 'next/head';
import Link from 'next/link';
import { getBlogList } from "../../lib/blog";

export default function SenatePage({ posts }: { posts: any }) {
    return <>
    <Head>
      <title>Blog – ORACLE of Blair</title>
      {/* <meta name="description" content="" /> */}
    </Head>

    <div className="container max-w-2xl">
      <header className="pt-12 pb-8 px-8">
        <h1 className="text-4xl text-center font-extrabold font-serif">Blog</h1>
        {/* <p className="mt-2 text-lg text-center">Description of the blog</p> */}
      </header>

      <main className="p-4 flex flex-col gap-6">
        {posts.map((post:any) =>
          <article
            key={post.slug}
            className="p-4 border-2 border-neutral-200 rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-semibold">
              <Link href={`/blog/${post.slug}`} passHref>
                <a className="hover:underline">
                  {post.title}
                </a>
              </Link>
            </h3>
            <p className=" text-neutral-400 italic">
              {post.date}
            </p>
            <p className="mt-1.5 leading-5">
              {post.description}
            </p>
          </article>
        )}
      </main>
    </div>
  </>;
}

export async function getStaticProps() {
  const posts = await getBlogList();
  return {
    props: {
      posts
    }
  };
}
