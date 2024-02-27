import { PYTHON } from '$core/constants';
import { SupportedLanguages } from '$core/types';

export const MODULES = 'modules';

export const extensionMapper: Record<SupportedLanguages, string> = {
  [PYTHON]: 'py',
};

export const filesInit: Record<SupportedLanguages, string[]> = {
  [PYTHON]: [],
};
