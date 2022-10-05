import fs from "fs";
import path from "path";
import matter, { GrayMatterFile } from "gray-matter";
import { octokit } from "./octokit";
import util from "util";

const readFile = util.promisify(fs.readFile);
const senateDirPath = path.join(process.cwd(), "content", "senate");
const governorsDirPath = path.join(process.cwd(), "content", "governors");

export const getSenateSlugs = async () => {
  const slugs = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'content-2022',
    path: `races/senate`
  }).then((res:any) => {
    return res.data.map((file:any) => {
      return {
        params: {
          slug: file.name.replace(".md", ""),
        },
      };
    });
  })
  .catch(err => console.error(err));

  return slugs;
}

export const getGovernorsSlugs = async () => {
  const slugs = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'content-2022',
    path: `races/governor`
  }).then((res:any) => {
    return res.data.map((file:any) => {
      return {
        params: {
          slug: file.name.replace(".md", ""),
        },
      };
    });
  })
  .catch(err => console.error(err));

  return slugs;
}

export const getSenateData = async (slug: string): Promise<Pick<GrayMatterFile<string>, "data" | "content">> => {
  const fileContent = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'content-2022',
    path: `races/senate/${slug}.md`
  }).then((fileRes:any) => {
    const encoded = fileRes.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    return decoded;
  })
  .catch(err => console.error(err));
  const { data, content } = matter(fileContent);

  const date = (new Date(data.date)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return { data: { ...data, date }, content };
}

export const getGovernorsData = async (slug: string): Promise<Pick<GrayMatterFile<string>, "data" | "content">> => {
  const fileContent = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'content-2022',
    path: `races/governor/${slug}.md`
  }).then((fileRes:any) => {
    const encoded = fileRes.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    return decoded;
  })
  .catch(err => console.error(err));
  const { data, content } = matter(fileContent);

  const date = (new Date(data.date)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return { data: { ...data, date }, content };
}