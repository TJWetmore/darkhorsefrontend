import React, { useState, useEffect } from 'react';
import Trail from '../reactSpringsComponents/trail'
import TeamTableLive from './teamTableLiveScores'

import fire from '../../config/fire-config';


import { 
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  Flex,
  Divider,
  Box, 
  Image,
  Button,
  Text, 
  Container,
  Heading,
  Center,
  GridItem, 
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,} 
  from '@chakra-ui/react'

const LiveLeaguesContainer = (teamContainerProps) => {
  let teamDetails = teamContainerProps.teamDetails
  let {team, teamName, user, league} = teamDetails

  const [open, set] = useState(true)

  return (
    <>
    <Trail open={open} >
    <Accordion defaultIndex={[0]} allowToggle>
      <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="center">
          Standings
        </Box>      
        <AccordionIcon />
        </AccordionButton>

    <AccordionPanel pb={4}>
      <Center>
        <Box 
        
        className="disable-select"
        w={[300, 325, 450]} 
        h={[200, 225, 450]}
        borderRadius={['lg']}
        p={[0,1, 1]}
        m= {[1]}
        border="1px" 
        >
      </Box>
      </Center>
    </AccordionPanel>
    </AccordionItem>
    </Accordion>

      <TeamTableLive 
      
      team = {team}
      teamName = {teamName}
      user = {user}
      teamDetails = {teamDetails}
    />
        </Trail>
    </>
  )
}

export default LiveLeaguesContainer;