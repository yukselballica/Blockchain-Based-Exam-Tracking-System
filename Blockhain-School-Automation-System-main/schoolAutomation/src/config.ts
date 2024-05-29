import { arbitrum, mainnet } from '@wagmi/core/chains'
import { defaultWagmiConfig } from '@web3modal/wagmi'

export const projectId = "5b76d1b93b88d312b491858b676a69cc"


const chains = [mainnet, arbitrum] as const
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: 'Html Example',
    description: 'Html Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }
})
