import { SupportedLanguages } from '$core/types';

import { tab } from './constants';

export const generateHandlersTypeContent = (
  supportedLanguage: SupportedLanguages,
  aliases: Record<SupportedLanguages, string[]>,
  handlersTypeContent: string[],
) => {
  const languageAliases = aliases[supportedLanguage];

  if (languageAliases.length === 0) {
    return handlersTypeContent.push(`${tab}${supportedLanguage}: never;`);
  }

  const handlerTypeContent = `${tab}${supportedLanguage}: ${languageAliases
    .map((alias) => {
      return `'${alias}'`;
    })
    .join(' | ')};`;

  handlersTypeContent.push(handlerTypeContent);
};

export const generateHandlerDataContent = (
  supportedLanguage: SupportedLanguages,
  files: Record<SupportedLanguages, string[]>,
  aliases: Record<SupportedLanguages, string[]>,
  handlersDataContent: string[],
) => {
  const languageFiles = files[supportedLanguage];
  const languageAliases = aliases[supportedLanguage];

  if (languageFiles.length === 0) {
    return;
  }

  languageFiles.forEach((file, index) => {
    const alias = languageAliases[index];

    const handlerDataContent = `${tab}'${alias}': { language: '${supportedLanguage}', path: '${file}' }`;

    handlersDataContent.push(handlerDataContent);
  });
};
