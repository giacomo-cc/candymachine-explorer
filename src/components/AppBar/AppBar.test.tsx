import { render, RenderResult, screen } from '@testing-library/react'

import withProviders from '../../test/utils/withProviders'

import AppBar from '.'

import { GITHUB_LINK, TWITTER_LINK } from './constants'

const renderComponent = (): RenderResult => render(withProviders(<AppBar />))

describe('AppBar', () => {
  beforeEach(() => renderComponent())

  it('should display header', () => {
    expect(screen.getByText('Candy Machine Explorer')).toBeInTheDocument()
  })

  it('should display github and twitter icons', () => {
    expect(screen.getByTestId('GitHubIcon')).toBeInTheDocument()
    expect(screen.getByTestId('TwitterIcon')).toBeInTheDocument()
  })

  it('should navigate to github', () => {
    expect(screen.getByTestId('GitHubIcon').closest('a')).toHaveAttribute('href', GITHUB_LINK)
  })

  it('should navigate to twitter', () => {
    expect(screen.getByTestId('TwitterIcon').closest('a')).toHaveAttribute('href', TWITTER_LINK)
  })
})
