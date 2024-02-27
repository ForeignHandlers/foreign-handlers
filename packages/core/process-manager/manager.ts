import { Process } from './process';

export class ProcessManager {
  private static instance: ProcessManager;
  private readonly processes: Record<string, Process> = {};

  constructor() {
    if (ProcessManager.instance) {
      // eslint-disable-next-line no-constructor-return -- singleton
      return ProcessManager.instance;
    }

    ProcessManager.instance = this;
  }

  create(id: string, command: string, args: string[]) {
    this.processes[id] = new Process(command, args);
  }

  get(id: string) {
    return this.processes[id];
  }
}
