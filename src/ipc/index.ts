import { ipcMain } from 'electron';

export const IPC_CHANNELS = {
  example: 'example',
};
const createIpcMain = () => {
  ipcMain.on(IPC_CHANNELS.example, async (event, val) => {
    console.log('Received IPC message:', val);
  });
};

export default createIpcMain;
