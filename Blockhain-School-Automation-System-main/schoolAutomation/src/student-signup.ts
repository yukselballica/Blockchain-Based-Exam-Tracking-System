import { WebviewWindow } from '@tauri-apps/api/window'
import { WalletMethods } from './walletMethods/waletMethod'
import { disconnect } from '@wagmi/core'
import { wagmiConfig } from './config'

const walletMethods = new WalletMethods()

const walletAddress = document.querySelector<HTMLSpanElement>("#walletAddress")
const name = document.querySelector<HTMLInputElement>("#name")
const surname = document.querySelector<HTMLInputElement>("#surname")
const no = document.querySelector<HTMLInputElement>("#no")
const saveButton = document.querySelector<HTMLButtonElement>("#button")

const alert = document.querySelector<HTMLHeadingElement>("#alert")

window.addEventListener('load', async () => {
  const studentAddress: any = await walletMethods.getCacheUserAddress()
  if (walletAddress) {
    console.log(studentAddress)
    walletAddress.innerText = studentAddress
  }
})
saveButton?.addEventListener('click', async () => {
  const studentAddress: any = await walletMethods.getCacheUserAddress()

  await walletMethods.postStudent(studentAddress as string, name?.value.toString() as string, surname?.value.toString() as string, no?.value.toString() as string)
    .catch(err => console.log(err))
  if (alert) {
    alert.innerText = "Successfull student created";
  }
  setTimeout(async () => {
    await WebviewWindow.getByLabel('main')?.show()
    disconnect(wagmiConfig)
    await WebviewWindow.getByLabel('studentSignUp')?.close()
  }, 1000)
})



