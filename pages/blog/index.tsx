import Head from 'next/head';
import Link from 'next/link';
import { getBlogList } from "../../lib/blog";

export default function SenatePage({ posts }: { posts: any }) {
    return <>
    <Head>
      <title>Blog – ORACLE of Blair</title>
      <meta name="description" content="A collection of in-depth analyses of ORACLE's model and predictions. The ORACLE (Overall Results of an Analytical Consideration of the Looming Elections) of Blair is a senior class project at Montgomery Blair High School with the goal of modeling the 2022 senate and gubernatorial elections."/>
      <meta itemProp="description" content="A collection of in-depth analyses of ORACLE's model and predictions. The ORACLE (Overall Results of an Analytical Consideration of the Looming Elections) of Blair is a senior class project at Montgomery Blair High School with the goal of modeling the 2022 senate and gubernatorial elections."/>
      <meta property="og:title" content="2022 Senate Forecast – ORACLE of Blair"/>
      <meta property="og:description" content="A collection of in-depth analyses of ORACLE's model and predictions. The ORACLE (Overall Results of an Analytical Consideration of the Looming Elections) of Blair is a senior class project at Montgomery Blair High School with the goal of modeling the 2022 senate and gubernatorial elections."/>
      <meta name="twitter:title" content="2022 Senate Forecast – ORACLE of Blair"/>
      <meta name="twitter:description" content="A collection of in-depth analyses of ORACLE's model and predictions. The ORACLE (Overall Results of an Analytical Consideration of the Looming Elections) of Blair is a senior class project at Montgomery Blair High School with the goal of modeling the 2022 senate and gubernatorial elections."/>
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
      posts: posts || []
    },
    revalidate: 3600 // 1 hour
  };
}
