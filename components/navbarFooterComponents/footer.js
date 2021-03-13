import React from "react"
import { Button, Text, Flex, Container} from "@chakra-ui/react"
import ThemeToggle from './../ui/toggle-theme'
import Link from 'next/link'
import Countdown from '../ui/countdown'
import fire from '../../config/fire-config.js';
import { useAuth } from './../../hooks/useAuth';


const Footer = () => {
  const auth = useAuth();
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
          <Button onClick={()=>console.log(auth.user)}>View Team</Button>
        
          <Countdown m={3} alignItems='center'/>
        </Flex>
    </Flex>

    </Container>
    </>
  )
}

export default Footer;