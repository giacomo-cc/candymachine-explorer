import { web3 } from '@project-serum/anchor'

export const CANDY_MACHINE_PROGRAM = new web3.PublicKey(
  process.env.REACT_APP_WEB3_PUBLIC_KEY!
)
