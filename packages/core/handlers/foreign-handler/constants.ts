import { PYTHON } from '$core/constants';
import { SupportedLanguages } from '$core/types';

export const runCommandMapper: Record<SupportedLanguages, string> = {
  [PYTHON]: 'python3',
};
