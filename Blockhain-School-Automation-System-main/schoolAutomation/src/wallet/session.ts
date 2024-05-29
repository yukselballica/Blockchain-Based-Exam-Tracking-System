import { Web3Wallet, Web3WalletTypes } from '@walletconnect/web3wallet'
import { buildApprovedNamespaces } from '@walletconnect/utils'
import { Core } from '@walletconnect/core'

export async function onSessionProposal({ params }: Web3WalletTypes.SessionProposal) {
  try {
    const approvedNamespaces = buildApprovedNamespaces({
      proposal: params,
      supportedNamespaces: {
        eip155: {
          chains: ['chain155:1', "eip155:137"],
          methods: ['eth_sendTransaction', "personal_sign"],
          events: ['accountsChanged', 'chainChanged'],
          accounts: [
            'eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb',
            'eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb'
          ]
        }
      }
    })
    const metadata = {
      name: 'schoolAutomation',
      description: "desc",
      url: 'https://web3modal.com',
      icons: ['https://avatars.githubusercontent.com/u/37784886']
    }
    const projectId = "5b76d1b93b88d312b491858b676a69cc"
    const core = new Core({
      projectId
    })
    const uri = await core.pairing.create()
    console.log(uri.uri)
    const web3wallet = await Web3Wallet.init({
      core,
      metadata
    })

    web3wallet.on('session_proposal', async proposal => {
      await web3wallet.approveSession({
        id: proposal.id,
        namespaces: approvedNamespaces
      })

      await web3wallet.pair({ uri: uri.uri })

    })

  }
  catch (err) {
    console.log(err)
  }
}
