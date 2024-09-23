import { Box, BoxProps } from '@kuma-ui/core'

interface MainContentProps extends BoxProps {}

const MainContent = ({ children, ...props }: MainContentProps) => {
  return (
    <Box marginBottom={[0, 0, '3em', '3em']} className="main-content-container">
      <Box
        {...props}
        className="main-content"
        width="100%"
        marginTop={[0, 0, '3em', '3em']}
        paddingTop="1em"
        paddingBottom="2em"
        paddingLeft={['1em', '1em', '1.5em', '1.5em', '2em']}
        paddingRight="1em"
        borderRadius={[0, 0, '0.4em']}
        backgroundColor="var(--main-content-bg)"
        boxShadow="var(--main-content-box-shadow)"
      >
        {children}
      </Box>
    </Box>
  )
}

export default MainContent
