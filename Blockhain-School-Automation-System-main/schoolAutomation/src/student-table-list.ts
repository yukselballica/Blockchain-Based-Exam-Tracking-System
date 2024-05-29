import { WalletMethods } from './walletMethods/waletMethod'

const walletMethods = new WalletMethods()
const walletAddress = document.querySelector<HTMLSpanElement>("#walletAddress")

const tableStudent = document.querySelector("#tableStudent")
const getButton = document.querySelector<HTMLButtonElement>("#Get")


getButton?.addEventListener('click', async () => {
  const userSignAddress: any = await walletMethods.getSign()
  const datas = []
  const classes: any = await walletMethods.getAllClasses()
  for (let i = 0; i < classes.length; i++) {
    const student = classes[i].students;
    for (let j = 0; j < student.length; j++) {
      if (student[j].studentAddress == userSignAddress) {
        const foundStudent = classes[i]
        const data = classes[i].students.filter((data: any) => data.studentAddress == userSignAddress)
        datas.push(data[0])
        datas.push(foundStudent)
      }
    }
  }
  const tr = document.createElement('tr');

  const tdClassName = document.createElement('td');
  tdClassName.innerText = datas[1].className;
  tr.appendChild(tdClassName);

  const tdName = document.createElement('td');
  tdName.innerText = datas[1].name;
  tr.appendChild(tdName);

  const tdDate = document.createElement('td');
  tdDate.innerText = datas[1].date;
  tr.appendChild(tdDate);

  const tdHour = document.createElement('td');
  tdHour.innerText = datas[1].hour;
  tr.appendChild(tdHour);

  const tdStudentName = document.createElement('td');
  tdStudentName.innerText = datas[0].name;
  tr.appendChild(tdStudentName);


  const tdStudentSurname = document.createElement('td')
  tdStudentSurname.innerText = datas[0].surname;
  tr.appendChild(tdStudentSurname)

  const tdStudentNo = document.createElement('td')
  tdStudentNo.innerText = datas[0].schoolNo;
  tr.appendChild(tdStudentNo)

  const tdCapacity = document.createElement('td');
  tdCapacity.innerText = datas[1].chairNumber.toString();
  tr.appendChild(tdCapacity);

  tableStudent?.appendChild(tr);

})


window.addEventListener('load', async () => {

  const userSignAddress: any = await walletMethods.getSign()
  console.log(userSignAddress)
  if (walletAddress) {
    walletAddress.innerText = userSignAddress
  }
  /*const tr = document.createElement('tr');

  const tdClassName = document.createElement('td');
  tdClassName.innerText = classes.className;
  tr.appendChild(tdClassName);

  const tdName = document.createElement('td');
  tdName.innerText = classes.name;
  tr.appendChild(tdName);

  const tdDate = document.createElement('td');
  tdDate.innerText = classes.date;
  tr.appendChild(tdDate);

  const tdHour = document.createElement('td');
  tdHour.innerText = classes.hour;
  tr.appendChild(tdHour);

  const tdStudentName = document.createElement('td');
  tdStudentName.innerText = student.name;
  tr.appendChild(tdStudentName);


  const tdStudentSurname = document.createElement('td')
  tdStudentSurname.innerText = student.surname;
  tr.appendChild(tdStudentSurname)

  const tdStudentNo = document.createElement('td')
  tdStudentNo.innerText = student.schoolNo;
  tr.appendChild(tdStudentNo)

  const tdCapacity = document.createElement('td');
  tdCapacity.innerText = classes.chairNumber.toString();
  tr.appendChild(tdCapacity);

  tableStudent?.appendChild(tr);
  */
})


window.addEventListener('load', async () => {
  const userSignAddress: any = await walletMethods.getSign()
  if (walletAddress) {
    walletAddress.innerText = userSignAddress
  }

})

