import fs from 'fs';

import { FileExtension, FilePath } from '../../../types';

type Options = {
  encoding?: BufferEncoding;
  extension?: FileExtension;
  recursive?: boolean;
};

export const getFileNames = (path: FilePath, options?: Options): string[] => {
  const { encoding = null, extension, recursive } = options ?? {};

  const files = fs.readdirSync(path, { recursive, encoding });

  if (!extension) {
    return files;
  }

  return files.filter((file) => {
    return file.endsWith(`.${extension}`);
  });
};
