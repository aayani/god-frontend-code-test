import React from 'react'
import { useTheme } from 'vcc-ui'

export const useIsMobile = () => {
  const theme = useTheme()
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    if (!window) {
      return
    }

    const handleResize = () => {
      const mobile = window.innerWidth < theme.breakpoint.size.large

      if (mobile !== isMobile) {
        setIsMobile(mobile)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [theme, isMobile])

  return { isMobile }
}
