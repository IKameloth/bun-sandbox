import { Box, BoxProps } from '@kuma-ui/core'

interface ContainerProps extends BoxProps {}

export const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <Box
      {...props}
      maxWidth="100%"
      width={['auto', 'auto', '723px', '933px', '1127px']}
      marginLeft={['0em', '1em', 'auto']}
      marginRight={['0em', '1em', 'auto']}
    >
      {children}
    </Box>
  )
}
