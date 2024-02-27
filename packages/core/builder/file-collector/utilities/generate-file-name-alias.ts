import { FilePath } from '$core/types';

export const generateFileNameAlias = (path: FilePath): string => {
  const extensionStartIndex = path.lastIndexOf('.');
  const segments = path.slice(0, extensionStartIndex).split('/').slice(1);

  return segments.join('/');
};
