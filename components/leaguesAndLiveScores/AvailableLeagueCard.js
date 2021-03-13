import React, {useEffect, useState} from "react";
import Trail from '../reactSpringsComponents/trail';
import { useSpring, animated, to } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import { useDisclosure } from "@chakra-ui/react"
import { useAuth } from './../../hooks/useAuth';


import { 
  Grid,
  Flex,
  Box, 
  Image,
  Text, 
  Divider,  
  Container,
  Heading,
  Center,
  Button, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  GridItem} 
  from '@chakra-ui/react'

const LeagueCard = (availableLeaguesProps) => {
  let auth = useAuth();
  let {leagueName} = availableLeaguesProps.props.leagueDetails;
  let teamName = availableLeaguesProps.teamName;
  let leagueID = availableLeaguesProps.props.leagueID;
  let teamId = availableLeaguesProps.teamId;
  let teamDetails = availableLeaguesProps.teamDetails;
  console.log('setShow in League Card ===>', availableLeaguesProps.setShowLeague)
  let {leagueCatch, leagueSummary, maxTeams, placeFirst, placeFourth, placeSecond, placeThird, teamCount, placeTop10, leagueNumber} = availableLeaguesProps.props.leagueDetails.leagueDetails;

  const { isOpen, onOpen, onClose } = useDisclosure();


  const [bind, { delta, down, dragging }] = useGesture();
  const { x, bg, size } = useSpring({
    x: down ? delta[0] : 0,
    bg: null,
    size: down ? 1.1 : 1,
    immediate: name => down && name === 'x',
    config: { duration: 200 },
    delay: 1
  });
  const avSize = x.to({ map: Math.abs, range: [-500, 500], output: ['scale(0.5)', 'scale(1)'], extrapolate: 'clamp' });


  useEffect(() => {
    if (delta[0] > 250) {
      onOpen()
    }
  }, [delta[0]]); 

  async function closeModule(){
    await auth.addTeamToRTDBLeague(leagueID, teamId, teamDetails);
    availableLeaguesProps.setShowLeague(true)
    onClose();
  }

    return (
      <>
      <Trail open={open} key={leagueNumber}>
      <Box 
      className="disable-select"
      w={[300, 325, 400]} 
      h={[220]}
      borderRadius={['lg']}
      p={[0,1, 1]}
      m= {[1]}
      border="1px" 
      onDoubleClick={()=>onOpen()}
      >
      <animated.div   {...bind()} style={{ background: bg, margin:'2px', padding:'1px' }} >
        <animated.div className="av" style={{ transform: avSize, justifySelf: dragging ? 'end' : 'start' }} />
        <animated.div className="fg" style={{ transform: to([x, size], (x, s) => `translate3d(${x}px,0,0) scale(${s})`) }}>

        <Grid m= {[1]} h={[200]} border='1px' borderRadius={['lg']} templateColumns={["repeat(2 , 1fr)"]} templateRows={["repeat(5 , 23px)"]} gap={2} p={[0,1, 1]} borderColor={"#9C4221"} >
          <GridItem rowSpan={[1]} colSpan={3}>
            <Heading fontSize="2xl" textAlign='center' bg={"#9C4221"} color={"#f5ece8"} >{leagueName}</Heading>
          </GridItem>
          <GridItem rowSpan={[1]} colSpan={3}> 
              <Text fontSize="lg" textAlign='center'>{leagueCatch}</Text>
          </GridItem>
          <GridItem rowSpan={[1]} colSpan={3}>  
              <Text fontSize="xs" textAlign='center'>{leagueSummary}</Text>
              <Divider />
          </GridItem>
          <GridItem rowSpan={[1]}>
              <Text textAlign='center'>Prizes:</Text>
              <Divider/>
              {placeFirst && (<Text colSpan={1} fontSize="md" textAlign='center'>1st Place: ${placeFirst}</Text>)}
              {placeSecond && <Text colSpan={1} fontSize="xs" textAlign='center'>2nd Place: ${placeSecond}</Text>}
              {placeThird && <Text colSpan={1} fontSize="xs" textAlign='center'>3rd Place: ${placeThird}</Text>}
              {placeFourth && <Text colSpan={1} fontSize="xs" textAlign='center'>4th Place: ${placeFourth}</Text>}
              {placeTop10 && <Text colSpan={1} fontSize="md" textAlign='center'>Place Top 10: ${placeTop10}</Text>}
          </GridItem>
          <GridItem rowSpan={[1]}>
            <Text textAlign='center'>Status:</Text>
              <Divider/>
              <Text colSpan={1} fontSize={['xs', 'xs', "md"]} textAlign='left'>League Size: {maxTeams} Teams</Text>
              <Text colSpan={1} fontSize={['xs', 'xs', "md"]} textAlign='left'>Open Spots: {(maxTeams - teamCount)} Teams</Text>
          </GridItem>
        </Grid>
        </animated.div>
      </animated.div>
      </Box>
      </Trail>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center' bg={"#9C4221"}>League: {leagueName}</ModalHeader>
          <ModalBody>
            <Text  textAlign='center'></Text>
            <Text textAlign='center'>Add Team: {teamName}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              No
            </Button>
            <Button  variant="outline" onClick={()=> closeModule() }>Yes, Add Team</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
      
    );
}

export default LeagueCard;