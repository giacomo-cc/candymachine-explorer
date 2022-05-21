import { render, RenderResult, screen } from '@testing-library/react'

import withProviders from './test/utils/withProviders'

import App from './App'

const renderComponent = (): RenderResult => render(withProviders(<App />))

describe('App', () => {
  beforeEach(() => renderComponent())

  it('should display correct layout', () => {
    expect(screen.getByText('Candy Machine Explorer')).toBeInTheDocument()
    expect(screen.getByTestId('GitHubIcon')).toBeInTheDocument()
    expect(screen.getByTestId('TwitterIcon')).toBeInTheDocument()
    expect(screen.getByText('Candy Machine')).toBeInTheDocument()
    expect(screen.getByText('Cluster')).toBeInTheDocument()
    expect(screen.getByText('Candy Machine ID')).toBeInTheDocument()

    expect(screen.queryByText('Symbol')).not.toBeInTheDocument()
    expect(screen.queryByText('Authority')).not.toBeInTheDocument()
  })
})
