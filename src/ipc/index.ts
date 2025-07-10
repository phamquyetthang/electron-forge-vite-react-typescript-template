import { ipcMain } from 'electron';

export const IPC_CHANNELS = {
  example: 'example',
  alert: 'alert',
};
const createIpcMain = () => {
  ipcMain.on(IPC_CHANNELS.example, async (event, val) => {
    console.log('Received IPC message:', val);
  });
  ipcMain.on(IPC_CHANNELS.alert, async (event, message) => {
    alert(message);
  });
};

export default createIpcMain;
