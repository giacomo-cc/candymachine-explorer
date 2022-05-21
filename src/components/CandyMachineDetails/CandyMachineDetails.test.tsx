import { render, RenderResult, screen } from '@testing-library/react'

import withProviders from '../../test/utils/withProviders'
import { clusterFixture, dataFixture } from '../../test/fixtures'
import { formatDate, getSolanaExplorerLink } from '../../utils'

import CandyMachineDetails from '.'

import { CandyMachineDetailsProps } from './types'

const renderComponent = (componentProps?: Partial<CandyMachineDetailsProps>): RenderResult =>
  render(
    withProviders(<CandyMachineDetails cluster={clusterFixture} data={null} {...componentProps} />)
  )

describe('CandyMachineDetails', () => {
  it('should not display details when no data', () => {
    renderComponent()

    expect(screen.queryByText('Symbol')).not.toBeInTheDocument()
    expect(screen.queryByText('Authority')).not.toBeInTheDocument()
  })

  it('should display data correctly', () => {
    renderComponent({ data: dataFixture })

    expect(screen.getByText('Symbol')).toBeInTheDocument()
    expect(screen.getByText('TEST-SYMBOL')).toBeInTheDocument()

    const authorityLinkHref = getSolanaExplorerLink(clusterFixture, dataFixture.authority)
    const authorityLink = screen.getByRole('link', { name: 'testAuthorityId' })

    expect(screen.getByText('Authority')).toBeInTheDocument()
    expect(screen.getByText('testAuthorityId')).toBeInTheDocument()
    expect(authorityLink).toHaveAttribute('href', authorityLinkHref)

    expect(screen.getByText('Left Items')).toBeInTheDocument()
    expect(screen.getByText('3000')).toBeInTheDocument()

    expect(screen.getByText('Available Items')).toBeInTheDocument()
    expect(screen.getByText('10000')).toBeInTheDocument()

    expect(screen.getByText('Redeemed Items')).toBeInTheDocument()
    expect(screen.getByText('7000')).toBeInTheDocument()

    const walletLinkHref = getSolanaExplorerLink(clusterFixture, dataFixture.wallet)
    const walletLink = screen.getByRole('link', { name: 'testWalletId' })

    expect(screen.getByText('Wallet')).toBeInTheDocument()
    expect(screen.getByText('testWalletId')).toBeInTheDocument()
    expect(walletLink).toHaveAttribute('href', walletLinkHref)

    const liveDate = formatDate(dataFixture.goLiveDate)

    expect(screen.getByText('Live date')).toBeInTheDocument()
    expect(screen.getByText(liveDate)).toBeInTheDocument()

    expect(screen.getByText('Seller Fee Basis Points')).toBeInTheDocument()
    expect(screen.getByText('500')).toBeInTheDocument()
  })
})
