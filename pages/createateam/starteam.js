import React, { useState, useEffect } from 'react';
import fire from '../../config/fire-config.js';
import PlayerCard from '../../components/playerCard'
import Trail from '../../components/trail'
import Link from 'next/link'

import { 
  Flex, 
  Input, 
  Grid,
  Text, 
  Divider, 
  Container,
  Box,
  Button,
  Heading, 
  GridItem} 
  from '@chakra-ui/react'
 

const StarTeam = () => {
  let user = fire.auth().currentUser;
  const [open, set] = useState(true)

  let [availablePlayers, setAvailablePlayers]= useState(currentPlayers);

  const [currentTeam, setCurrentTeam] = useState({});
  const [starPositionCount, setStarPositionCount] = useState([]);

  const handleStar = (el, pos) => {
    console.log('adding star');
    for (let keys in currentTeam){
      if (currentTeam[keys].DraftKingsName === el.DraftKingsName) {
        currentTeam[keys].star = true
        setCurrentTeam(currentTeam)
      }

    }
  }

  const removeStar = (el, pos) => {
    console.log('removing star');
    for (let keys in currentTeam){
      if (currentTeam[keys].DraftKingsName === el.DraftKingsName) {
        currentTeam[keys].star = false
        setCurrentTeam(currentTeam)
      }

    }
  }


const boxcolor = Object.keys(currentTeam).length === 14 ? '#F6E05E' : "#FFFFF0" ;

const buttonBoarder = Object.keys(currentTeam).length === 14 && teamName.name.length >= 14 ? '#F6E05E' : "#FFFFF0" ;

    return (
      <>
      <Heading size="xl" pt={15, 25, 40} m={2} textAlign="center" isTruncated>Star Three Players.</Heading>
      <Text textAlign="center" m={2}>Double Click Three Players. Only One Per Position Allowed.</Text>
        <Container   centerContent>
              <Flex align='center' justify='center'>
                < Button w={[200, 275, 300]} m={3} borderWidth="3px" borderColor={buttonBoarder}>Submit Team</Button>
              </Flex>              
            <Box w={[405, 405, 550]} h={[500, 650, 900]} borderColor = {boxcolor} padding="4" borderWidth="3px" borderRadius="lg" overflow="auto">
                  <Trail open={open}>
                    <Flex align='center' justify='center'>
                      <PlayerCard align='center' justify='center'
                      props = {currentTeam.QB1}
                      handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='QB1'/>
                    </Flex>
                  </Trail>
                  <Trail open={open}>
                    <Flex align='center' justify='center'>
                      <PlayerCard align='center' justify='center'
                      props = {currentTeam.QB2}
                      handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='QB2'/>
                    </Flex>
                  </Trail>
              <Divider orientation="horizontal" p={1}/>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.RB1}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='RB1'/>
                      </Flex>
                    </Trail>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.RB2}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='RB2'
                        />
                      </Flex>
                    </Trail>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.RB3}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='RB3'/>
                      </Flex>
                    </Trail>
              <Divider orientation="horizontal" p={1}/>

                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.WR1}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='WR1'/>
                      </Flex>
                    </Trail>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.WR2}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='WR2'/>
                      </Flex>
                    </Trail>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.WR3}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='WR3'/>
                      </Flex>
                    </Trail>
              <Divider orientation="horizontal" p={1}/>
                    <Flex align='center' justify='center'>
                      <PlayerCard align='center' justify='center'
                      props = {currentTeam.FLEX1}
                      handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='FLEX1'/>
                    </Flex>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.FLEX2}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='FLEX2'/>
                      </Flex>
                    </Trail>
                  <Trail open={open}>
                    <Flex align='center' justify='center'>
                      <PlayerCard align='center' justify='center'
                      props = {currentTeam.FLEX3}
                      handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='FLEX3'/>
                    </Flex>
                  </Trail> 
              <Divider orientation="horizontal" p={1}/>

                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.TE1}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='TE1'/>
                      </Flex>
                    </Trail>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.TE2}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='TE2'/>
                      </Flex>
                    </Trail>
              <Divider orientation="horizontal" p={1}/>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.K1}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='K1'/>
                      </Flex>
                    </Trail>
          </Box>
      </Container>
      </>
    );

}


export default StarTeam;