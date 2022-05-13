import moment from 'moment'

import { MAINNET, TESTNET, DEVNET } from '../configuration/availableNetworkAddresses'

export const formatDate = (date: Date): string => {
  const momentDate = moment(date)
  return `${momentDate.fromNow()} - ${momentDate.toLocaleString()}`
}

export const getSolanaExplorerLink = (selectedCluster: string, address: string): string => {
  switch (selectedCluster) {
    case MAINNET:
      return `https://explorer.solana.com/address/${address}`
    case TESTNET:
      return `https://explorer.solana.com/address/${address}?cluster=testnet`
    case DEVNET:
      return `https://explorer.solana.com/address/${address}?cluster=devnet`
    default:
      return '#'
  }
}
