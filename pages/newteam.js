import React from "react"
import fire from '../config/fire-config.js';
const axios = require('axios');

import { 
  Grid,
  Container,
  Box, 
  Button,
  Heading, 
  GridItem} 
  from '@chakra-ui/react'

const NewTeam = () => {
  let user = fire.auth().currentUser


    return (
      <>
      <Button onClick={() => getData(allPlayers)}> All Players</Button>
      </>
    );
}

export default NewTeam;