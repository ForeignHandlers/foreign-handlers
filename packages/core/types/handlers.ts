import { Functions, Handlers } from '$core/generated';

import { FilePath } from './files';
import { SupportedLanguages } from './languages';

export type HandlersData = {
  language: SupportedLanguages;
  path: FilePath;
};

export type TargetFunction<
  Language extends SupportedLanguages,
  Type extends Handlers[Language],
> = (arg: Functions[Type]['args']) => Promise<Functions[Type]['response']>;
