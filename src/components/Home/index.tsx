import { useCallback, useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'

import { AVAILABLE_NETWORK_ADDRESSES } from '../../configuration/availableNetworkAddresses'
import { fetchCandyMachineState } from '../../api/fetchCandyMachineState'
import { CandyMachineState } from '../../api/fetchCandyMachineState/types'

import CandyMachineCard from '../CandyMachineCard'
import CandyMachineDetails from '../CandyMachineDetails'
import AppBar from '../AppBar'

import { FormChangeEvent, FormData } from './types'

const PAGE_URL = new URL(window.location.href)
const INITIAL_FORM_DATA = {
  cluster: AVAILABLE_NETWORK_ADDRESSES[0],
  candyMachineId: PAGE_URL.searchParams.get('id') || ''
}

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [details, setDetails] = useState<CandyMachineState>()
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)

  useEffect(() => {
    if (formData.candyMachineId) {
      setIsLoading(true)
      ;(async () => {
        try {
          const result = await fetchCandyMachineState(
            formData.cluster || '',
            formData.candyMachineId || ''
          )
          setDetails(result)
        } catch (e) {
          console.error(e)
        } finally {
          setIsLoading(false)
        }
      })()
    }
  }, [formData])

  const onInputChange = useCallback(
    ({ target }: FormChangeEvent): void => {
      const { name, value } = target
      setFormData({ ...formData, [name]: value })

      if (name === 'candyMachineId') {
        PAGE_URL.searchParams.set('id', value)
        window.history.pushState(null, '', PAGE_URL)
      }
    },
    [formData]
  )

  return (
    <Grid container justifyContent="center">
      <AppBar />
      <CandyMachineCard
        cluster={formData.cluster}
        candyMachineId={formData.candyMachineId}
        onClusterChange={onInputChange}
        onCandyMachineIdChange={onInputChange}
        isLoading={isLoading}
      />
      <CandyMachineDetails cluster={formData.cluster || ''} data={details || null} />
    </Grid>
  )
}

export default Home
