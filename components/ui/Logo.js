import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Link from 'next/link'


export default function Logo(props) {
  return (
    <Box {...props}>
      <Link href='/'>
      <Text fontSize="lg" fontWeight="bold">
        Dark Horse Fantasy Sports
      </Text>
      </Link>
    </Box>
  );
}