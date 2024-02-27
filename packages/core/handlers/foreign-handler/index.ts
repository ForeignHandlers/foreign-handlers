import { Functions, Handlers, handlersData } from '$core/generated';
import { ProcessManager } from '$core/process-manager';
import { SupportedLanguages, TargetFunction } from '$core/types';

import { runCommandMapper } from './constants';

const processManager = new ProcessManager();

export const foreignHandler =
  <Language extends SupportedLanguages, Type extends Handlers[Language]>(
    handler: Type,
  ): TargetFunction<Language, Type> =>
  async (arg) => {
    let process = processManager.get(handler);

    if (!process) {
      const { language, path } = handlersData[handler];

      const runCommand = runCommandMapper[language];

      processManager.create(handler, runCommand, [path]);
      process = processManager.get(handler);
    }

    const response = await process.execute(JSON.stringify(arg));

    return JSON.parse(response) as Functions[Type]['response'];
  };
