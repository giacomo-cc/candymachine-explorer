import styled from '@emotion/styled'

import Grid from '@mui/material/Grid'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'

import GitHubIcon from '@mui/icons-material/GitHub'
import TwitterIcon from '@mui/icons-material/Twitter'

import theme from '../../configuration/theme'

import { GITHUB_LINK, TWITTER_LINK } from './constants'

const StyledAppBar = styled(MuiAppBar)`
  height: ${theme.spacing(8)};
  background-color: ${theme.palette.primary.main};
`

const APP_BAR_ITEMS = [
  {
    link: GITHUB_LINK,
    icon: <GitHubIcon />
  },
  {
    link: TWITTER_LINK,
    icon: <TwitterIcon />
  }
]

const AppBar = () => (
  <StyledAppBar position="static" color="primary">
    <Toolbar>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Candy Machine Explorer</Typography>
        <Grid item>
          {APP_BAR_ITEMS.map(({ link, icon }) => (
            <Link key={link} href={link} target="_blank" color="inherit">
              <IconButton size="large">
                {icon}
              </IconButton>
            </Link>
          ))}
        </Grid>
      </Grid>
    </Toolbar>
  </StyledAppBar>
)

export default AppBar
