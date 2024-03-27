import { promises as fs } from "fs";

import cache from "./cache";

export default async function openFile(
  path: string,
  useCache = true
): Promise<any> {
  const key = `${path}`;

  if (useCache) {
    if (cache.has(key)) {
      console.log("CACHE --> FILE"); //, key);
      return Promise.resolve(cache.get(key));
    }
  }

  try {
    const file = await fs.readFile(path, "utf8");

    if (useCache) {
      console.log("CACHE <-- FILE"); //, key);

      cache.set(key, file);
    }

    return file;
  } catch {
    return undefined;
  }
}
