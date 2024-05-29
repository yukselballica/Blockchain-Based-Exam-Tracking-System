import { createWeb3Modal } from '@web3modal/wagmi';
import './style.css';
import { WebviewWindow } from '@tauri-apps/api/window';
import { disconnect, getAccount, watchAccount } from '@wagmi/core';
import { WalletMethods } from './walletMethods/waletMethod';
import { wagmiConfig, projectId } from './config';

const walletMethods = new WalletMethods();

const button = document.querySelector<HTMLButtonElement>('#connectWallet');

const handler = () => {
  console.log("Handler working...");
};

const connect = async () => {
  const account = getAccount(wagmiConfig);
  if (account.isConnected) {
    localStorage.clear();
    await disconnect(wagmiConfig);
  } else {
    localStorage.clear();
    modal.open();
  }
};

// @ts-ignore
let data: any;

const mainWindow = WebviewWindow.getByLabel('main');
window.addEventListener('load', async () => {
  localStorage.clear();
});

const statusElement: NodeListOf<HTMLInputElement> = document.getElementsByName('status') as NodeListOf<HTMLInputElement>;
let statusSelected: string | undefined | any;

watchAccount(wagmiConfig, {
  onChange: async (account) => {
    if (account.isConnected) {
      data = account;
      try {
        const userData:any = await walletMethods.isUser(account.address as string, statusSelected);
        console.log(userData);

        if (userData[0] == false && statusSelected == "0") {
          await walletMethods.postCahceUserAddress(account.address as string);
          const teacherSignUp = new WebviewWindow('teacherSignUp', {
            url: "../assets/signUp/teacher/kayıt.html"
          });
          await mainWindow?.hide();
          await teacherSignUp.center();
        } else if (userData[0] == false && statusSelected == "1") {
          await walletMethods.postCahceUserAddress(account.address as string);
          const studentSignUp = new WebviewWindow('studentSignUp', {
            url: "../assets/signUp/student/kayıt.html"
          });
          await mainWindow?.hide();
          await studentSignUp.center();
        } else {
          if (statusSelected == "0") {
            await walletMethods.postSign(account.address as string, userData[1] as number);
            const menu = WebviewWindow.getByLabel("menu");
            await mainWindow?.hide();
            await menu?.show();
          } else {
            await walletMethods.postSign(account.address as string, userData[1] as number);
            const studentMenu = WebviewWindow.getByLabel("studentMenu");
            await mainWindow?.hide();
            await studentMenu?.show();
          }
        }
      } catch (err) {
        console.error(err);
        console.log("Error occurred");
      }
    } else {
      console.log("Account disconnected");
    }
  },

});

const modal = createWeb3Modal({ wagmiConfig, projectId, themeMode: 'dark' });
modal.subscribeWalletInfo(handler);

button?.addEventListener('click', async () => {
  statusElement.forEach((item) => {
    if (item.checked) {
      statusSelected = item.value;
    }
  });
  await connect().catch(()=>localStorage.clear());
});
