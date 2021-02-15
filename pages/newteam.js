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

  const allPlayers =`https://api.sportsdata.io/v3/nfl/scores/json/Players`
  const getData = (url) =>
  axios.get(url, {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_SPORTSDATA_apiKey
    }
  })
  .then(function (response) {
    const data = response.data;
    const QB = data.filter(el => el.Position === 'QB' && el.Team !== null)
    const RB = data.filter(el => el.Position === 'RB' && el.Team !== null)
    const WR = data.filter(el => el.Position === 'WR' && el.Team !== null)
    const TE = data.filter(el => el.Position === 'TE' && el.Team !== null)
    const K = data.filter(el => el.Position === 'K' && el.Team !== null)
    console.log('QB: ', QB)
    console.log('RB: ', RB)
    console.log('WR: ', WR)
    console.log('TE: ', TE)
    console.log('K: ', K)
  })
  .catch(function (error) {
    console.log(error);
  })

    return (
      <>
      <Button onClick={() => getData(allPlayers)}> All Players</Button>
      </>
    );
}

export default NewTeam;