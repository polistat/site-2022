import { getCandidates } from '../../lib/results';
import { getBlogSlugs } from "../../lib/blog";

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate('/');
    await res.revalidate('/methodology');

    await res.revalidate('/senate');
    await res.revalidate('/governors');

    const candidates = await getCandidates();
    await Promise.all(Object.keys(candidates.senate).map(async a => await res.revalidate(`/senate/${a}`)));
    await Promise.all(Object.keys(candidates.governor).map(async a => await res.revalidate(`/governors/${a}`)));

    await res.revalidate('/blog');
    const blogSlugs = await getBlogSlugs();
    await Promise.all(blogSlugs.map(async a => await res.revalidate(`/blog/${a.params.slug}`)));

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}