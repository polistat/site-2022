import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dirPath = path.join(process.cwd(), "content", "blog");

export const getBlogList = () => {
  const files = fs.readdirSync(dirPath);
  const posts = files.map((file) => {
    const slug = file.replace(".mdx", "").replace(".md", "");
    const fileContent = fs.readFileSync(path.join(dirPath, file), "utf-8");
    const { data } = matter(fileContent);
    return {
      slug,
      ...data,
    };
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

export const getBlogData = (slug) => {
  const fileContent = fs.readFileSync(path.join(dirPath, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(fileContent);
  return { data, content };
}