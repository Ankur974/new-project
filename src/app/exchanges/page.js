"use client";

import styled from "styled-components";
import FlexBox from "@/common/UI/FlexBox";
import Exchanges from "@/components/Exchanges";

const ExchangesWrapper = styled(FlexBox)`
  width: 100%;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
`;

export default function ExchangesPage() {
  return (
    <ExchangesWrapper>
      <Exchanges />
    </ExchangesWrapper>
  );
}
