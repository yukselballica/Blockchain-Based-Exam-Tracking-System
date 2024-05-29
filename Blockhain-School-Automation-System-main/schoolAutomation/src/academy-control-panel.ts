import { WebviewWindow } from '@tauri-apps/api/window'
import { WalletMethods } from './walletMethods/waletMethod'
const saveButton = document.querySelector<HTMLButtonElement>("#save")
const alert = document.querySelector<HTMLHeadingElement>("#alert")
const walletAddressP = document.querySelector<HTMLParagraphElement>("#walletAddress")

const walletMethods = new WalletMethods()

walletMethods.getSign().then((data: string | any) => {
  if (walletAddressP) {
    walletAddressP.innerText = data
  }
})

saveButton?.addEventListener('click', async () => {
  const classTimeHour = document.querySelector<HTMLInputElement>("#classTimeHour")?.value;
  const classTimeDate = document.querySelector<HTMLInputElement>("#classTimeDate")?.value;
  const classTimeName = document.querySelector<HTMLInputElement>("#classTimeCourseName")?.value;
  const classTimeCourse = document.querySelector<HTMLInputElement>("#classTimeCourse")?.value;
  const classRoomCapacity = document.querySelector<HTMLInputElement>("#classRoomCapacity")?.value;

  await walletMethods.postClass(classTimeName, classTimeCourse, classTimeDate, classTimeHour, classRoomCapacity)
  if (alert) {
    alert.innerText = "Successfull class added"
  }
  setTimeout(async () => {
    await WebviewWindow.getByLabel('menu')?.show()
    await WebviewWindow.getByLabel('classAdd')?.hide()
  }, 1000)
})
