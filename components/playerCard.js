import React, {useEffect, useState} from "react"
import { StarIcon } from '@chakra-ui/icons'

import { useSpring, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import CustomCheck from './checkBox'

import { 
  Grid,
  Flex,
  Box, 
  Image,
  Text, 
  IconButton,
  Heading,
  Center,
  GridItem} 
  from '@chakra-ui/react'

const PlayerCard = (el, handleTeam, status) => {
  const num = el.props.TeamID;
  const teamPrimaryColorsNum = {1	:	'#000000', 2	:	'#000000', 3	:		'#000000', 4	:	'#00338D'	, 5	:	'#101820'	, 6	: '#0B162A', 7	:	'#000000' , 8	:	'#311D00', 9	:'#041E42',		 10	:'#002244', 11	:'#0076B6', 12	:'#203731', 13	:'#03202F', 14	:'#002C5F', 15	:'#101820', 16	:'#E31837', 19	:'#008E97', 20	:'#4F2683', 21	:'#002244', 22	:'#101820', 23	:'#0B2265', 24	:'#000000', 25	:'#000000', 26	:'#004C54', 28	:'#101820', 29	:'#002A5E', 30	:'#002244', 31	:'#AA0000', 32	:'#003594', 33	:'#D50A0A', 34	:'#0C2340', 35	:'#773141'}

  const teamSecondaryColorsNum = {1: '#97233F', 2: '#A71930'	, 3: '#241773', 4: '#C60C30', 5: '#0085CA', 6: '#C83803', 7: '#FB4F14', 8: '#FF3C00', 9: '#869397', 10: '#FB4F14', 11: '#B0B7BC', 12: '#FFB612', 13: '#A71930', 14: '#A2AAAD', 15: '#D7A22A', 16: '#FFB81C', 19: '#FC4C02', 20: '#FFC62F', 21: '#C60C30', 22: '#D3BC8D', 23: '#A71930', 24: '#125740', 25: '#A5ACAF', 26: '#ACC0C6', 28: '#FFB612', 29: '#FFC20E', 30: '#69BE28', 31: '#B3995D', 32: '#FFA300', 33: '#FF7900', 34: '#4B92DB', 35:	'#FFB612'}

  let logo = require(`../media/logos/${el.props.CurrentTeam}.png`)
  let star = require(`../media/star2.png`)

  let [tracker, setTracker]= useState(true);

  let [deleteTracker, setDeleteTracker]= useState(true);

  let [starTracker, setStarTracker]= useState(true);


  const property = {
    imageUrl: el.props.PhotoUrl,
    imageAlt: 'http://clipart-library.com/images/pi78o4BxT.png',
    name: el.props.DraftKingsName,
    team: el.props.CurrentTeam,
    position: el.props.FantasyPosition,
    logoAlt: 'http://clipart-library.com/images/pi78o4BxT.png',
    primaryColor : teamPrimaryColorsNum[num],
    secondaryColor : teamSecondaryColorsNum[num], 
    teamLogo : logo,
    star : el.props.star
  }

    const [bind, { delta, down }] = useGesture()
    const { x, bg, size } = useSpring({
      x: down ? delta[0] : 0,
      bg: `linear-gradient(200deg, ${delta[0] < -10 ? `${property.secondaryColor} 0%, ${property.primaryColor}` : `${property.primaryColor} 0%, ${property.secondaryColor}`} 100%)`,
      size: down ? 1.1 : 1,
      immediate: name => down && name === 'x'
    })
    const avSize = x.interpolate({ map: Math.abs, range: [0, 75], output: ['scale(0.5)', 'scale(1)'], extrapolate: 'clamp' })

    useEffect(() => {
      // console.log(delta[0])
      if (tracker && delta[0] > 250 && el.status ==='available') {
        el.handleTeam(el.props, el.props.Position)
        setTracker(false)
      }
      if (deleteTracker && delta[0] < -250 && el.status ==='current team') {
        el.handleTeam(el.props, el.props.Position)
        setDeleteTracker(false)
      }


    }, [delta[0]]);

    return (
      <>
      <Box 
      w={[300, 325, 400]} 
      h={['auto']}
      borderRadius={['lg']}
      p={[0,1, 1]}
      m= {[1]}
      border="1px" 
      borderColor={property.secondaryColor}
      onDoubleClick={() => el.handleTeam(el.props, el.props.Position)}
      >
      <animated.div   {...bind()} style={{ background: bg, margin:'2px', padding:'1px' }} >
        <animated.div className="av" style={{ transform: avSize, justifySelf: delta[0] < 1 ? 'end' : 'start' }} />
        <animated.div className="fg" style={{ transform: interpolate([x, size], (x, s) => `translate3d(${x}px,0,0) scale(${s})`) }}>
        <Grid templateColumns={["repeat(4, 1fr)"]} templateRows={["repeat(2, 23px)"]} gap={2}>
          <GridItem colSpan={[0, 0, 1]} >
            <Center>
            <Image 
              objectFit="cover"
              borderRadius="full"
              className="img"
              backgroundColor = '#EDF2F7'
              boxSize="50px"
              border="4 px" 
              borderColor={property.secondaryColor}
              src={property.imageUrl}
              fallbackSrc={property.imageAlt}
            />
            </Center>
          </GridItem>
          <GridItem colSpan={[2]}>
            <Box>
            <Heading color="#F7FAFC" textAlign={[ 'left', 'left', 'center' ]} fontSize={["md", "sm", "lg"]} textOverflow='fade'>{property.name}</Heading>
            <Text color="#F7FAFC" textAlign={[ 'left', 'left', 'center' ]} fontSize={["md", "sm", "md"]}>{property.position} - {property.team}</Text>
            </Box>
          </GridItem>
          <GridItem 
          colSpan={1}
          >
            <Flex p={1} justifyContent={["flex-end","center", "flex-end"]} position="top">
              <Image
                boxSize={['25px', '25px', "30px"]}
                src={property.teamLogo}
                fallbackSrc={property.logoAlt}
              />
            </Flex>
          </GridItem>
        </Grid>

      </animated.div>
      </animated.div>
      </Box>
      </>
      
    );
}

export default PlayerCard;