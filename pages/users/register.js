import React, { useState } from 'react';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router';
import { InputRightElement, InputGroup, Select, Flex, Stack, Text, Container, Heading, FormControl, FormLabel, Input, Box, Button} from '@chakra-ui/react'
import Link from 'next/link'
import Navbar from '../../components/navbar.js'

var database = fire.database();

const Signup = () => {

  const router = useRouter();

  const [currentUser, setCurrentUserField] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmedPassword: '',
    homeState: '',
    birthYear: '',
    birthMonth: '',
    birthDate: ''
  });
  const [errors, setErrors] = useState({
    usernameError: '',
    emailError: '',
    passwordError: '',
    confirmedPasswordError: '',
    passwordMatchError:'',
    homeStateError: '',
    birthDateError: '',
  });

  //validation function to set error messages
  let validate = () => {
    let errorsValidate = {};
    if (currentUser.userName.trim() === '') errorsValidate.usernameError = "User name is required.";
    if (currentUser.userName !== '') errors.usernameError = "" ;

    if (currentUser.password.trim() === '') errorsValidate.passwordError = "Password is required.";
    if (currentUser.password.trim() !== '') errors.passwordError = "";

    if (currentUser.confirmedPassword.trim() === '') errorsValidate.confirmedPasswordError = "Please confirm your password.";
    if (currentUser.confirmedPassword.trim() !== '') errors.confirmedPasswordError = "";
    
    if (currentUser.password !== currentUser.confirmedPassword) errorsValidate.passwordMatchError = "Passwords do not match, please try again.";
    if (currentUser.password === currentUser.confirmedPassword)  errors.passwordMatchError = "";

    if (currentUser.email.trim() === '') errorsValidate.emailError = "Please add your email address";
    if (currentUser.email.trim() !== '') errors.emailError = "";

    if (currentUser.homeState.trim() === '') errorsValidate.homeStateError = "Please select your homestate.";
    if (currentUser.homeState.trim() !== '') errors.homeStateError = "";
    
    if (currentUser.birthYear.trim() === '' || currentUser.birthMonth.trim() === '' || currentUser.birthDate.trim() === '') errorsValidate.birthDateError = "Please insert your birthday" ;
    if (currentUser.birthYear.trim() !== '' || currentUser.birthMonth.trim() !== '' || currentUser.birthDate.trim() !== '') errors.birthDateError = "" ;

    console.log(Object.keys(errorsValidate).length)
    return Object.keys(errorsValidate).length === 0 ? null : errors;
  }
  

  const [showPW, setShowPW] = React.useState(false)
  const handleShowPW = () => setShowPW(!showPW)
  
  const [showCPW, setshowCPW] = React.useState(false)
  const handleShowConfirmedPW = () => setshowCPW(!showCPW)

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCurrentUserField({ ...currentUser, [name]: value });
  };  

  const writeUserData = (userId) => {
    fire.database().ref('users/' + userId).set({
      name: currentUser.firstName + ' ' + currentUser.lastName,
      username: currentUser.userName,
      email: currentUser.email,
      homestate: currentUser.homeState,
      birthyear: currentUser.birthYear
    });
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const validated = validate()
    console.log('validate ', validate())
    if (validated === null){
      console.log('passed verification')
      
      fire.auth()
        .createUserWithEmailAndPassword(currentUser.email, currentUser.password)
        .catch((err) => {
          console.log(err.code, err.message)
        });
      var user = fire.auth().currentUser;
      var uid;
      if (user != null) {
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
      }
      console.log('writting data')
      writeUserData(uid)
      router.push("/")
    }
    }
  


  return (
    <>
    <Flex pt={[15, 25, 40]} align="center" justify="center">
      <Heading>
        Sign Up
      </Heading>
    </Flex>
    <Container >
      <Flex justifyContent="space-evenly" padding={3}>
        <Text fontSize="16px">Have an account?  </Text>
          <Link href="/users/login" activeClassName="active">
              Sign In
          </Link>
        </Flex>
   </Container>
  <Container  justifyContent="column">
  <Box  h={[500, 650, 500]}  borderWidth="1px" borderRadius="lg" overflow="auto">
    <Flex justifyContent="space-evenly" >
    <FormControl p={4} id="firstName" >
      <FormLabel m={2}>First Name</FormLabel>
      <Input 
      placeholder="First Name" 
      name="firstName"
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl p={4} id="lastName" >
      <FormLabel m={2}>Last Name</FormLabel>
      <Input 
      placeholder="Last Name" 
      name="lastName"
      onChange={handleInputChange}
      />
    </FormControl>
    </Flex>

    <FormControl p={4} id="email" >
      <FormLabel m={2}>Email Address</FormLabel>
      <Input 
      placeholder="Email@" 
      name="email"
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl p={4} id="userName" isRequired>
      <FormLabel m={2}>Username</FormLabel>
      <Input 
      placeholder="User Name" 
      name="userName"
      onChange={handleInputChange}
      />
      {errors.usernameError !== '' && (
        <Text id="noUsername" fontSize="lg" color="#9C4221">
          {errors.usernameError}
        </Text>
      )}
    </FormControl>
    <FormControl p={4} id="password" isRequired>
      <FormLabel m={2}>Password</FormLabel >
      <InputGroup size="md">
        <Input 
        placeholder="Password" 
        name="password"
        onChange={handleInputChange}
        pr="4.5rem"
        type={showPW ? "text" : "password"}
        placeholder="Enter password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleShowPW}>
            {showPW ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {errors.passwordError !== '' && (
        <Text id="noPassword" fontSize="lg" color="#9C4221">
          {errors.passwordError}
        </Text>
      )}
      {errors.passwordMatchError !== '' && (
        <Text id="passwordMatch" fontSize="lg" color="#9C4221">
          {errors.passwordMatchError}
        </Text>
      )}
    </FormControl>
    <FormControl p={4} id="confirmedPassword" isRequired>
      <FormLabel m={2}>Confirm Password</FormLabel>
      <InputGroup size="md">
        <Input 
        placeholder="Confirm Password" 
        name="confirmedPassword"
        onChange={handleInputChange}
        pr="4.5rem"
        type={showCPW ? "text" : "password"}
        placeholder="Enter password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleShowConfirmedPW}>
            {showCPW ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {errors.confirmedPasswordError !== '' && (
        <Text id="confirmedPasswordError" fontSize="lg" color="#9C4221">
          {errors.confirmedPasswordError}
        </Text>
      )}
      {errors.passwordMatchError !== '' && (
        <Text id="passwordMatch" fontSize="lg" color="#9C4221">
          {errors.passwordMatchError}
        </Text>
      )}
    </FormControl>
    

    <FormControl p={4} id="state" >
      <FormLabel m={2}>State of Residence</FormLabel>
      <Select 
      placeholder="Select Your State"
      name="homeState"
      onChange={handleInputChange}
      >
        <option value ='alabama'> Alabama</option>
        <option value ='alaska'> Alaska</option>
        <option value ='arizona'> Arizona</option>
        <option value ='arkansas'> Arkansas</option>
        <option value ='california'> California</option>
        <option value ='colorado'> Colorado</option>
        <option value ='connecticut'> Connecticut</option>
        <option value ='delaware'> Delaware</option>
        <option value ='florida'> Florida</option>
        <option value ='georgia'> Georgia</option>
        <option value ='hawaii'> Hawaii</option>
        <option value ='idaho'> Idaho</option>
        <option value ='illinois'> Illinois</option>
        <option value ='indiana'> Indiana</option>
        <option value ='iowa'> Iowa</option>
        <option value ='kansas'> Kansas</option>
        <option value ='kentucky'> Kentucky</option>
        <option value ='louisiana'> Louisiana</option>
        <option value ='maine'> Maine</option>
        <option value ='maryland'> Maryland</option>
        <option value ='massachusetts'> Massachusetts</option>
        <option value ='michigan'> Michigan</option>
        <option value ='minnesota'> Minnesota</option>
        <option value ='mississippi'> Mississippi</option>
        <option value ='missouri'> Missouri</option>
        <option value ='montana'> Montana</option>
        <option value ='nebraska'> Nebraska</option>
        <option value ='nevada'> Nevada</option>
        <option value ='newHampshire'> New Hampshire</option>
        <option value ='newJersey'> New Jersey</option>
        <option value ='newMexico'> New Mexico</option>
        <option value ='newYork'> New York</option>
        <option value ='northCarolina'> North Carolina</option>
        <option value ='northDakota'> North Dakota</option>
        <option value ='ohio'> Ohio</option>
        <option value ='oklahoma'> Oklahoma</option>
        <option value ='oregon'> Oregon</option>
        <option value ='pennsylvania'> Pennsylvania</option>
        <option value ='rhodeIsland'> Rhode Island</option>
        <option value ='southCarolina'> South Carolina</option>
        <option value ='southDakota'> South Dakota</option>
        <option value ='tennessee'> Tennessee</option>
        <option value ='texas'> Texas</option>
        <option value ='utah'> Utah</option>
        <option value ='vermont'> Vermont</option>
        <option value ='virginia'> Virginia</option>
        <option value ='washington'> Washington</option>
        <option value ='westVirginia'> West Virginia</option>
        <option value ='wisconsin'> Wisconsin</option>
        <option value ='wyoming'> Wyoming</option>
      </Select>
      {errors.homeStateError !== '' && (
        <Text p={4} id="noHomeState" fontSize="lg" color="#9C4221">
          {errors.homeStateError}
        </Text>
      )}
      </FormControl>

    <Flex justifyContent="space-evenly" >
    <FormControl p={4} id="birthMonth" >
      <FormLabel m={2}>Birth Month</FormLabel>
      <Input 
      placeholder="Birth Month" 
      name="birthMonth"
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl p={4} id="birthDate" > 
      <FormLabel m={2}>Birth Date</FormLabel>
      <Input 
      placeholder="Birth Date" 
      name="birthDate"
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl p={4} id="birthYear" >
      <FormLabel m={2}>Birth Year</FormLabel>
      <Input 
      placeholder="Birth Year" 
      name="birthYear"
      onChange={handleInputChange}
      />
    </FormControl>
    {errors.birthDateError !== '' && (
        <Text p={4} id="bdError" fontSize="lg" color="#9C4221">
          {errors.birthDateError}
        </Text>
      )}
    </Flex>
    </Box>
    <Flex pt={2} align="center" justify="center">
    <Stack direction="row" spacing={4} >
      <Button background="#319795" variant="solid" onClick={handleRegister}>
        Sign Up
      </Button>
    </Stack>
    </Flex>

  
  </Container>
  </>
)}

export default Signup;