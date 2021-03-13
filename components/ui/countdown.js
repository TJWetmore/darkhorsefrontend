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

    let currentDate = Date.now()

    const diffTime = Math.abs(targetDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    return (
      <Text textAlign='center'>Football Starts in: {diffDays} days </Text>

    )
  }

  export default CountDown;