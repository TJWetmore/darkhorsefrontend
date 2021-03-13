import React, { useState, useEffect } from 'react';
import Trail from '../reactSpringsComponents/trail'
import { StarIcon } from '@chakra-ui/icons'
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



const TeamTableLive = (teamContainerProps) => {

  let {QB1, QB2, RB1, RB2, RB3, WR1, WR2, WR3, FLEX1, FLEX2, FLEX3, TE1, TE2, K1} = teamContainerProps.team


  const teamPrimaryColorsNum = {1	:	'#000000', 2	:	'#000000', 3	:		'#000000', 4	:	'#00338D'	, 5	:	'#101820'	, 6	: '#0B162A', 7	:	'#000000' , 8	:	'#311D00', 9	:'#041E42',		 10	:'#002244', 11	:'#0076B6', 12	:'#203731', 13	:'#03202F', 14	:'#002C5F', 15	:'#101820', 16	:'#E31837', 19	:'#008E97', 20	:'#4F2683', 21	:'#002244', 22	:'#101820', 23	:'#0B2265', 24	:'#000000', 25	:'#000000', 26	:'#004C54', 28	:'#101820', 29	:'#002A5E', 30	:'#002244', 31	:'#AA0000', 32	:'#003594', 33	:'#D50A0A', 34	:'#0C2340', 35	:'#773141'}
  const teamSecondaryColorsNum = {1: '#97233F', 2: '#A71930'	, 3: '#241773', 4: '#C60C30', 5: '#0085CA', 6: '#C83803', 7: '#FB4F14', 8: '#FF3C00', 9: '#869397', 10: '#FB4F14', 11: '#B0B7BC', 12: '#FFB612', 13: '#A71930', 14: '#A2AAAD', 15: '#D7A22A', 16: '#FFB81C', 19: '#FC4C02', 20: '#FFC62F', 21: '#C60C30', 22: '#D3BC8D', 23: '#A71930', 24: '#125740', 25: '#A5ACAF', 26: '#ACC0C6', 28: '#FFB612', 29: '#FFC20E', 30: '#69BE28', 31: '#B3995D', 32: '#FFA300', 33: '#FF7900', 34: '#4B92DB', 35:	'#FFB612'}


  return (
    <>
    <Trail open={open} >
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
    <Table variant="simple" size='xs' fontSize="sm" overflow='hidden'>
        <Thead>
          <Tr fontSize="xs">
            <Th ml={5}>Player</Th>
            <Th isNumeric>This Week</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody>

          <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[QB1.TeamID]})`} boarderColor={teamPrimaryColorsNum[QB1.TeamID]}>
            <Td>
              <Image 
              objectFit="cover"
              borderRadius="full"
              className="img"
              backgroundColor = '#EDF2F7'
              ml={5}
              boxSize="50px"
              border="4 px" 
              width={'auto'}
              height={'45px'}
              ml={5}
              src={QB1.PhotoUrl}
              fallbackSrc='http://clipart-library.com/images/pi78o4BxT.png'
              />
            </Td>
            <Td>
              <Grid templateRows={["repeat(2 , 23px)"]}>
                <GridItem>
                <Text>{QB1.Name} 
                {QB1.star === true && (<>  <StarIcon/> <StarIcon/> <StarIcon/></>)}
                </Text>
                </GridItem>
                <GridItem>
                  <Text>{QB1.Position} - {QB1.Team}</Text>
                </GridItem>
              </Grid>
            </Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td>
        </Tr>
          <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[QB2.TeamID]})`} >
            
          <Td>
              <Image 
              objectFit="cover"
              borderRadius="full"
              className="img"
              backgroundColor = '#EDF2F7'
              boxSize="50px"
              border="4 px" 
              width={'auto'}
              height={'45px'}
              ml={5}
              src={QB2.PhotoUrl}
              fallbackSrc='http://clipart-library.com/images/pi78o4BxT.png'
              />
            </Td>
            <Td>
              <Grid templateRows={["repeat(2 , 23px)"]}>
                <GridItem>
                <Text>{QB2.Name}
                {QB2.star === true && (<>  <StarIcon/> <StarIcon/> <StarIcon/></>)}
                </Text>
                </GridItem>
                <GridItem>
                  <Text>{QB2.Position} - {QB2.Team}</Text>
                </GridItem>
              </Grid>
            </Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td> 

          </Tr>
          <Divider orientation="horizontal" pb ={5}/>



          <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[RB1.TeamID]})`} >
          <Td>
              <Image 
              objectFit="cover"
              borderRadius="full"
              className="img"
              backgroundColor = '#EDF2F7'
              boxSize="50px"
              border="4 px" 
              width={'auto'}
              height={'45px'}
              ml={5}
              src={RB1.PhotoUrl}
              fallbackSrc='http://clipart-library.com/images/pi78o4BxT.png'
              />
            </Td>
            <Td>
              <Grid templateRows={["repeat(2 , 23px)"]}>
                <GridItem>
                <Text>{RB1.Name}
                {RB1.star === true && (<>  <StarIcon/> <StarIcon/> <StarIcon/></>)}
                </Text>
                </GridItem>
                <GridItem>
                  <Text>{RB1.Position} - {RB1.Team}</Text>
                </GridItem>
              </Grid>
            </Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td>
          </Tr>
        
          <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[RB2.TeamID]})`} >
          <Td>
              <Image 
              objectFit="cover"
              borderRadius="full"
              className="img"
              backgroundColor = '#EDF2F7'
              boxSize="50px"
              border="4 px" 
              width={'auto'}
              height={'45px'}
              ml={5}
              src={RB2.PhotoUrl}
              fallbackSrc='http://clipart-library.com/images/pi78o4BxT.png'
              />
            </Td>
            <Td>
              <Grid templateRows={["repeat(2 , 23px)"]}>
                <GridItem>
                <Text>{RB2.Name}
                {RB2.star === true && (<>  <StarIcon/> <StarIcon/> <StarIcon/></>)}
                </Text>
                </GridItem>
                <GridItem>
                  <Text>{RB2.Position} - {RB2.Team}</Text>
                </GridItem>
              </Grid>
            </Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td>

          </Tr>
          <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[RB3.TeamID]})`} >
          <Td>
              <Image 
              objectFit="cover"
              borderRadius="full"
              className="img"
              backgroundColor = '#EDF2F7'
              boxSize="50px"
              border="4 px" 
              width={'auto'}
              height={'45px'}
              ml={5}
              src={RB3.PhotoUrl}
              fallbackSrc='http://clipart-library.com/images/pi78o4BxT.png'
              />
            </Td>
            <Td>
              <Grid templateRows={["repeat(2 , 23px)"]}>
                <GridItem>
                <Text>{RB3.Name}
                {RB3.star === true && (<>  <StarIcon/> <StarIcon/> <StarIcon/></>)}
                </Text>
                </GridItem>
                <GridItem>
                  <Text>{RB3.Position} - {RB3.Team}</Text>
                </GridItem>
              </Grid>
            </Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td>

          </Tr>
          <Divider orientation="horizontal" pb ={5}/>

          <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[WR1.TeamID]})`} >
          <Td>
              <Image 
              objectFit="cover"
              borderRadius="full"
              className="img"
              backgroundColor = '#EDF2F7'
              boxSize="50px"
              border="4 px" 
              width={'auto'}
              height={'45px'}
              ml={5}
              src={WR1.PhotoUrl}
              fallbackSrc='http://clipart-library.com/images/pi78o4BxT.png'
              />
            </Td>
            <Td>
              <Grid templateRows={["repeat(2 , 23px)"]}>
                <GridItem>
                <Text>
                  {WR1.star === true && (<>  <StarIcon/> <StarIcon/> <StarIcon/></>)}
                  {WR1.Name}</Text>
                </GridItem>
                <GridItem>
                  <Text>{WR1.Position} - {WR1.Team}</Text>
                </GridItem>
              </Grid>
            </Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td>
          </Tr>
          <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[WR2.TeamID]})`} >
          <Td>
              <Image 
              objectFit="cover"
              borderRadius="full"
              className="img"
              backgroundColor = '#EDF2F7'
              boxSize="50px"
              border="4 px" 
              width={'auto'}
              height={'45px'}
              ml={5}
              src={WR2.PhotoUrl}
              fallbackSrc='http://clipart-library.com/images/pi78o4BxT.png'
              />
            </Td>
            <Td>
              <Grid templateRows={["repeat(2 , 23px)"]}>
                <GridItem>
                <Text>
                  {WR2.Name}
                  {WR2.star === true && (<>  <StarIcon/> <StarIcon/> <StarIcon/></>)}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>{WR2.Position} - {WR2.Team}</Text>
                </GridItem>
              </Grid>
            </Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td> 

          </Tr>
          <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[WR3.TeamID]})`} >
          <Td>
              <Image 
              objectFit="cover"
              borderRadius="full"
              className="img"
              backgroundColor = '#EDF2F7'
              boxSize="50px"
              border="4 px" 
              width={'auto'}
              height={'45px'}
              ml={5}
              src={WR3.PhotoUrl}
              fallbackSrc='http://clipart-library.com/images/pi78o4BxT.png'
              />
            </Td>
            <Td>
              <Grid templateRows={["repeat(2 , 23px)"]}>
                <GridItem>
                <Text>
                  {WR3.Name}
                  {WR3.star === true && (<>  <StarIcon/> <StarIcon/> <StarIcon/></>)}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>{WR3.Position} - {WR3.Team}</Text>
                </GridItem>
              </Grid>
            </Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td>

          </Tr>
          <Divider orientation="horizontal" pb ={5}/>

          <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[FLEX1.TeamID]})`} >
          <Td>
              <Image 
              objectFit="cover"
              borderRadius="full"
              className="img"
              backgroundColor = '#EDF2F7'
              boxSize="50px"
              border="4 px" 
              width={'auto'}
              height={'45px'}
              ml={5}
              src={FLEX1.PhotoUrl}
              fallbackSrc='http://clipart-library.com/images/pi78o4BxT.png'
              />
            </Td>
            <Td>
              <Grid templateRows={["repeat(2 , 23px)"]}>
                <GridItem>
                <Text>
                  {FLEX1.Name}
                  {FLEX1.star === true && (<>  <StarIcon/> <StarIcon/> <StarIcon/></>)}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>{FLEX1.Position} - {FLEX1.Team}</Text>
                </GridItem>
              </Grid>
            </Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td>

          </Tr>
          <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[FLEX2.TeamID]})`} >
          <Td>
              <Image 
              objectFit="cover"
              borderRadius="full"
              className="img"
              backgroundColor = '#EDF2F7'
              boxSize="50px"
              border="4 px" 
              width={'auto'}
              height={'45px'}
              ml={5}
              src={FLEX2.PhotoUrl}
              fallbackSrc='http://clipart-library.com/images/pi78o4BxT.png'
              />
            </Td>
            <Td>
              <Grid templateRows={["repeat(2 , 23px)"]}>
                <GridItem>
                <Text>
                  {FLEX2.Name}
                  {FLEX2.star === true && (<>  <StarIcon/> <StarIcon/> <StarIcon/></>)}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>{FLEX2.Position} - {FLEX2.Team}</Text>
                </GridItem>
              </Grid>
            </Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td>

          </Tr>
          <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[FLEX3.TeamID]})`} >
          <Td>
              <Image 
              objectFit="cover"
              borderRadius="full"
              className="img"
              backgroundColor = '#EDF2F7'
              boxSize="50px"
              border="4 px" 
              width={'auto'}
              height={'45px'}
              ml={5}
              src={FLEX3.PhotoUrl}
              fallbackSrc='http://clipart-library.com/images/pi78o4BxT.png'
              />
            </Td>
            <Td>
              <Grid templateRows={["repeat(2 , 23px)"]}>
                <GridItem>
                <Text>
                  {FLEX3.Name}
                  {FLEX3.star === true && (<>  <StarIcon/> <StarIcon/> <StarIcon/></>)}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>{FLEX3.Position} - {FLEX3.Team}</Text>
                </GridItem>
              </Grid>
            </Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td>

          </Tr>
          <Divider orientation="horizontal" pb ={5}/>

          <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[TE1.TeamID]})`} >
          <Td>
              <Image 
              objectFit="cover"
              borderRadius="full"
              className="img"
              backgroundColor = '#EDF2F7'
              boxSize="50px"
              border="4 px" 
              width={'auto'}
              height={'45px'}
              ml={5}
              src={TE1.PhotoUrl}
              fallbackSrc='http://clipart-library.com/images/pi78o4BxT.png'
              />
            </Td>
            <Td>
              <Grid templateRows={["repeat(2 , 23px)"]}>
                <GridItem>
                <Text>
                  {TE1.Name}
                  {TE1.star === true && (<>  <StarIcon/> <StarIcon/> <StarIcon/></>)}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>{TE1.Position} - {TE1.Team}</Text>
                </GridItem>
              </Grid>
            </Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td>
          </Tr>
          <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[TE2.TeamID]})`} >
          <Td>
              <Image 
              objectFit="cover"
              borderRadius="full"
              className="img"
              backgroundColor = '#EDF2F7'
              boxSize="50px"
              border="4 px" 
              width={'auto'}
              height={'45px'}
              ml={5}
              src={TE2.PhotoUrl}
              fallbackSrc='http://clipart-library.com/images/pi78o4BxT.png'
              />
            </Td>
            <Td>
              <Grid templateRows={["repeat(2 , 23px)"]}>
                <GridItem>
                <Text>
                  {TE2.Name}
                  {TE2.star === true && (<>  <StarIcon/> <StarIcon/> <StarIcon/></>)}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>{TE2.Position} - {TE2.Team}</Text>
                </GridItem>
              </Grid>
            </Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td>
          </Tr>
          
          <Divider orientation="horizontal" p ={2} colorScheme='Grey.200'/>

          <Tr p={2} bgGradient={`linear(to-l, #000000, ${teamSecondaryColorsNum[K1.TeamID]})`} >
          <Td>
              <Image 
              objectFit="cover"
              borderRadius="full"
              className="img"
              backgroundColor = '#EDF2F7'
              boxSize="50px"
              border="4 px" 
              width={'auto'}
              height={'45px'}
              ml={5}
              src={K1.PhotoUrl}
              fallbackSrc='http://clipart-library.com/images/pi78o4BxT.png'
              />
            </Td>
            <Td>
              <Grid templateRows={["repeat(2 , 23px)"]}>
                <GridItem>
                <Text>
                  {K1.Name}
                  {K1.star === true && (<>  <StarIcon/> <StarIcon/> <StarIcon/></>)}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>{K1.Position} - {K1.Team}</Text>
                </GridItem>
              </Grid>
            </Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td>
          </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th ml={3}>Totals</Th>
              <Th></Th>
              <Th >0</Th>
              <Th >0</Th>
            </Tr>
          </Tfoot>
        </Table>
        </AccordionPanel>
        </AccordionItem>
      </Accordion>
      </Trail>
  </>
)
}

export default TeamTableLive;