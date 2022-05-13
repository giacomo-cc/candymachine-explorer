import { CandyMachineState } from "../../api/fetchCandyMachineState/types"

export interface CandyMachineDetailsProps {
  cluster: string
  data: CandyMachineState | null
}
