import React, { useState, useEffect } from 'react';
import fire from '../../config/fire-config.js';
import PlayerCard from '../../components/playerCard'
import StarTeam from './starnewteam'
import Trail from '../../components/ReactSpringsComponents/trail'
import { useRouter } from 'next/router'

import { 
  Flex, 
  Spinner,
  Input, 
  Grid,
  Text, 
  Divider, 
  Container,
  Box,
  Button,
  Heading, 
  GridItem} 
  from '@chakra-ui/react'
 

const NewTeam = ({currentPlayers}) => {
  let user = fire.auth().currentUser;
  const [open, setOpen] = useState(true)
  const router = useRouter()

  let [availablePlayers, setAvailablePlayers]= useState(currentPlayers);
  let [showStar, setShowStar]= useState(false);

  const [currentTeam, setCurrentTeam] = useState({});
  const [removedPlayers, setRemovedPlayers] = useState([]);

  const [teamName, setTeamName] = useState({
    name: '',
  });

  const handleStar = (el, pos) => {
    console.log('adding star');
    for (let keys in currentTeam){
      if (currentTeam[keys].DraftKingsName === el.DraftKingsName) {
        currentTeam[keys].star = true
        setCurrentTeam(currentTeam)
      }

    }
  }

  const removeStar = (el, pos) => {
    console.log('removing star');
    for (let keys in currentTeam){
      if (currentTeam[keys].DraftKingsName === el.DraftKingsName) {
        currentTeam[keys].star = false
        setCurrentTeam(currentTeam)
        // this.forceUpdate()
      }

    }
  }

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setTeamName({ ...teamName, [name]: value });
  };  

  const [positionCount, setPositionCount] = useState({
    QB: 1, 
    RB: 1,
    WR: 1, 
    TE: 1,
    FLEX: 1,
    K: 1
  });

  const handleTeamPosition = (inputPosition) => {
    if (inputPosition === 'QB' && positionCount.QB <= 2) {
      let title = `QB${positionCount.QB}`;
      let QB = positionCount.QB + 1;
      setPositionCount({...positionCount, QB });
      return title;
    }
    if (inputPosition === 'K' && positionCount.K <= 1) {
      let title = `K${positionCount.K}`;
      let K = positionCount.K + 1;
      setPositionCount({...positionCount, K });
      return title;
    }

    if (inputPosition === 'TE' && positionCount.TE <= 2) {
      let title = `TE${positionCount.TE}`;
      let TE = positionCount.TE + 1;
      setPositionCount({...positionCount, TE });
      return title;
    }

    if (inputPosition === 'TE' && positionCount.TE >= 2 && positionCount.FLEX <= 3) {
      let title = `FLEX${positionCount.FLEX}`;
      let FLEX = positionCount.FLEX + 1;
      setPositionCount({...positionCount, FLEX });
      return title;
    }

    if (inputPosition === 'RB' && positionCount.RB <= 3) {
      let title = `RB${positionCount.RB}`;
      let RB = positionCount.RB + 1;
      setPositionCount({...positionCount, RB });
      return title;
    }

    if (inputPosition === 'RB' && positionCount.RB >= 2 && positionCount.FLEX <= 3) {
      let title = `FLEX${positionCount.FLEX}`;
      let FLEX = positionCount.FLEX + 1;
      setPositionCount({...positionCount, FLEX });
      return title;
    }

    if (inputPosition === 'WR' && positionCount.WR <= 3) {
      let title = `WR${positionCount.WR}`;
      let WR = positionCount.WR + 1;
      setPositionCount({...positionCount, WR });
      return title;
    }

    if (inputPosition === 'WR' && positionCount.WR >= 2 && positionCount.FLEX <= 3) {
      let title = `FLEX${positionCount.FLEX}`;
      let FLEX = positionCount.FLEX + 1;
      setPositionCount({...positionCount, FLEX });
      return title;
    }
    
    else return null;
  }

  const filterTeams = (oneTeam) => {
    let obj = availablePlayers;
    for (let keys in obj) {
      let subobj = obj[keys];
      for (let subkey in subobj){
        let player = subobj[subkey];
        if (player.CurrentTeam === oneTeam){
          let removedArr = removedPlayers;
          removedArr.push(player)
          setRemovedPlayers(removedArr)
          delete subobj[subkey]
        }
      }
    }
    setAvailablePlayers(obj)
  }
 
  const handleTeamAdd = (el, position) => {
  let positionName = handleTeamPosition(position); 
  if(positionName !== null) {
    let team = currentTeam;
    team[positionName] = el;
    setCurrentTeam(team);
  
    let arr = availablePlayers[position];
    let index = arr.indexOf(el);
    position = arr.splice(index, 1);
    setAvailablePlayers({...arr});
    filterTeams(el.CurrentTeam)
  }
};  




