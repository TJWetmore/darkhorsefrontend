import '../styles/globals.css'
import { ChakraProvider, CSSReset, ColorModeScript} from "@chakra-ui/react";
import { ColorModeProvider } from "@chakra-ui/color-mode";
import { extendTheme } from "@chakra-ui/react";
import Navbar from'../components/navbar'
import Footer from'../components/footer'


const customTheme = extendTheme({
  useSystemColorMode: true,
  initialColorMode: 'dark'
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
        <CSSReset />
        <Navbar/>
          <div>
          <Component {...pageProps} />
          </div>
        <Footer/>
    </ChakraProvider>
  )
}

export default MyApp
