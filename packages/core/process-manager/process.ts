import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { EventEmitter } from 'events';

import { ForeignExecutionError } from '$core/errors';

import { ProcessExternalEvent, ProcessInternalEvent } from './enums';
import { EventCallbacks } from './types';

export class Process extends EventEmitter {
  private newData?: string;
  private process: ChildProcessWithoutNullStreams;
  public pid?: number;

  constructor(command: string, args: string[]) {
    super();

    this.process = spawn(command, args);
    this.pid = this.process.pid;

    this.subscribe();
  }

  private subscribe() {
    this.process.stdout.on(ProcessInternalEvent.DATA, this.onData.bind(this));
    this.process.stderr.on(ProcessInternalEvent.DATA, this.onError.bind(this));
  }

  private onError(chunk: Buffer | string) {
    const message = String(chunk);

    throw new ForeignExecutionError(message);
  }

  private onData(chunk: Buffer | string) {
    const message = String(chunk);

    this.newData = message;
    this.emit(ProcessExternalEvent.DATA, message);
  }

  execute(data: string): Promise<string> {
    this.process.stdin.write(`${data}\n`);

    return new Promise<string>((resolve) => {
      const interval = setInterval(() => {
        if (!this.newData) {
          return;
        }

        const receivedData = this.newData;

        this.newData = undefined;
        clearInterval(interval);

        resolve(receivedData);
      }, 1);
    });
  }

  on<Event extends ProcessExternalEvent>(
    event: Event,
    callback: EventCallbacks[Event],
  ): this {
    return super.on(event, callback);
  }
}