const handleUpdatedTeamPosition = (position) => {
  let team = currentTeam;
  console.log(team)
  for (let keys in team) {
    if(keys.includes(position) && parseInt(keys[2]) > 1) {
      console.log(keys)
      let num = parseInt(keys[2]) - 1
      let newKey = keys[0] + keys[1] + num;
      team[newKey] = team[keys]
      delete team[keys]
    }
  }
  setCurrentTeam(team)
  let updatingPositionCount = positionCount;
  updatingPositionCount[position] = updatingPositionCount[position] - 1;
  setPositionCount(updatingPositionCount);
}

const unFilterTeams = (oneTeam, player, position) => {
  let obj = availablePlayers;
  let teamsToInsert = removedPlayers.filter(el => el.CurrentTeam === oneTeam);
  teamsToInsert.push(player)
  teamsToInsert.forEach(el => {
    obj[el.FantasyPosition].unshift(el);
    setRemovedPlayers(removedPlayers.filter(el => !teamsToInsert.includes(el)));
  });
  for (let keys in obj) {
    let arr = obj[keys]
    arr.sort((a, b) => {
      return a.AverageDraftPosition - b.AverageDraftPosition;
    });
  }
  setAvailablePlayers(obj)
};

const handleTeamRemoval = (el, position) => {
  let team = currentTeam;

  for (let keys in team) {
    if (team[keys] === el) {
      delete team[keys]
    }
  }
  handleUpdatedTeamPosition(position)
  setCurrentTeam(team);
  unFilterTeams(el.CurrentTeam, el, position)
};

const [displayPlayers, setDisplayPlayers] = useState({name: 'showQB'}); 

const handlePlayers = (event) => {
  event.preventDefault();
  const { name } = event.target;
  setDisplayPlayers({name});
};  

const handleSubmit = (props) => {
  setShowStar(true)
}

const boxcolor = Object.keys(currentTeam).length === 14 ? '#F6E05E' : null ;

