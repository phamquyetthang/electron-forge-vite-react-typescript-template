import { ipcMain } from 'electron';
import Store from 'electron-store';

export const IPC_CHANNELS = {
  example: 'example',
};
export const STORE_CHANNELS = {
  STORE_GET: 'store-get',
  STORE_SET: 'store-set',
  STORE_DELETE: 'store-delete',
};
const createIpcMain = () => {
  const store = new Store();

  ipcMain.on(IPC_CHANNELS.example, async (event, val) => {
    console.log('Received IPC message:', val);
  });

  ipcMain.on(STORE_CHANNELS.STORE_GET, async (event, val) => {
    event.returnValue = store.get(val);
  });
  ipcMain.on(STORE_CHANNELS.STORE_SET, async (_, key, val) => {
    store.set(key, val);
  });

  ipcMain.on(STORE_CHANNELS.STORE_DELETE, async (_, key) => {
    try {
      store.delete(key);
    } catch (error) {
      console.log('🚀 ~ ipcMain.on ~ error:', error);
    }
  });
};

export default createIpcMain;
