'use client';

import React, { useState } from 'react';
import { StyleSheetManager } from 'styled-components';

export function StyledComponentsRegistry({ children }) {
  const [styledComponentsStyleSheet] = useState(() => {
    const { ServerStyleSheet } = require('styled-components');
    return new ServerStyleSheet();
  });

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
