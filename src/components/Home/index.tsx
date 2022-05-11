import { useState } from 'react'

import Grid from '@mui/material/Grid'

import { AVAILABLE_NETWORK_ADDRESSES } from '../../configuration/availableNetworkAddresses'

import AppBar from '../AppBar'
import CandyMachineCard from '../CandyMachineCard'

import { FormChangeEvent, FormData } from './types'

const Home = () => {
  const [formData, setFormData] = useState<FormData>({
    cluster: AVAILABLE_NETWORK_ADDRESSES[0],
    candyMachineId: ''
  })

  const onInputChange = ({ target }: FormChangeEvent) => {
    setFormData({ ...formData, [target.name]: target.value })
  }

  return (
    <Grid container>
      <AppBar />
      <CandyMachineCard
        cluster={formData.cluster}
        candyMachineId={formData.candyMachineId}
        onClusterChange={onInputChange}
        onCandyMachineIdChange={onInputChange}
      />
    </Grid>
  )
}

export default Home
