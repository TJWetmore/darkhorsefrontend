import '../styles/globals.css'
import { ChakraProvider, CSSReset, ColorModeScript} from "@chakra-ui/react";
import { ColorModeProvider } from "@chakra-ui/color-mode";
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  useSystemColorMode: true,
  initialColorMode: 'dark'
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
        <CSSReset />
        <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
