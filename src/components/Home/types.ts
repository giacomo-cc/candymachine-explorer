import { ChangeEvent } from 'react'

import { SelectChangeEvent } from '@mui/material'

export interface FormData {
  cluster?: string
  candyMachineId?: string
}

export type FormChangeEvent = SelectChangeEvent<string> | ChangeEvent<HTMLInputElement>
