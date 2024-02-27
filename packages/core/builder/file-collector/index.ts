import { supportedLanguages } from '$core/constants';
import { FilePath, SupportedLanguages } from '$core/types';

import { extensionMapper, filesInit, MODULES } from './constants';
import {
  generateFileNameAlias,
  generateTypesFile,
  getFileNames,
  updateGeneratedTypesFile,
} from './utilities';

export const fileCollector = (path: FilePath) => {
  const languageFiles: Record<SupportedLanguages, string[]> = filesInit;

  supportedLanguages.forEach((supportedLanguage) => {
    const scriptFiles = getFileNames(path, {
      recursive: true,
      extension: extensionMapper[supportedLanguage],
    });

    languageFiles[supportedLanguage].push(
      ...scriptFiles.filter((scriptFile) => {
        return scriptFile.split('/')[0] === MODULES;
      }),
    );
  });

  const filesAliases = Object.entries(languageFiles).reduce(
    (aliases, [language, files]) => {
      return {
        ...aliases,
        [language]: files.map((file) => {
          return generateFileNameAlias(file);
        }),
      };
    },
    {} as Record<SupportedLanguages, string[]>,
  );

  const fileContent = generateTypesFile(filesAliases, languageFiles);

  updateGeneratedTypesFile(fileContent);
};
