import React, { useState } from 'react';

import { extendTheme } from '@chakra-ui/core';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark'
  }
});

export default customTheme;