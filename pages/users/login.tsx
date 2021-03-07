import fire from '../../config/fire-config';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Link from 'next/link';
import {useAuth} from '../../hooks/useAuth';
import { db } from '../../config/fire-config';



import { InputRightElement, InputGroup, Heading, Flex, Stack, Text, Container, FormControl, FormLabel, Input, Box, Button} from '@chakra-ui/react'


const Login = () => {

  const [showPW, setShowPW] = React.useState(false)
  const handleShowPW = () => setShowPW(!showPW)
  const auth = useAuth();
  const router = useRouter();

  const [currentUser, setCurrentUserField] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCurrentUserField({ ...currentUser, [name]: value });
  };  

  const handleSubmit = event => {
    event.preventDefault();
    let {email, password} = currentUser;
    return auth
      .signIn(email, password)
      .then(() => {
      router.push('/dashboard');
    })
    .catch((err) => {
      console.log(err.code, err.message)
    })
  };


  return (
    <>
    <Flex  pt={15, 25, 40}  align="center" justify="center">
    <Heading  >
      Log In
    </Heading>
    </Flex>
    <Container pb={15, 25, 40} justifyContent="column" >
    <Box maxW="3lx" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <FormControl p={4} id="email" isRequired>
        <FormLabel m={2}>Email Address</FormLabel>
        <Input 
        placeholder="Email Address" 
        name="email"
        onChange={handleInputChange}
        />
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
    </FormControl>
      <Flex align="center" justify="center">
      <Stack direction="row" spacing={4} m={4} >
        <Button background="#319795" variant="solid" onClick={handleSubmit}>
          Log In
        </Button>
      </Stack>
      </Flex>
      <Container>
        <Flex justifyContent="space-evenly" padding={3}>
          <Text fontSize="16px">Don't have an account?  </Text>
              <Link href="/users/register" activeClassName="active">
                  Sign up
            </Link>
          </Flex>
    </Container>
    </Box>
    </Container>
    </>
)
}

export default Login;