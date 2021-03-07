import React from "react";
import Link from 'next/link'
import { Box, Flex, Text, Button, Container } from "@chakra-ui/react";
import Logo from "./../ui/Logo";
import fire from '../../config/fire-config.js';
import HeaderSignedIn from './signedInNavBar'
import HeaderSignedOut from './signedOutNavBar'
import { useAuth } from './../../hooks/useAuth';



const Header = (props) => {
  let auth = useAuth();
  if (auth.user === null) {
    return (<HeaderSignedOut />)
  }
  else {
    return (<HeaderSignedIn />)
  }
}

export default Header;