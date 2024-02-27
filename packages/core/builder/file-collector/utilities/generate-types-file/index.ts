import { supportedLanguages } from '$core/constants';
import { SupportedLanguages } from '$core/types';

import { emptyLine, fileImport, handlersData, handlersType } from './constants';
import {
  generateHandlerDataContent,
  generateHandlersTypeContent,
} from './utilities';

export const generateTypesFile = (
  aliases: Record<SupportedLanguages, string[]>,
  files: Record<SupportedLanguages, string[]>,
) => {
  let handlersTypeContent: string[] = [];
  let handlersDataContent: string[] = [];

  supportedLanguages.forEach((supportedLanguage) => {
    generateHandlersTypeContent(
      supportedLanguage,
      aliases,
      handlersTypeContent,
    );
    generateHandlerDataContent(
      supportedLanguage,
      files,
      aliases,
      handlersDataContent,
    );
  });

  handlersTypeContent = [
    handlersType.start,
    ...handlersTypeContent,
    handlersType.end,
  ];

  handlersDataContent = [
    handlersData.start,
    ...handlersDataContent,
    handlersData.end,
  ];

  const handlersGeneratedType = handlersTypeContent.join('\n');
  const handlersGeneratedData = handlersDataContent.join('\n');

  const fileContent = `${fileImport}${emptyLine}${handlersGeneratedType}${emptyLine}${handlersGeneratedData}`;

  return fileContent;
};
