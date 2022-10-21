import matter, { GrayMatterFile } from "gray-matter";
import { octokit } from "./octokit";

export const getBlogList = async () => {
  const posts = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'content-2022',
    path: `blog`
  }).then(async (res) => {
    if (!Array.isArray(res.data)) return;
    return Promise.all(res.data.map(async (file) => {
      const slug = file.name.replace(".md", "");
      const fileContent = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'polistat',
        repo: 'content-2022',
        path: `blog/${file.name}`
      }).then((fileRes) => {
        if (!("content" in fileRes.data)) return;
        const encoded = fileRes.data.content.replace(/\s/g, '');
        const decoded = decodeURIComponent(escape(atob(encoded)));
        return decoded;
      })
      .catch(err => console.error(err));
      
      const { data } = matter(fileContent ?? "Unable to locate file.");
  
      const date = (new Date(data.date)).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });

      return {
        slug,
        ...data,
        date,
      };
    }));
  })
  .catch(err => console.error(err));

  return posts ?? [];
}

export const getBlogSlugs = async () => {
  const slugs = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'content-2022',
    path: `blog`
  }).then((res) => {
    if (!Array.isArray(res.data)) return [];
    return res.data.map((file) =>
      ({
        params: {
          slug: file.name.replace(".md", ""),
        },
      })
    );
  })
  .catch(err => console.error(err));

  return slugs;
}

export const getBlogData = async (slug: string): Promise<Pick<GrayMatterFile<string>, "data" | "content">> => {
  const fileContent = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'content-2022',
    path: `blog/${slug}.md`
  }).then((fileRes) => {
    if (!("content" in fileRes.data)) return;
    const encoded = fileRes.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    return decoded;
  })
  .catch(err => console.error(err));

  const { data, content } = matter(fileContent ?? "Unable to locate file.");

  const date = (new Date(data.date)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return { data: { ...data, date }, content };
}

export const getMethodologyData = async () => {
  const fileContent = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'content-2022',
    path: `methodology.md`
  }).then((fileRes) => {
    if (!("content" in fileRes.data)) return;
    const encoded = fileRes.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    return decoded;
  })
  .catch(err => console.error(err));
  const { data, content } = matter(fileContent ?? "Unable to locate file.");

  const date = (new Date(data.date)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return { data: { ...data, date }, content };
}