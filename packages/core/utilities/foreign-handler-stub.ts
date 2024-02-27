import { Functions, Handlers } from '$core/generated';
import { SupportedLanguages } from '$core/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- stub
export const foreignHandlerStub = <
  Language extends SupportedLanguages,
  Type extends Handlers[Language],
>(): Functions[Type]['response'] => {
  return {} as Functions[Type]['response'];
};
