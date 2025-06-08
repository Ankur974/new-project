"use client";

import FlexBox from "@/common/UI/FlexBox";
import { Body1, Display } from "@/common/UI/Headings";
import CryptoExchangeForm from "@/components/CryptoExchangeForm";
import Exchanges from "@/components/Exchanges";
import styled from "styled-components";

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
`;

const Wrapper = styled(FlexBox)`
width: 100%;
height: 100%;
flex-direction: column;
row-gap:1rem;
align-items: center;

`;

export default function Home() {
  return (
    <Wrapper>
      <CryptoExchangeForm />
      {/* <Exchanges/> */}
    </Wrapper>
  );
}
