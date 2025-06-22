"use client";

import styled from "styled-components";
import "@/app/globals.css";
import { useState } from "react";

import FlexBox from "@/common/UI/FlexBox";
import CryptoExchangeForm from "@/components/CryptoExchangeForm";
import ExchangeTable from "@/components/Table";
import Card from "@/components/Card";

const MainWrapper = styled(FlexBox)`
  width: 100%;
  padding: 2rem;
  row-gap: 1rem;
`;

const SectionWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const LeftSection = styled.div`
  flex: 1;
`;

const RightSection = styled.div`
  flex: 2;
`;

export default function Home() {
  const [view, setView] = useState("table"); // 'table' or 'card'
  const [selectedExchange, setSelectedExchange] = useState(null);

  const handleTableRowClick = (exchange) => {
    setSelectedExchange(exchange);
    setView("card");
  };

  const handleShowTable = () => {
    setView("table");
    setSelectedExchange(null);
  };

  return (
    <>
    <MainWrapper>
      <SectionWrapper>
        <LeftSection>
          <CryptoExchangeForm />
        </LeftSection>
        <RightSection>
          {view === "table" && (
            <>
              <button onClick={() => setView("card")}>Show Card View</button>
              <ExchangeTable onRowClick={handleTableRowClick} />
            </>
          )}
          {view === "card" && (
            <>
              <button onClick={handleShowTable}>Show Table View</button>
              <Card {...(selectedExchange || {})} />
            </>
          )}
        </RightSection>
      </SectionWrapper>
    </MainWrapper>
    </>
  );
}
