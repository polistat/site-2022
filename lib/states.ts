import fs from "fs";
import path from "path";
import matter, { GrayMatterFile } from "gray-matter";
import util from "util";

const readFile = util.promisify(fs.readFile);
const senateDirPath = path.join(process.cwd(), "content", "senate");
const governorsDirPath = path.join(process.cwd(), "content", "governors");

// TODO: Fetch prediction data for slugs instead
export const getSenateSlugs = () => {
  const files = fs.readdirSync(senateDirPath);
  return files.map((file) => {
    return {
      params: {
        slug: file.replace(".mdx", "").replace(".md", ""),
      },
    };
  });
}

export const getGovernorsSlugs = () => {
  const files = fs.readdirSync(governorsDirPath);
  return files.map((file) => {
    return {
      params: {
        slug: file.replace(".mdx", "").replace(".md", ""),
      },
    };
  });
}

export const getSenateData = async (slug: string): Promise<Pick<GrayMatterFile<string>, "data" | "content">> => {
  const fileContent = await readFile(path.join(senateDirPath, `${slug}.mdx`), "utf-8");
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
  const fileContent = await readFile(path.join(governorsDirPath, `${slug}.mdx`), "utf-8");
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