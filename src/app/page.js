"use client";

import styled from "styled-components";
import "@/app/globals.css";

import FlexBox from "@/common/UI/FlexBox";
import CryptoExchangeForm from "@/components/CryptoExchangeForm";
import Exchanges from "@/components/Exchanges";

const Wrapper = styled(FlexBox)`
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(227, 87, 96, 0.5) 50%,
    rgba(227, 87, 96, 0.62) 100%
  );
`;

export default function Home() {
  return (
    <Wrapper>
      <CryptoExchangeForm />
      <Exchanges />
    </Wrapper>
  );
}
