"use client";

import styled from "styled-components";
import "@/app/globals.css";
import { useState, useEffect } from "react";
import { keyframes } from "styled-components";
import { PanelBottom, Rows4 } from "lucide-react";

import FlexBox from "@/common/UI/FlexBox";
import CryptoExchangeForm from "@/components/CryptoExchangeForm";
import ExchangeTable from "@/components/Table";
import Card from "@/components/Card";

const MainWrapper = styled(FlexBox)`
  width: 100%;
  padding: 2rem;
  gap: 3rem;
  width: 86.7%;
  max-width: 90rem;
  margin: auto;
  height: 100vh;
`;

const LeftSection = styled(FlexBox)`
  padding-top: 3rem;
  min-width: 22rem;
`;

const RightSection = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SwapView = styled.div`
  animation: ${fadeIn} 0.5s cubic-bezier(0.4, 0.2, 0.2, 1);
`;

const CardSkeletonWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  background-color: #27212b;
  border-radius: 16px;
  padding: 1rem;
  flex-direction: column;
  color: #fff;
  min-height: 220px;
  margin-bottom: 1rem;
`;

const SkeletonLine = styled.div`
  height: ${({ height }) => height || "16px"};
  width: ${({ width }) => width || "100%"};
  background: linear-gradient(90deg, #333 25%, #444 37%, #333 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s linear infinite;
  border-radius: 8px;
  margin-bottom: 0.7rem;
  @keyframes shimmer {
    0% {
      background-position: -400px 0;
    }
    100% {
      background-position: 400px 0;
    }
  }
`;

const TableSkeletonWrapper = styled.div`
  width: 100%;
  background: #1e1e1e;
  padding: 24px;
  border-radius: 16px;
  min-height: 38rem;
`;

const TableRowSkeleton = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  border-radius: 6px;
  background: #151515;
  height: 56px;
  overflow: hidden;
`;

const TableCellSkeleton = styled.div`
  height: 18px;
  border-radius: 4px;
  background: linear-gradient(90deg, #222 25%, #333 37%, #222 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s linear infinite;
  margin: 0 12px;
  flex: 1;
  @keyframes shimmer {
    0% {
      background-position: -400px 0;
    }
    100% {
      background-position: 400px 0;
    }
  }
`;

const RightSectionHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
`;

const SmallTabs = styled.div`
  display: flex;
  border: 1px solid #673e60;
  border-radius: 0.4rem;
  padding: 2px;
  background: #23202b;
`;

const SmallTabButton = styled.button`
  flex: 1;
  padding: 4px 10px;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  transition: background-color 0.3s, color 0.3s;
  background-color: ${({ $active, theme }) =>
    $active ? theme.primary.main : "transparent"};
  color: ${({ $active, theme }) => ($active ? "white" : theme.text)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimatedCard = styled(Card)`
  animation: ${fadeIn} 0.5s cubic-bezier(0.4, 0.2, 0.2, 1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  border-bottom: 1px solid #333;
`;

const SortableTh = styled.th`
  text-align: left;
  padding: 12px;
  font-weight: 600;
  color: #888;
  font-size: 0.9rem;
`;

const TableSkeleton = () => (
  <TableSkeletonWrapper>
    <StyledTable>
      <Thead>
        <tr>
          <SortableTh>EXCHANGE</SortableTh>
          <SortableTh>QUOTE</SortableTh>
          <SortableTh>MIN. RECEIVED</SortableTh>
          <SortableTh>GAS FEE</SortableTh>
          <SortableTh>YOU SAVE</SortableTh>
        </tr>
      </Thead>
      <tbody>
        {[...Array(6)].map((_, i) => (
          <tr key={i}>
            <td>
              <TableRowSkeleton>
                <TableCellSkeleton style={{ flex: 2, maxWidth: 180 }} />
              </TableRowSkeleton>
            </td>
            <td>
              <TableRowSkeleton>
                <TableCellSkeleton />
              </TableRowSkeleton>
            </td>
            <td>
              <TableRowSkeleton>
                <TableCellSkeleton />
              </TableRowSkeleton>
            </td>
            <td>
              <TableRowSkeleton>
                <TableCellSkeleton />
              </TableRowSkeleton>
            </td>
            <td>
              <TableRowSkeleton>
                <TableCellSkeleton />
              </TableRowSkeleton>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  </TableSkeletonWrapper>
);

const CardSkeleton = () => (
  <CardSkeletonWrapper>
    <FlexBox align="center" justify="space-between" width="100%">
      <FlexBox align="center" columnGap="0.5rem">
        <SkeletonLine width="20px" height="20px" />
        <SkeletonLine width="80px" height="18px" />
      </FlexBox>
      <SkeletonLine width="90px" height="18px" />
    </FlexBox>
    <FlexBox align="center" columnGap="0.5rem" margin="1rem 0">
      <SkeletonLine width="40px" height="16px" />
      <SkeletonLine width="30px" height="16px" />
      <SkeletonLine width="100px" height="18px" />
    </FlexBox>
    <FlexBox
      align="center"
      columnGap="0.5rem"
      width="100%"
      justify="space-between"
    >
      <FlexBox column>
        <FlexBox align="center" columnGap="0.5rem">
          <SkeletonLine width="40px" height="16px" />
          <SkeletonLine width="60px" height="16px" />
        </FlexBox>
        {/* <Hr /> */}
        <FlexBox align="center" columnGap="0.5rem">
          <SkeletonLine width="60px" height="16px" />
          <SkeletonLine width="40px" height="16px" />
        </FlexBox>
      </FlexBox>
      <SkeletonLine width="80px" height="32px" />
    </FlexBox>
    <SkeletonLine
      width="100%"
      height="10px"
      style={{
        marginTop: "1.5rem",
        borderRadius: "0 0 16px 16px",
        background: "#fbff2d",
      }}
    />
  </CardSkeletonWrapper>
);

export default function Home() {
  const [view, setView] = useState("table");
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [view]);

  const handleTableRowClick = (exchange) => {
    setSelectedExchange(exchange);
    setView("card");
  };

  return (
    <MainWrapper>
      <LeftSection>
        <CryptoExchangeForm />
      </LeftSection>
      <RightSection>
        <RightSectionHeader>
          <SmallTabs>
            <SmallTabButton
              $active={view === "table"}
              onClick={() => {
                setView("table");
                setSelectedExchange(null);
              }}
            >
              <Rows4 />
            </SmallTabButton>
            <SmallTabButton
              $active={view === "card"}
              onClick={() => setView("card")}
            >
              <PanelBottom />
            </SmallTabButton>
          </SmallTabs>
        </RightSectionHeader>
        <SwapView>
          {loading ? (
            view === "table" ? (
              <TableSkeleton />
            ) : (
              <CardSkeleton />
            )
          ) : view === "table" ? (
            <ExchangeTable onRowClick={handleTableRowClick} />
          ) : (
            <AnimatedCard {...(selectedExchange || {})} />
          )}
        </SwapView>
      </RightSection>
    </MainWrapper>
  );
}
