import type { globals } from 'src/preload';

declare global {
  const electron: typeof globals;
}
