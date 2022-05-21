import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import ThemeProvider from '@mui/material/styles/ThemeProvider'

import theme from '../configuration/theme'

export const withProviders = (component: EmotionJSX.Element) => (
  <ThemeProvider theme={theme}>{component}</ThemeProvider>
)
