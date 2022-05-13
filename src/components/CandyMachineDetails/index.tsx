import { useMemo, memo } from 'react'
import styled from '@emotion/styled'

import Card from '@mui/material/Card'
import Link from '@mui/material/Link'

import theme from '../../configuration/theme'
import { formatDate, getSolanaExplorerLink } from '../../utils'

import { CandyMachineDetailsProps } from './types'

const StyledCard = styled(Card)<{ is_hidden: string }>(({ is_hidden }) => ({
  minWidth: 426,
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  visibility: is_hidden ? 'hidden' : 'visible'
}))

const StyledCardContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${theme.spacing(1)};
`

const StyledCardContentTitle = styled.p`
  margin: ${theme.spacing(0.1)};
`

const StyledCardContentDetails = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`

const CandyMachineDetails = ({ cluster = '', data = null }: CandyMachineDetailsProps) => {
  const details = useMemo(
    () =>
      data
        ? [
            {
              title: 'Symbol',
              value: data?.symbol
            },
            {
              title: 'Authority',
              value: (
                <Link href={getSolanaExplorerLink(cluster, data?.authority)} target="_blank">
                  {data?.authority}
                </Link>
              )
            },
            {
              title: 'Left Items',
              value: data?.itemsAvailable - data?.itemsRedeemed
            },
            {
              title: 'Available Items',
              value: data?.itemsAvailable
            },
            {
              title: 'Redeemed Items',
              value: data?.itemsRedeemed
            },
            {
              title: 'Wallet',
              value: (
                <Link href={getSolanaExplorerLink(cluster, data?.wallet)} target="_blank">
                  {data?.wallet}
                </Link>
              )
            },
            {
              title: 'Live date',
              value: formatDate(data?.goLiveDate)
            },
            {
              title: 'Seller Fee Basis Points',
              value: data?.sellerFeeBasisPoints
            }
          ]
        : [],
    [cluster, data]
  )

  return (
    <StyledCard is_hidden={data ? '' : 'true'}>
      {details.map(({ title, value }) => (
        <StyledCardContent key={title}>
          <StyledCardContentTitle>{title}</StyledCardContentTitle>
          <StyledCardContentDetails>{value}</StyledCardContentDetails>
        </StyledCardContent>
      ))}
    </StyledCard>
  )
}

export default memo(CandyMachineDetails)
