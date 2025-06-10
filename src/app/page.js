"use client";

import styled from "styled-components";
import "@/app/globals.css";

import FlexBox from "@/common/UI/FlexBox";
import CryptoExchangeForm from "@/components/CryptoExchangeForm";

const MainWrapper = styled(FlexBox)`
  width: 100%;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
`;

export default function Home() {
  return (
    <MainWrapper>
      <CryptoExchangeForm />
    </MainWrapper>
  );
}
