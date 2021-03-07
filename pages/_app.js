import '../styles/globals.css'
import { ChakraProvider, CSSReset, ColorModeScript} from "@chakra-ui/react";
import { ColorModeProvider } from "@chakra-ui/color-mode";
import { extendTheme } from "@chakra-ui/react";
import Navbar from'../components/navbarFooterComponents/navbar'
import Footer from'/Users/thomaswetmore/Code/Berry/next-tj/components/navbarFooterComponents/footer.js'
import { AuthProvider } from '../hooks/useAuth.tsx';



const customTheme = extendTheme({
  useSystemColorMode: true,
  initialColorMode: 'dark'
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <CSSReset />
        <Navbar/>
          <div>
          <Component {...pageProps} />
          </div>
        <Footer/>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
