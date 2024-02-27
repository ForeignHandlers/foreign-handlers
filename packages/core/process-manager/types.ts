import { ProcessExternalEvent } from './enums';

export type EventCallbacks = {
  [ProcessExternalEvent.DATA]: (data: string) => void;
};
