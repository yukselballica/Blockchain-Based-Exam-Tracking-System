import { WebviewWindow } from '@tauri-apps/api/window'
import { WalletMethods } from './walletMethods/waletMethod'
import { disconnect } from '@wagmi/core'
import { wagmiConfig } from './config'

const walletMethods = new WalletMethods()

const walletAddress = document.querySelector<HTMLSpanElement>("#walletAddress")
const name = document.querySelector<HTMLInputElement>("#name")
const surname = document.querySelector<HTMLInputElement>("#surname")
const field = document.querySelector<HTMLInputElement>("#field")
const saveButton = document.querySelector<HTMLButtonElement>("#button")

const alert = document.querySelector<HTMLHeadingElement>("#alert")

window.addEventListener('load', async () => {
  const teacherAddress: any = await walletMethods.getCacheUserAddress()
  if (walletAddress) {
    walletAddress.innerText = teacherAddress
  }
})
saveButton?.addEventListener('click', async () => {
  const teacherAddress: any = await walletMethods.getCacheUserAddress()

  await walletMethods.postTeacher(teacherAddress as string, name?.value.toString() as string, surname?.value.toString() as string, field?.value.toString() as string)
    .catch(err => console.log(err))
  if (alert) {
    alert.innerText = "Successfull teacher created";
  }
  setTimeout(async () => {
    await WebviewWindow.getByLabel('main')?.show()
    disconnect(wagmiConfig)
    await WebviewWindow.getByLabel('teacherSignUp')?.close()
  }, 1000)
})



