import styled from '@emotion/styled'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

import theme from '../../configuration/theme'
import { AVAILABLE_NETWORK_ADDRESSES } from '../../configuration/availableNetworkAddresses'

import { CandyMachineCardProps } from './types'

const StyledCard = styled(Card)`
  min-width: 426px;
  margin: ${theme.spacing(2, 6)};
`

const StyledCardContent = styled(CardContent)`
  display: flex;
  gap: ${theme.spacing(2)};
`

const CandyMachineCard = ({
  cluster,
  candyMachineId,
  onClusterChange,
  onCandyMachineIdChange
}: CandyMachineCardProps) => {
  return (
    <StyledCard>
      <CardHeader title={<Typography variant="h6">Candy Machine</Typography>}></CardHeader>
      <StyledCardContent>
        <FormControl variant="standard" fullWidth>
          <InputLabel>Cluster</InputLabel>
          <Select label="Cluster" name="cluster" value={cluster} onChange={onClusterChange}>
            {AVAILABLE_NETWORK_ADDRESSES.map(item => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <TextField
            id="standard-basic"
            label="Candy Machine ID"
            variant="standard"
            name="candyMachineId"
            value={candyMachineId}
            onChange={onCandyMachineIdChange}
          />
        </FormControl>
      </StyledCardContent>
    </StyledCard>
  )
}

export default CandyMachineCard
