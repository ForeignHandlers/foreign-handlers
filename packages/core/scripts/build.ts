import { fileCollector } from '$core/builder';

export const build = () => {
  fileCollector(`${process.env.PWD}`);
};
