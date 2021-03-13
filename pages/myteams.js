import { useAuth } from '../hooks/useAuth';
import TeamContainer from '../components/leaguesAndLiveScores/teamContainer';
import React, { useState, useEffect } from 'react';
import Trail from '../components/ReactSpringsComponents/trail'
import fire from '../config/fire-config';
import Cookies from 'js-cookie'
import cookies from 'next-cookies'



import { 
  Grid,
  Container,
  Box, 
  Button,
  Divider,
  Heading, 
  Text,
  Flex,
  Spinner,
  GridItem} 
  from '@chakra-ui/react'
  

const MyTeams = ({userTeamsArg, userLeaguesArg}) => {
  let auth = useAuth();
  let user = auth.user;
  const [userTeams, setUserTeams] = useState(userTeamsArg);
  const [leaguesAvailable, setleaguesAvailable] = useState(userLeaguesArg);

  const [open, set] = useState(true);

  return (
          <Container pt={15, 25, 40} colSpan={1} maxW="lg" centerContent>
            {(user === null || user.userName === null || userTeams === undefined) ? 
              <Flex p={60}>
                <Spinner p={[30]}/>
              </Flex>
              :
                <>
                <Heading alignItems="top">{user.userName}'s Teams</Heading>
                  <Grid className="disable-select"  pb={10, 15, 20} templateColumns={["repeat(1, 1fr)"]} templateRows={["repeat(2, 1fr)","repeat(2, 1fr)","repeat(1, 1fr)"]} >
                    {(userTeams !== undefined) && (
                      userTeams.map( el =>
                        <>
                          <GridItem m={3} key={el.teamDbId}>
                            <Box w={[405, 405, 600]} h={[500, 650, 850]} padding="4" m={6} borderWidth="3px" borderRadius="lg" overflowY="auto" overflowX='hidden'>
                              <Trail open={open}/>

                              <Heading fontSize="xl" align='center'>{el.name}</Heading>
                                <Divider p={1}/>
                                  <TeamContainer
                                  props = {el}
                                  team = {el.teamDetails}
                                  leagues = {leaguesAvailable}
                                  />
                            </Box>
                          </GridItem>
                        </>
                        ))} 
                  </Grid>
                  </>
                } 
         </Container>
  )

}

MyTeams.getInitialProps = async (ctx) => {
  let uid = cookies(ctx).userId;
  let usersTeamList;
  let thisUserTeams = [];
  let userTeamsRef = fire.database().ref('/teams');
  await userTeamsRef.once('value', (snapshot) => {
    usersTeamList = snapshot.val();
  })
  for (let keys in usersTeamList) {
    if (usersTeamList[keys].user === uid) {
      let subArr = {};
      subArr.teamId = keys;
      subArr.teamDetails = usersTeamList[keys];
      thisUserTeams.push(subArr);
    }
  }
  let userLeagues = [];
  let availableLeagues;
  let availableLeaguesRef = fire.database().ref('/leagues');
  await availableLeaguesRef.once('value', (snapshot) => {
    availableLeagues = snapshot.val();
  })

  for (let keys in availableLeagues) {
    if (availableLeagues[keys].full === false) {
      let subArr = {};
      subArr.leagueID = keys;
      subArr.leagueDetails = availableLeagues[keys];
      userLeagues.push(subArr);
    }
  }

  return { userTeamsArg : thisUserTeams, userLeaguesArg: userLeagues }

};

export default MyTeams;