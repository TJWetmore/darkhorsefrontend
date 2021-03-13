import React from "react"
import ThemeToggle from './../ui/toggle-theme'
import LeagueCard from './leagueCard'
import Countdown from '../ui/countdown'
import fire from '../../config/fire-config.js';
import { useAuth } from './../../hooks/useAuth';
import { StarIcon } from '@chakra-ui/icons'

import { 
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Thead,
  Tbody,
  Heading,
  Tfoot,
  Divider, 
  Tr,
  Th,
  Td,
  Button, 
  Text, 
  Flex, 
  Container, 
  Box, 
  Center
} from "@chakra-ui/react"


const AvailableLeagues = (teamContainerProps) => {
  const teamPrimaryColorsNum = {1	:	'#000000', 2	:	'#000000', 3	:		'#000000', 4	:	'#00338D'	, 5	:	'#101820'	, 6	: '#0B162A', 7	:	'#000000' , 8	:	'#311D00', 9	:'#041E42',		 10	:'#002244', 11	:'#0076B6', 12	:'#203731', 13	:'#03202F', 14	:'#002C5F', 15	:'#101820', 16	:'#E31837', 19	:'#008E97', 20	:'#4F2683', 21	:'#002244', 22	:'#101820', 23	:'#0B2265', 24	:'#000000', 25	:'#000000', 26	:'#004C54', 28	:'#101820', 29	:'#002A5E', 30	:'#002244', 31	:'#AA0000', 32	:'#003594', 33	:'#D50A0A', 34	:'#0C2340', 35	:'#773141'}
  const teamSecondaryColorsNum = {1: '#97233F', 2: '#A71930'	, 3: '#241773', 4: '#C60C30', 5: '#0085CA', 6: '#C83803', 7: '#FB4F14', 8: '#FF3C00', 9: '#869397', 10: '#FB4F14', 11: '#B0B7BC', 12: '#FFB612', 13: '#A71930', 14: '#A2AAAD', 15: '#D7A22A', 16: '#FFB81C', 19: '#FC4C02', 20: '#FFC62F', 21: '#C60C30', 22: '#D3BC8D', 23: '#A71930', 24: '#125740', 25: '#A5ACAF', 26: '#ACC0C6', 28: '#FFB612', 29: '#FFC20E', 30: '#69BE28', 31: '#B3995D', 32: '#FFA300', 33: '#FF7900', 34: '#4B92DB', 35:	'#FFB612'}

  let {QB1, QB2, RB1, RB2, RB3, WR1, WR2, WR3, FLEX1, FLEX2, FLEX3, TE1, TE2, K1} = teamContainerProps.team

  let setShowLeague = teamContainerProps.setShowLeague;

  let teamId = teamContainerProps.teamId;
  let teamDetails = teamContainerProps.teamDetails;

  return (
    <>
    <Center key={1}>
    <Heading fontSize="3xl">Open Leagues:</Heading>
    </Center>
    <Center>
    <Text fontSize={['sm', 'sm', 'md']}>Double Click To Add Your Team To A League.</Text>
    </Center>
    <Container >
      <Center>
      <Box 
        className="disable-select"
        w={[300, 325, 450]} 
        h={['auto']}
        borderRadius={['lg']}
        p={[0,1, 1]}
        m= {[1]}
        border="1px"
        mt={3} 
      >
        {teamContainerProps.leagues.map(el =>
        <Center>
          <LeagueCard
          props = {el}
          teamId={teamId}
          teamDetails={teamDetails}
          setShowLeague = {teamContainerProps.setShowLeagues}
          />
        </Center>
          )}

      </Box>
      </Center>
      <Accordion allowToggle>
      <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex="1" textAlign="center">
          {teamContainerProps.teamName}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <Table variant="simple" size='sm' fontSize="sm" overflow='hidden'>
          <Thead>
            <Tr fontSize="xs">
              <Th w={2}>Pos</Th>
              <Th>Player</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr p={2} bgGradient={`linear(to-l, ${teamPrimaryColorsNum[QB1.TeamID]}, ${teamSecondaryColorsNum[QB1.TeamID]})`} >
              <Td>QB1</Td>
              <Td>
                {QB1.Name} 
                </Td>
              <Td m={3}>{QB1.star === true && (<><StarIcon/> <StarIcon/></>)}</Td>
            </Tr>
            <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[QB2.TeamID]})`} >
              <Td>QB2</Td>
              <Td>{QB2.Name}</Td>
              <Td m={3}>{QB2.star === true && (<><StarIcon/> <StarIcon/></>)}</Td>

            </Tr>
            <Divider orientation="horizontal" pb ={5}/>

            <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[RB1.TeamID]})`} >
              <Td>RB1</Td>
              <Td>{RB1.Name}</Td>
              <Td m={3}>{RB1.star === true && (<><StarIcon/> <StarIcon/></>)}</Td>
            </Tr>
          
            <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[RB2.TeamID]})`} >
              <Td>RB2</Td>
              <Td>{RB2.Name}</Td>
              <Td m={3}>{RB2.star === true && (<><StarIcon/> <StarIcon/></>)}</Td>
            </Tr>
            <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[RB3.TeamID]})`} >
              <Td>RB3</Td>
              <Td>{RB3.Name}</Td>
              <Td m={3}>{RB3.star === true && (<><StarIcon/> <StarIcon/></>)}</Td>
            </Tr>
            <Divider orientation="horizontal" pb ={5}/>

            <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[WR1.TeamID]})`} >
              <Td>WR1</Td>
              <Td>{WR1.Name}</Td>
              <Td m={3}>{WR1.star === true && (<><StarIcon/> <StarIcon/></>)}</Td>
            </Tr>
            <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[WR2.TeamID]})`} >
              <Td>WR2</Td>
              <Td>{WR2.Name}</Td>
              <Td m={3}>{WR2.star === true && (<><StarIcon/> <StarIcon/></>)}</Td>
            </Tr>
            <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[WR3.TeamID]})`} >
              <Td>WR3</Td>
              <Td>{WR3.Name}</Td>
              <Td m={3}>{WR3.star === true && (<><StarIcon/> <StarIcon/></>)}</Td>
            </Tr>
            <Divider orientation="horizontal" pb ={5}/>

            <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[FLEX1.TeamID]})`} >
              <Td>FLEX</Td>
              <Td>{FLEX1.Name}</Td>
              <Td m={3}>{FLEX1.star === true && (<><StarIcon/> <StarIcon/></>)}</Td>
            </Tr>
            <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[FLEX2.TeamID]})`} >
              <Td>FLEX</Td>
              <Td>{FLEX2.Name}</Td>
              <Td m={3}>{FLEX2.star === true && (<><StarIcon/> <StarIcon/></>)}</Td>
            </Tr>
            <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[FLEX3.TeamID]})`} >
              <Td>FLEX</Td>
              <Td>{FLEX3.Name}</Td>
              <Td m={3}>{FLEX3.star === true && (<><StarIcon/> <StarIcon/></>)}</Td>
            </Tr>
            <Divider orientation="horizontal" pb ={5}/>

            <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[TE1.TeamID]})`} >
              <Td>TE1</Td>
              <Td>{TE1.Name}</Td>
              <Td m={3}>{TE1.star === true && (<><StarIcon/> <StarIcon/></>)}</Td>
            </Tr>
            <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[TE2.TeamID]})`} >
              <Td>TE2</Td>
              <Td textOverflow='ellipsis'>{TE2.Name}</Td>
              <Td m={3}>{TE2.star === true && (<><StarIcon/> <StarIcon/></>)}</Td>
            </Tr>
            
            <Divider orientation="horizontal" p ={2} colorScheme='Grey.200'/>

            <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[K1.TeamID]})`} >
              <Td>K</Td>
              <Td>{K1.Name}</Td>
              <Td m={3}>{K1.star === true && (<><StarIcon/> <StarIcon/></>)}</Td>
            </Tr>
            </Tbody>
        </Table>
        </AccordionPanel>
        </AccordionItem>
        </Accordion>

    </Container>
    </>
  )
}

export default AvailableLeagues;