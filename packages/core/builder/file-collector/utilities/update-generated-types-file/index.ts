import fs from 'fs';
import path from 'path';

import { pathToGeneratedFiles } from './constants';

export const updateGeneratedTypesFile = (fileContent: string) => {
  const generatedFilesPath = path.join(__filename, pathToGeneratedFiles);

  fs.writeFileSync(generatedFilesPath, fileContent);
};
