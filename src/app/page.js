"use client";

import FlexBox from "@/common/UI/FlexBox";
import { Body1, Display } from "@/common/UI/Headings";
import CryptoExchangeForm from "@/components/CryptoExchangeForm";
import styled from "styled-components";

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
`;

const Wrapper = styled(FlexBox)`
width: 100%;
height: 100%;

`;

export default function Home() {
  return (
    <Wrapper>
      <CryptoExchangeForm />
    </Wrapper>
  );
}
