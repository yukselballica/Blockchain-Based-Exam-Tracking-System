import { WebviewWindow } from '@tauri-apps/api/window';
import { WalletMethods } from './walletMethods/waletMethod'


const walletMethods = new WalletMethods()

const walletAddress = document.querySelector<HTMLSpanElement>("#walletAddress");

const classMenuButton = document.querySelector<HTMLButtonElement>("#class");

const backButton = document.querySelector<HTMLButtonElement>("#back")

classMenuButton?.addEventListener('click', async () => {
  await WebviewWindow.getByLabel('studentList')?.show()
  //await WebviewWindow.getByLabel('menu')?.hide()
})

backButton?.addEventListener('click',async () => {
  await WebviewWindow.getByLabel('main')?.show()
  await WebviewWindow.getByLabel('studentMenu')?.hide()
})


window.addEventListener('load', async () => {
  const userSignAddress: any = await walletMethods.getSign()
  if (walletAddress) {
    walletAddress.innerText = userSignAddress
  }
})

