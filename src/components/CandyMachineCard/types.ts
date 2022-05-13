import { ChangeEvent } from 'react'

import { SelectChangeEvent } from '@mui/material'

export interface CandyMachineCardProps {
  cluster?: string
  candyMachineId?: string
  onClusterChange: (event: SelectChangeEvent<string>) => void
  onCandyMachineIdChange: (event: ChangeEvent<HTMLInputElement>) => void
  isLoading?: boolean
}
