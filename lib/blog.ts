import fs from "fs";
import path from "path";
import matter, { GrayMatterFile } from "gray-matter";
import util from "util";

const readFile = util.promisify(fs.readFile);
const dirPath = path.join(process.cwd(), "content", "blog");

export const getBlogList = () => {
  const files = fs.readdirSync(dirPath);
  const posts = files.map((file) => {
    const slug = file.replace(".mdx", "").replace(".md", "");
    const fileContent = fs.readFileSync(path.join(dirPath, file), "utf-8");
    const { data } = matter(fileContent);

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
  }).sort((a:any,b:any) => {
    return (new Date(a.date) > new Date(b.date) ? -1 : 1)
  });
  return posts;
}

export const getBlogSlugs = () => {
  const files = fs.readdirSync(dirPath);
  return files.map((file) => {
    return {
      params: {
        slug: file.replace(".mdx", "").replace(".md", ""),
      },
    };
  });
}

export const getBlogData = async (slug: string): Promise<Pick<GrayMatterFile<string>, "data" | "content">> => {
  const fileContent = await readFile(path.join(dirPath, `${slug}.mdx`), "utf-8");
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