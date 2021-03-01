import React from "react"
import { Button, Flex, Container} from "@chakra-ui/react"
import ThemeToggle from './toggle-theme'
import Link from 'next/link'


const Footer = () => {

  return (
    <>

    <Container pt={39}>
    <Flex
    bottom="0"
    left="0"
    align="center"
    justify="space-between"
    position="absolute"
    wrap="wrap"
    w="100%"
    
    // mb={4}
    
    
    bg={"#9C4221"}
    color={"#f5ece8"}
    >
    <ThemeToggle/>
        <Flex
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
          pr={5}
          
        >
        </Flex>
    </Flex>
    </Container>
    </>
  )
}

export default Footer;