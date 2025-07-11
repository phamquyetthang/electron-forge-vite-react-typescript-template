import {
  type IpcRendererEvent,
  contextBridge,
  dialog,
  ipcRenderer,
} from 'electron';
import { IPC_CHANNELS, STORE_CHANNELS } from './ipc';

const versions: Record<string, unknown> = {};

// Process versions
for (const type of ['chrome', 'node', 'electron']) {
  versions[type] = process.versions[type];
}

function validateIPC(channel: string) {
  if (!channel) {
    throw new Error(`Unsupported event IPC channel '${channel}'`);
  }

  return true;
}

export type RendererListener = (
  event: IpcRendererEvent,
  ...args: unknown[]
) => void;

type ChannelKey = keyof typeof IPC_CHANNELS;
export const globals = {
  /** Processes versions **/
  versions,

  /**
   * A minimal set of methods exposed from Electron's `ipcRenderer`
   * to support communication to main process.
   */
  ipcRenderer: {
    send(channel: ChannelKey, ...args: unknown[]) {
      if (validateIPC(channel)) {
        ipcRenderer.send(channel, ...args);
      }
    },

    invoke(channel: ChannelKey, ...args: unknown[]) {
      if (validateIPC(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      }
    },

    on(channel: ChannelKey, listener: RendererListener) {
      if (validateIPC(channel)) {
        ipcRenderer.on(channel, listener);

        return this;
      }
    },

    once(channel: ChannelKey, listener: RendererListener) {
      if (validateIPC(channel)) {
        ipcRenderer.once(channel, listener);

        return this;
      }
    },

    removeListener(channel: ChannelKey, listener: RendererListener) {
      if (validateIPC(channel)) {
        ipcRenderer.removeListener(channel, listener);

        return this;
      }
    },
  },
  store: {
    get(key: string) {
      return ipcRenderer.sendSync(STORE_CHANNELS.STORE_GET, key);
    },
    set(property: string, val: unknown) {
      ipcRenderer.send(STORE_CHANNELS.STORE_SET, property, val);
    },
    delete(key: string) {
      return ipcRenderer.sendSync(STORE_CHANNELS.STORE_DELETE, key);
    },
  },
  dialog,
};

contextBridge.exposeInMainWorld('electron', globals);
