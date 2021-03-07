import React, { useState } from 'react';
import PlayerCard from './playerCard'
import Trail from './reactSpringsComponents/trail'
import { useAuth } from './../hooks/useAuth';
import { useRouter } from 'next/router';


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
 

const StarTeam = (el) => {
  const auth = useAuth();
  const router = useRouter();

  const [open, set] = useState(true)

  const [currentTeamStarred, setCurrentTeamStarred] = useState(el.currentTeam);

  const [starredPositions, setstarredPositions] = useState([]);

  console.log(currentTeamStarred)

  const handleStar = (player) => {
    for (let keys in currentTeamStarred){
      if (currentTeamStarred[keys].DraftKingsName === player.DraftKingsName && !starredPositions.includes(player.FantasyPosition) && starredPositions.length <= 2) {
        currentTeamStarred[keys].star = true
        setCurrentTeamStarred(currentTeamStarred)
        setstarredPositions([...starredPositions, player.FantasyPosition])
      }
    }
    console.log(starredPositions.length)
  }

  const removeStar = (player) => {
    for (let keys in currentTeamStarred){
      if (currentTeamStarred[keys].DraftKingsName === player.DraftKingsName) {
        currentTeamStarred[keys].star = false
        setCurrentTeamStarred(currentTeamStarred)
        let newPositions = starredPositions.filter(el => el !== player.FantasyPosition)
        setstarredPositions(newPositions)
      }
    }
    console.log(starredPositions.length)
  }

  const handleSubmit = () => {
    if (starredPositions.length === 3 && Object.keys(currentTeamStarred).length === 14) {
      console.log('handling Submit')
      auth.addTeam(el.teamName, currentTeamStarred).then(() => router.push('/dashboard'))
  }
}
 

const boxcolor = starredPositions.length === 3 ? '#F6E05E' : "#FFFFF0" ;

const buttonBoarder = starredPositions.length === 3 ? '#F6E05E' : null ;

    return (
      < >
      <Heading className="disable-select" size="2xl" pt={15, 25, 40} m={4} textAlign="center" >Team {el.teamName}</Heading>
      <Text className="disable-select" fontSize="xl" pt={2} textAlign="center" isTruncated>Star Three Players:</Text>
      <Text className="disable-select" textAlign="center" >Swipe Right On Three Players.</Text>
      <Text className="disable-select" textAlign="center" >Swipe Left To Remove Star.</Text>
      <Text className="disable-select" textAlign="center" >Only One Per Position Allowed.</Text>        
      <Divider orientation="horizontal" pb ={5}/>
        <Container  className="disable-select" centerContent>
              <Flex align='center' justify='center'>
                < Button w={[200, 275, 300]} m={3} borderWidth="3px" borderColor={buttonBoarder} onClick={handleSubmit}>Submit Team</Button>
              </Flex>              
            <Box w={[405, 405, 550]} h={[500, 650, 900]} borderColor = {boxcolor} padding="4" borderWidth="3px" borderRadius="lg" overflow="auto">
                  <Trail open={open}>
                    <Flex align='center' justify='center'>
                      <PlayerCard align='center' justify='center'
                      props = {currentTeamStarred.QB1}
                       status = 'star team' handleStar = {handleStar} removeStar={removeStar} keyName='QB1'/>
                    </Flex>
                  </Trail>
                  <Trail open={open}>
                    <Flex align='center' justify='center'>
                      <PlayerCard align='center' justify='center'
                      props = {currentTeamStarred.QB2}
                       status = 'star team' handleStar = {handleStar} removeStar={removeStar} keyName='QB2'/>
                    </Flex>
                  </Trail>
              <Divider orientation="horizontal" p={1}/>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeamStarred.RB1}
                         status = 'star team' handleStar = {handleStar} removeStar={removeStar} keyName='RB1'/>
                      </Flex>
                    </Trail>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeamStarred.RB2}
                         status = 'star team' handleStar = {handleStar} removeStar={removeStar} keyName='RB2'
                        />
                      </Flex>
                    </Trail>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeamStarred.RB3}
                         status = 'star team' handleStar = {handleStar} removeStar={removeStar} keyName='RB3'/>
                      </Flex>
                    </Trail>
              <Divider orientation="horizontal" p={1}/>

                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeamStarred.WR1}
                         status = 'star team' handleStar = {handleStar} removeStar={removeStar} keyName='WR1'/>
                      </Flex>
                    </Trail>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeamStarred.WR2}
                         status = 'star team' handleStar = {handleStar} removeStar={removeStar} keyName='WR2'/>
                      </Flex>
                    </Trail>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeamStarred.WR3}
                         status = 'star team' handleStar = {handleStar} removeStar={removeStar} keyName='WR3'/>
                      </Flex>
                    </Trail>
              <Divider orientation="horizontal" p={1}/>
                    <Flex align='center' justify='center'>
                      <PlayerCard align='center' justify='center'
                      props = {currentTeamStarred.FLEX1}
                       status = 'star team' handleStar = {handleStar} removeStar={removeStar} keyName='FLEX1'/>
                    </Flex>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeamStarred.FLEX2}
                         status = 'star team' handleStar = {handleStar} removeStar={removeStar} keyName='FLEX2'/>
                      </Flex>
                    </Trail>
                  <Trail open={open}>
                    <Flex align='center' justify='center'>
                      <PlayerCard align='center' justify='center'
                      props = {currentTeamStarred.FLEX3}
                       status = 'star team' handleStar = {handleStar} removeStar={removeStar} keyName='FLEX3'/>
                    </Flex>
                  </Trail> 
              <Divider orientation="horizontal" p={1}/>

                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeamStarred.TE1}
                         status = 'star team' handleStar = {handleStar} removeStar={removeStar} keyName='TE1'/>
                      </Flex>
                    </Trail>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeamStarred.TE2}
                         status = 'star team' handleStar = {handleStar} removeStar={removeStar} keyName='TE2'/>
                      </Flex>
                    </Trail>
              <Divider orientation="horizontal" p={1}/>
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeamStarred.K1}
                         status = 'star team' handleStar = {handleStar} removeStar={removeStar} keyName='K1'/>
                      </Flex>
                    </Trail>
          </Box>
      </Container>
      <Divider orientation="horizontal" pb ={5}/>

      </>
    );

}


export default StarTeam;