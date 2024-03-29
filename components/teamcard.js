import React, { useState } from 'react';
import Trail from './reactSpringsComponents/trail'

import { 
  Grid,
  Flex,
  Box, 
  Image,
  Text, 
  Container,
  Heading,
  Center,
  GridItem} 
  from '@chakra-ui/react'

const PlayerCard = (el) => {

  const [open, set] = useState(true)
  
  const teamPrimaryColorsNum = {1	:	'#000000', 2	:	'#000000', 3	:		'#000000', 4	:	'#00338D'	, 5	:	'#101820'	, 6	: '#0B162A', 7	:	'#000000' , 8	:	'#311D00', 9	:'#041E42',		 10	:'#002244', 11	:'#0076B6', 12	:'#203731', 13	:'#03202F', 14	:'#002C5F', 15	:'#101820', 16	:'#E31837', 19	:'#008E97', 20	:'#4F2683', 21	:'#002244', 22	:'#101820', 23	:'#0B2265', 24	:'#000000', 25	:'#000000', 26	:'#004C54', 28	:'#101820', 29	:'#002A5E', 30	:'#002244', 31	:'#AA0000', 32	:'#003594', 33	:'#D50A0A', 34	:'#0C2340', 35	:'#773141'}

  const teamSecondaryColorsNum = {1: '#97233F', 2: '#A71930'	, 3: '#241773', 4: '#C60C30', 5: '#0085CA', 6: '#C83803', 7: '#FB4F14', 8: '#FF3C00', 9: '#869397', 10: '#FB4F14', 11: '#B0B7BC', 12: '#FFB612', 13: '#A71930', 14: '#A2AAAD', 15: '#D7A22A', 16: '#FFB81C', 19: '#FC4C02', 20: '#FFC62F', 21: '#C60C30', 22: '#D3BC8D', 23: '#A71930', 24: '#125740', 25: '#A5ACAF', 26: '#ACC0C6', 28: '#FFB612', 29: '#FFC20E', 30: '#69BE28', 31: '#B3995D', 32: '#FFA300', 33: '#FF7900', 34: '#4B92DB', 35:	'#FFB612'}


  return (
    <>
    <Trail open={open} key= {el.props.PlayerID}>
        <Box 
        className="disable-select"
        w={[300, 325, 'auto']} 
        h={[200, 225, 300]}
        borderRadius={['lg']}
        p={[0,1, 1]}
        m= {[1]}
        border="1px" 
        >
          <Text></Text>
      </Box>
      </Trail>
    </>
  )
}

export default PlayerCard;