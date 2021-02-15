import React from "react"
import fire from '../config/fire-config.js';


import { 
  Grid,
  Container,
  Box, 
  Button,
  Heading, 
  GridItem} 
  from '@chakra-ui/react'

const SplashPage = () => {
  let user = fire.auth().currentUser

  return(
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} columns={2}>
        <GridItem colSpan={1}>
          <Container colSpan={1} maxW="lg" centerContent>
            <Heading alignItems="top">Dark Horse Fantasy</Heading>
              <Box padding="4" borderWidth="3px" borderRadius="lg" overflow="hidden">
                There are many benefits to a joint design and development system. Not only
                does it bring benefits to the design team.
              </Box>
          </Container>
        </GridItem>
        <GridItem colSpan={1}>
        <Container colSpan={1} maxW="xl" centerContent>
          <Heading>Get Started</Heading>
            <Box padding="4" borderWidth="3px" borderRadius="lg" overflow="hidden">
              There are many benefits to a joint design and development system. Not only
              does it bring benefits to the design team.
            </Box>
        </Container>
        </GridItem>
      </Grid>
      <Button
      onClick={()=> console.log(user)}> Click Me </Button>
      </>
  )
}

export default SplashPage;