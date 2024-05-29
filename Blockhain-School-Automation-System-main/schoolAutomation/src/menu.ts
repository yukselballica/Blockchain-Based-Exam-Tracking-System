import { WebviewWindow } from '@tauri-apps/api/window';
import { WalletMethods } from './walletMethods/waletMethod'

const walletMethods = new WalletMethods()

const walletAddress = document.querySelector<HTMLSpanElement>("#walletAddress");

const classAddMenuButton = document.querySelector<HTMLButtonElement>("#addClass");
const shuffleListMenuButton = document.querySelector<HTMLButtonElement>("#shuffle");
const backButton = document.querySelector<HTMLButtonElement>("#back")

backButton?.addEventListener('click',async () => {
  await WebviewWindow.getByLabel('main')?.show()
  await WebviewWindow.getByLabel('menu')?.hide()
})


classAddMenuButton?.addEventListener('click', async () => {
  await WebviewWindow.getByLabel('classAdd')?.show()
  //await WebviewWindow.getByLabel('menu')?.hide()
})

shuffleListMenuButton?.addEventListener('click', async () => {
  await WebviewWindow.getByLabel('tableList')?.show()
  //await WebviewWindow.getByLabel('menu')?.hide()
})


window.addEventListener('load', async () => {
  const userSignAddress: any = await walletMethods.getSign()
  if (walletAddress) {
    walletAddress.innerText = userSignAddress
  }
})

