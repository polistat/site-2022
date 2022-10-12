import { getCandidates } from '../../lib/results';
import { getBlogSlugs } from "../../lib/blog";

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const candidates = await getCandidates();
    const blogSlugs = await getBlogSlugs();

    switch (req.query.query) {
      case 'races':
        await res.revalidate('/');
        await res.revalidate('/senate');
        await res.revalidate('/governors');
        await Promise.all(Object.keys(candidates.senate).map(async a => await res.revalidate(`/senate/${a}`)));
        await Promise.all(Object.keys(candidates.governor).map(async a => await res.revalidate(`/governors/${a}`)));
        break;
      case 'blog':
        await res.revalidate('/blog');
        await Promise.all(blogSlugs.map(async a => await res.revalidate(`/blog/${a.params.slug}`)));
        break;
      case 'methodology':
        await res.revalidate('/methodology');
        break;
      default:
        await res.revalidate('/');
        await res.revalidate('/methodology');

        await res.revalidate('/senate');
        await res.revalidate('/governors');
        await Promise.all(Object.keys(candidates.senate).map(async a => await res.revalidate(`/senate/${a}`)));
        await Promise.all(Object.keys(candidates.governor).map(async a => await res.revalidate(`/governors/${a}`)));

        await res.revalidate('/blog');
        await Promise.all(blogSlugs.map(async a => await res.revalidate(`/blog/${a.params.slug}`)));
        break;
    }

    return res.json({
      message: 'Success!',
      revalidated: true,
      query: req.query.query || 'all',
    });
  } catch (err) {
    return res.status(500).json({
      message: `Error: ${err.message}`,
      revalidated: false,
      query: req.query.query || 'all',
    });
  }
}