const buttonBoarder = Object.keys(currentTeam).length === 14 && teamName.name.length >= 5 ? '#F6E05E' : null ;

    if (showStar) {
      return (
        <>
        <StarTeam 
          currentTeam = {currentTeam}
          teamName = {teamName.name}
        />
        </>
      );
    }
    if (!showStar) {
    return (
      <>
      <Heading className="disable-select" size="xl" pt={15, 25, 40} m={2} textAlign="center" isTruncated>Pick One Player Per Team.</Heading>
      <Text className="disable-select" textAlign="center" m={2}>Double Click 2 QBs, 3 RBs, 3 WRs, 3 Flex, 2 TEs, and 1 K.</Text>
      <Divider orientation="horizontal" pb ={5}/>
      {(availablePlayers === undefined) ? 
        <Spinner/>
      :
      <Grid className="disable-select"  pb={10, 15, 20} templateColumns={["repeat(1, 1fr)","repeat(1, 1fr)","repeat(2, 1fr)"]} templateRows={["repeat(2, 1fr)","repeat(2, 1fr)","repeat(1, 1fr)"]} >
        <GridItem colSpan={[1]} rowSpan={[1, 1, 2]}>
          <Container colSpan={1} maxW="lg" centerContent>

            <Heading alignItems="top">Add Players</Heading>
            <Text>Double Click to Add.</Text>
              <Flex align='center' justify='center'>
                <Button borderColor = {boxcolor} onClick={handlePlayers} name="showQB" borderWidth="3px" m={3}>QBs</Button>
                <Button borderColor = {boxcolor} onClick={handlePlayers} name="showRB" borderWidth="3px" m={3}>RBs</Button>
                <Button borderColor = {boxcolor} onClick={handlePlayers} name="showWR" borderWidth="3px" m={3}>WRs</Button>
                <Button borderColor = {boxcolor} onClick={handlePlayers} name="showTE" borderWidth="3px" m={3}>TEs</Button>
                <Button borderColor = {boxcolor} onClick={handlePlayers} name="showK" borderWidth="3px" m={3}>Ks</Button>
              </Flex>
            <Box borderColor = {boxcolor} w={[405, 405, 550]} h={[500, 650, 800]} padding="4" borderWidth="3px" borderRadius="lg" overflowY="auto" overflowX='hidden'>
              <Trail open={open}>
                {displayPlayers.name === 'showQB' && (
                  
                  availablePlayers.QB.map( el =>
                    
                    <Flex align='center' justify='center'>
                    
                    <PlayerCard align='center' justify='center'
                    props = {el}
                    status = 'available'
                    handleTeam = {handleTeamAdd} 
                    key ={el.PlayerID}
                    > 
                    </PlayerCard>
                    <Flex align='center' justify='center'>
                    </Flex>
                    </Flex>
                    
                  )
                )}
                {displayPlayers.name === 'showRB' && (
                   availablePlayers.RB.map( el =>
                    <Flex align='center' justify='center'>
                    <PlayerCard align='center' justify='center'
                      props = {el}
                      status = 'available'
                      handleTeam = {handleTeamAdd} key ={el.PlayerID} key ={el.PlayerID}
                    /> 
                    </Flex>
                  )
                )}
                {(displayPlayers.name === 'showWR') && (
                  availablePlayers.WR.map( el =>
                    <Flex align='center' justify='center'>
                    <PlayerCard align='center' justify='center'
                    props = {el}
                    status = 'available'
                    handleTeam = {handleTeamAdd} key ={el.PlayerID}
                    />

                    </Flex>
                  )
                )}
                {displayPlayers.name === 'showTE' && (
                  availablePlayers.TE.map( el =>
                    <Flex align='center' justify='center'>
                    <PlayerCard align='center' justify='center'
                    props = {el}
                    status = 'available'
                    handleTeam = {handleTeamAdd} key ={el.PlayerID}
                    />

                    </Flex>
                  )
              )}
              {displayPlayers.name === 'showK' && (
                availablePlayers.K.map( el =>
                  <Flex align='center' justify='center'>
                  <PlayerCard align='center' justify='center'
                  props = {el}
                  status = 'available'
                  handleTeam = {handleTeamAdd} key ={el.PlayerID}/>
                  
                  </Flex>
                )
                )}
                </Trail>
            </Box>
          </Container>
        </GridItem>
        <GridItem colSpan={[1]} rowSpan={[1, 1, 2]}>
        <Container   centerContent>
          <Heading>Your Team</Heading>
            <Text>Double Click to Remove.</Text>
              <Flex align='center' justify='center'>
                <Input placeholder="Team Name" borderWidth="3px" id="name" borderColor = {boxcolor} name='name' onChange={handleInputChange}></Input>
                < Button  onClick={handleSubmit} w={[200, 275, 300]} m={3} borderWidth="3px" borderColor={buttonBoarder}>
                  Submit Team
                </Button>
              </Flex>              
            <Box w={[405, 405, 550]} h={[500, 650, 800]} borderColor = {boxcolor} padding="4" borderWidth="3px" borderRadius="lg" overflow="auto">
              {(currentTeam.QB1 !== undefined) ? 
                  <Trail open={open}>
                    <Flex align='center' justify='center'>
                      <PlayerCard align='center' justify='center'
                      props = {currentTeam.QB1}
                      handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='QB1'/>
                    </Flex>
                  </Trail>
              :
              <Flex align='center' justify='center'>
              <Box 
              m= {2,3,4 }
              w={[300, 325, 400]}
              h={[50]}
              borderWidth="1px" 
              borderRadius="lg"
              overflow="hidden"
              p={2}
              border="1px" 
              >
              <Text align='center' orientation='horizontal'>QB1</Text>
              </Box>
              </Flex>
              }
              {(currentTeam.QB2 !== undefined) ? 
                  <Trail open={open}>
                    <Flex align='center' justify='center'>
                      <PlayerCard align='center' justify='center'
                      props = {currentTeam.QB2}
                      handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='QB2'/>
                    </Flex>
                  </Trail>
              :
              <Flex align='center' justify='center'>
              <Box 
              m= {[1] }
              w={[300, 325, 400]}
              h={[50]}
              borderWidth="1px" 
              borderRadius="lg"
              overflow="hidden"
              p={2}
              border="1px" 
              >
              <Text align='center' orientation='horizontal'>QB2</Text>
              </Box>
              </Flex>
              }
              <Divider orientation="horizontal" p={1}/>
              {(currentTeam.RB1 !== undefined) ? 
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.RB1}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='RB1'/>
                      </Flex>
                    </Trail>
              :
              <Flex align='center' justify='center'>
              <Box 
              m= {2,3,4 }
              w={[300, 325, 400]}
              h={[50]}
              borderWidth="1px" 
              borderRadius="lg"
              overflow="hidden"
              p={2}
              border="1px" 
              >
                <Text align='center' orientation='horizontal'>RB1</Text>
              </Box>
              </Flex>
              }
              {(currentTeam.RB2 !== undefined) ? 
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.RB2}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='RB2'
                        />
                      </Flex>
                    </Trail>
              :
              <Flex align='center' justify='center'>
              <Box 
              m= {2,3,4 }
              w={[300, 325, 400]}
              h={[50]}
              borderWidth="1px" 
              borderRadius="lg"
              overflow="hidden"
              p={2}
              border="1px" 
              >
              <Text align='center' orientation='horizontal'>RB2</Text>
              </Box>
              </Flex>
              }
              {(currentTeam.RB3 !== undefined) ? 
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.RB3}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='RB3'/>
                      </Flex>
                    </Trail>
              :
              <Flex align='center' justify='center'>
              <Box 
              m= {2,3,4 }
              w={[300, 325, 400]}
              h={[50]}
              borderWidth="1px" 
              borderRadius="lg"
              overflow="hidden"
              p={2}
              border="4px" 
              border="1px" 
              >
              <Text align='center' orientation='horizontal'>RB3</Text>
              </Box>
              </Flex>
              }
              <Divider orientation="horizontal" p={1}/>

              {(currentTeam.WR1 !== undefined) ? 
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.WR1}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='WR1'/>
                      </Flex>
                    </Trail>
              :
              <Flex align='center' justify='center'>
              <Box 
              m= {2,3,4 }
              w={[300, 325, 400]}
              h={[50]}
              borderWidth="1px" 
              borderRadius="lg"
              overflow="hidden"
              p={2}
              border="1px" 
              >
              <Text align='center' orientation='horizontal'>WR1</Text>
              </Box>
              </Flex>
              }
              {(currentTeam.WR2 !== undefined) ? 
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.WR2}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='WR2'/>
                      </Flex>
                    </Trail>
              :
              <Flex align='center' justify='center'>
              <Box 
              m= {2,3,4 }
              w={[300, 325, 400]}
              h={[50]}
              borderWidth="1px" 
              borderRadius="lg"
              overflow="hidden"
              p={2}
              border="1px" 
              >
              <Text align='center' orientation='horizontal'>WR2</Text>
              </Box>
              </Flex>
              }
              {(currentTeam.WR3 !== undefined) ? 
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.WR3}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='WR3'/>
                      </Flex>
                    </Trail>
              :
              <Flex align='center' justify='center'>
              <Box 
              m= {2,3,4 }
              w={[300, 325, 400]}
              h={[50]}
              borderWidth="1px" 
              borderRadius="lg"
              overflow="hidden"
              p={2}
              border="1px" 
              >
              <Text align='center' orientation='horizontal'>WR3</Text>
              </Box>
              </Flex>
              } 
              <Divider orientation="horizontal" p={1}/>
              {(currentTeam.FLEX1 !== undefined) ? 
                    <Flex align='center' justify='center'>
                      <PlayerCard align='center' justify='center'
                      props = {currentTeam.FLEX1}
                      handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='FLEX1'/>
                    </Flex>
              :
              <Flex align='center' justify='center'>
              <Box 
              m= {2,3,4 }
              w={[300, 325, 400]}
              h={[50]}
              borderWidth="1px" 
              borderRadius="lg"
              overflow="hidden"
              p={2}
              border="1px" 
              >
              <Text align='center' orientation='horizontal'>FLEX1</Text>
              </Box>
              </Flex>
              }
              {(currentTeam.FLEX2 !== undefined) ? 
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.FLEX2}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='FLEX2'/>
                      </Flex>
                    </Trail>
              :
              <Flex align='center' justify='center'>
              <Box 
              m= {2,3,4 }
              w={[300, 325, 400]}
              h={[50]}
              borderWidth="1px" 
              borderRadius="lg"
              overflow="hidden"
              p={2}
              border="1px" 
              >
              <Text align='center' orientation='horizontal'>FLEX2</Text>
              </Box>
              </Flex>
              }
              {(currentTeam.FLEX3 !== undefined) ?
                  <Trail open={open}>
                    <Flex align='center' justify='center'>
                      <PlayerCard align='center' justify='center'
                      props = {currentTeam.FLEX3}
                      handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='FLEX3'/>
                    </Flex>
                  </Trail> 
              :
              <Flex align='center' justify='center'>
              <Box 
              m= {2,3,4 }
              w={[300, 325, 400]}
              h={[50]}
              borderWidth="1px" 
              borderRadius="lg"
              overflow="hidden"
              p={2}
              border="1px" 
              >
              <Text align='center' orientation='horizontal'>FLEX3</Text>
              </Box>
              </Flex>
              }
              <Divider orientation="horizontal" p={1}/>

              {(currentTeam.TE1 !== undefined) ? 
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.TE1}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='TE1'/>
                      </Flex>
                    </Trail>
              :
              <Flex align='center' justify='center'>
              <Box 
              m= {2,3,4 }
              w={[300, 325, 400]}
              h={[50]}
              borderWidth="1px" 
              borderRadius="lg"
              overflow="hidden"
              p={2}
              border="4px" 
              border="1px" 
              >
              <Text align='center' orientation='horizontal'>TE1</Text>
              </Box>
              </Flex>
              }
              {(currentTeam.TE2 !== undefined) ? 
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.TE2}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='TE2'/>
                      </Flex>
                    </Trail>
              :
              <Flex align='center' justify='center'>
              <Box 
              m= {2,3,4 }
              w={[300, 325, 400]}
              h={[50]}
              borderWidth="1px" 
              borderRadius="lg"
              overflow="hidden"
              p={2}
              border="1px" 
              >
              <Text align='center' orientation='horizontal'>TE2</Text>
              </Box>
              </Flex>
              }
              <Divider orientation="horizontal" p={1}/>
              {(currentTeam.K1 !== undefined) ? 
                    <Trail open={open}>
                      <Flex align='center' justify='center'>
                        <PlayerCard align='center' justify='center'
                        props = {currentTeam.K1}
                        handleTeam = {handleTeamRemoval} status = 'current team' handleStar = {handleStar} removeStar={removeStar} keyName='K1'/>
                      </Flex>
                    </Trail>
              :
              <Flex align='center' justify='center'>
              <Box 
              m= {2,3,4 }
              w={[300, 325, 400]}
              h={[50]}
              borderWidth="1px" 
              borderRadius="lg"
              overflow="hidden"
              p={2}
              border="1px" 
              >
              <Text align='center' orientation='horizontal'>K</Text>
              </Box>
              </Flex>
              }
            </Box>
        </Container>
        </GridItem>
      </Grid>
    }
      </>
    );
  }
}

NewTeam.getInitialProps = async (ctx) => {
  let playerList = {};
  let nflPlayers;
  let players = fire.database().ref('/NFL_Players');
  await players.once('value', (snapshot) => {
    nflPlayers = snapshot.val();
    playerList = nflPlayers
  })
  return { currentPlayers : playerList }

};

export default NewTeam;