import styled from '@emotion/styled'

import Grid from '@mui/material/Grid'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import GitHubIcon from '@mui/icons-material/GitHub'
import TwitterIcon from '@mui/icons-material/Twitter'

import theme from '../../configuration/theme'

const StyledAppBar = styled(MuiAppBar)`
  height: ${theme.spacing(8)};
`

const AppBar = () => {
  return (
    <StyledAppBar position="static" color="primary">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Candy Machine Explorer</Typography>
          <Grid item>
            <IconButton>
              <GitHubIcon />
            </IconButton>
            <IconButton>
              <TwitterIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </StyledAppBar>
  )
}

export default AppBar
