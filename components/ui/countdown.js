import React, {useEffect, useState} from "react";
import Trail from '../reactSpringsComponents/trail';
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


  const CountDown = () => {
    var targetDate = new Date("2021-09-09")

    console.log(targetDate)

    return (
      <Text>Football Starts in: {targetDate}</Text>

    )
  }

  export default CountDown;