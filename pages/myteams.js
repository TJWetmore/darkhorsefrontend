import { useAuth } from '../hooks/useAuth';
import TeamCard from '../components/teamcard';
import React, { useState, useEffect } from 'react';
import Trail from '../components/ReactSpringsComponents/trail'


import { 
  Grid,
  Container,
  Box, 
  Button,
  Heading, 
  Text,
  GridItem} 
  from '@chakra-ui/react'
  

const MyTeams = () => {
  let auth = useAuth()
  let user = auth.user
  let userTeams;
  user === null ? userTeams = [] : userTeams = user.teams; 
  const [open, set] = useState(true)


  return (
    <>

      <Grid  pt={15, 25, 40} className="disable-select"  pb={10, 15, 20} >
        <GridItem colSpan={[1]} rowSpan={[1, 1, 2]}>
          <Container colSpan={1} maxW="lg" centerContent>

            <Heading alignItems="top">Your Teams</Heading>
            <Text>Drag to Leagues to Add</Text>
            <Box w={[405, 405, 550]} h={[500, 650, 800]} padding="4" borderWidth="3px" borderRadius="lg" overflowY="auto" overflowX='hidden'>
              <Trail open={open}/>
                {(userTeams !== undefined) && (
                  userTeams.map( el =>
                    <TeamCard
                    props = {el}
                    />
                ))}
            </Box>
          </Container> 
        </GridItem>
      </Grid>
    </>
  )
}

export default MyTeams;