import { abi } from '../abi/School.json'
import { Web3, Contract } from 'web3'



export class WalletMethods {
  private readonly web3: Web3;
  private readonly contract: Contract<typeof abi>;
  private readonly contractAddress = "0xBfE5B574b15563E78055CcD4A30fB54A6737B7D3"
  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))
    this.contract = new this.web3.eth.Contract(abi, this.contractAddress)
  }
  async isSync() {
    return await this.web3.eth.isSyncing()
  }
  async getAllAccounts() {
    return await this.web3.eth.getAccounts()
  }
  async getAllClasses() {
    return await this.contract.methods.getAllClasses().call({ from: (await this.getAllAccounts())[0] })
  }
  async postCahceUserAddress(userAddress: string) {
    const gas = await this.contract.methods.createCacheUserAddress(userAddress).estimateGas({ from: (await this.getAllAccounts())[0] })
    return await this.contract.methods.createCacheUserAddress(userAddress).send({ from: (await this.getAllAccounts())[0], gas: gas.toString() })
  }
  async getCacheUserAddress() {
    return await this.contract.methods.getCacheUserAddress().call({ from: (await this.getAllAccounts())[0] })
  }
  async postSign(userSign: string, personelType: number) {
    const gas = await this.contract.methods.signUser(userSign, personelType).estimateGas({ from: (await this.getAllAccounts())[0] })
    return await this.contract.methods.signUser(userSign, personelType).send({ from: (await this.getAllAccounts())[0], gas: gas.toString() })
  }
  async isUser(userSignAddress: string, personelType: number) {
    const gas = await this.contract.methods.signUserControl(userSignAddress, personelType).estimateGas({ from: (await this.getAllAccounts())[0] })
    return await this.contract.methods.signUserControl(userSignAddress, personelType).call({ from: (await this.getAllAccounts())[0], gas: gas.toString() })
  }
  async getSign() {
    return await this.contract.methods.getSignUser().call({ from: (await this.getAllAccounts())[0] })
  }
  async postStudent(studentAddress: string, name: string, surname: string, schoolNo: string) {
    const gas = await this.contract.methods.registerStudent(studentAddress, name, surname, schoolNo).estimateGas({ from: (await this.getAllAccounts())[0] })
    return await this.contract.methods.registerStudent(studentAddress, name, surname, schoolNo).send({ from: (await this.getAllAccounts())[0], gas: gas.toString() })
  }
  async postTeacher(teacherAddress: string, name: string, surname: string, field: string) {
    const gas = await this.contract.methods.registerTeacher(teacherAddress, name, surname, field).estimateGas({ from: (await this.getAllAccounts())[0] })
    return await this.contract.methods.registerTeacher(teacherAddress, name, surname, field).send({ from: (await this.getAllAccounts())[0], gas: gas.toString() })
  }
  async getAllStudent() {
    return await this.contract.methods.getStudents().call({ from: (await this.getAllAccounts())[0] })
  }
  async postClass(name: string | any, className: string | any, date: string | any, hour: string | any, chairNumber: number | any) {
    const gas = await this.contract.methods.createClass(name, className, date, hour, BigInt(chairNumber)).estimateGas({ from: (await this.getAllAccounts())[0] })
    return await this.contract.methods.createClass(name, className, date, hour, BigInt(chairNumber)).send({ from: (await this.getAllAccounts())[0], gas: gas.toString() }).catch(err => console.log(err))
  }
  async mockData() {
    const accounts = await this.getAllAccounts()
    for (let i = 0; i < accounts.length - 70; i++) {
      await this.postStudent(accounts[i], `name${i}`, `surname${i}`, `no${i}`)
    }
  }
  async assignStudentsToClasses() {
    const gas = await this.contract.methods.assignStudentsToClasses().estimateGas({ from: (await this.getAllAccounts())[0] })
    console.log(gas)
    return await this.contract.methods.assignStudentsToClasses().send({ from: (await this.getAllAccounts())[0], gas: gas.toString() })
  }
  async resetStudent() {
    const gas = await this.contract.methods.resetStudent().estimateGas({ from: (await this.getAllAccounts())[0] })
    return await this.contract.methods.resetStudent().send({ from: (await this.getAllAccounts())[0], gas: gas.toString() })
  }
  async findUserInClass(userAddress: string) {
    try {

      return await this.contract.methods.findStudent(userAddress).call({ from: (await this.getAllAccounts())[0] })
    }
    catch (err: any) {
      return err
    }
  }
}
