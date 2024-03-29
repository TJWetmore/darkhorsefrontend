import React from "react";
import Link from 'next/link'
import { Box, Flex, Text, Button, Container } from "@chakra-ui/react";
import Logo from "./../ui/Logo";
import fire from '../../config/fire-config.js';
import { useRouter } from 'next/router';
import { useAuth } from './../../hooks/useAuth';


const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link href={to}>{children}</Link>
    </Text>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="grey"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const HeaderSignedIn = (props) => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);
  const router = useRouter();
  const auth = useAuth();


  let handleSignOut = () => {
    auth.signOut()
    .then(() => {
      router.push('/users/login');
    })
  }

  return (
    <Flex
      as="nav"
      top="0"
      left="0"
      align="center"
      position="absolute"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      
      p={8}
      bg={"#9C4221"}
      color={"#f5ece8"}
      {...props}
    >
      <Flex align="center">
        <Logo
          w="300px"
        />
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <MenuIcon />}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
        >
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/how">How It Works </MenuItem>
          <MenuItem to='/userTeams'>My Teams</MenuItem>
          <MenuItem to='/createateam/newteam'>Create A Team</MenuItem>
            <MenuItem isLast>
            <Button
              size="sm"
              rounded="md"
              color={"#9C4221"}
              bg={"#f5ece8"}
              _hover={{
              bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
              }}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
            </MenuItem>
          
        </Flex>
      </Box>
    </Flex>
  );
};

export default HeaderSignedIn;