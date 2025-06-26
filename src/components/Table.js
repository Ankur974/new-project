import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaGasPump } from "react-icons/fa";
import FlexBox from "@/common/UI/FlexBox";

const Wrapper = styled(FlexBox)`
  width: 100%;
  column-gap: 1rem;
`;

const TableWrapper = styled.div`
  width: 100%;
  background: #1e1e1e;
  padding: 1rem;
  font-family: sans-serif;
  color: white;
  overflow-x: auto;
  border-radius: 16px;
  padding: 24px;
  color: white;
  height: 38rem;
  font-family: Roboto, Quicksand, "Source Sans Pro", -apple-system,
    BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
`;

const Thead = styled.thead`
  opacity: 0.6;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  font-weight: bold;
`;

const SortableTh = styled(Th)`
  cursor: pointer;
  user-select: none;
  /* 
  &:hover {
    color: #ffff00;
  } */
`;

const Tr = styled.tr`
  background: ${({ highlighted }) => (highlighted ? "#2c2c2c" : "#151515")};
  border: ${({ highlighted }) => (highlighted ? "2px solid #fffc53" : "none")};
  border-radius: 1rem;
  /* box-shadow: ${({ highlighted }) =>
    highlighted ? "0 0 6px #faff53" : "none"}; */
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${({ highlighted }) => (highlighted ? "#383838" : "#222")};
    transform: scale(1.01);
    /* box-shadow: 0 0 6px #ecf335; */
  }
`;

const Td = styled.td`
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
`;

const FirstTd = styled(Td)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Logo = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: self-start;
`;

const Label = styled.span`
  font-weight: 600;
`;

const Sub = styled.span`
  font-size: 0.8rem;
  color: #bbb;
`;

const WalletTag = styled.span`
  margin-top: 0.3rem;
  padding: 2px 6px;
  background: #ffff00;
  color: black;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 4px;
  display: inline-block;
`;

const PriceTag = styled.div`
  background: #333;
  padding: 4px 8px;
  font-size: 0.75rem;
  border-radius: 4px;
  display: inline-block;
`;

const GasIcon = styled(FaGasPump)`
  margin-right: 4px;
  vertical-align: middle;
`;

const exchanges = [
  {
    logoColor: "#fff",
    label: "ROCKETX PARTNER",
    time: "CEX | ~ 4 MINS",
    quote: "12,530.11 POL",
    type: "MARKET PRICE",
    gasFee: "~$0.11",
    save: "$59.72",
    isHighlighted: true,
    isWalletLess: false,
  },
  {
    logoColor: "#cfe8d4",
    label: "ROCKETX PARTNER",
    time: "CEX | ~ 3 MINS",
    quote: "12,522.85 POL",
    type: "MARKET PRICE",
    gasFee: "~$0.11",
    save: "$58.13",
    isHighlighted: false,
    isWalletLess: false,
  },
  {
    logoColor: "#1abc9c",
    label: "ROCKETX PARTNER",
    time: "CEX | ~ 2 MINS",
    quote: "12,521.2 POL",
    type: "MARKET PRICE",
    gasFee: "~$0.11",
    save: "$57.71",
    isHighlighted: false,
    isWalletLess: true,
  },
  {
    logoColor: "#f39c12",
    label: "ROCKETX VERIFIED",
    time: "DEX | ~ 5 MINS",
    quote: "12,510.45 POL",
    type: "FIXED PRICE",
    gasFee: "~$0.15",
    save: "$56.30",
    isHighlighted: false,
    isWalletLess: false,
  },
  {
    logoColor: "#8e44ad",
    label: "ROCKETX PARTNER",
    time: "CEX | ~ 6 MINS",
    quote: "12,500.10 POL",
    type: "MARKET PRICE",
    gasFee: "~$0.12",
    save: "$55.00",
    isHighlighted: false,
    isWalletLess: true,
  },
  {
    logoColor: "#3498db",
    label: "ROCKETX PREMIUM",
    time: "DEX | ~ 2 MINS",
    quote: "12,528.00 POL",
    type: "FIXED PRICE",
    gasFee: "~$0.10",
    save: "$58.90",
    isHighlighted: true,
    isWalletLess: false,
  },
  {
    logoColor: "#e74c3c",
    label: "ROCKETX VERIFIED",
    time: "CEX | ~ 7 MINS",
    quote: "12,498.45 POL",
    type: "MARKET PRICE",
    gasFee: "~$0.16",
    save: "$54.30",
    isHighlighted: false,
    isWalletLess: false,
  },
  {
    logoColor: "#2ecc71",
    label: "ROCKETX SELECT",
    time: "DEX | ~ 3 MINS",
    quote: "12,519.60 POL",
    type: "MARKET PRICE",
    gasFee: "~$0.09",
    save: "$57.00",
    isHighlighted: false,
    isWalletLess: true,
  },
];

const ExchangeTable = ({ onRowClick }) => {
  const [sortedData, setSortedData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "save",
    direction: "desc",
  });

  useEffect(() => {
    handleSort(sortConfig.key);
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...exchanges].sort((a, b) => {
      const aVal = extractValue(a[key]);
      const bVal = extractValue(b[key]);

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortedData(sorted);
    setSortConfig({ key, direction });
  };

  const extractValue = (value) => {
    if (typeof value === "string") {
      const number = parseFloat(value.replace(/[^\d.-]/g, ""));
      return isNaN(number) ? value.toLowerCase() : number;
    }
    return value;
  };

  return (
    <Wrapper align="center" justify="space-between">
      <TableWrapper>
        <StyledTable>
          <Thead>
            <tr>
              <SortableTh onClick={() => handleSort("label")}>
                EXCHANGE
              </SortableTh>
              <SortableTh onClick={() => handleSort("quote")}>QUOTE</SortableTh>
              <SortableTh onClick={() => handleSort("type")}>
                MIN. RECEIVED
              </SortableTh>
              <SortableTh onClick={() => handleSort("gasFee")}>
                GAS FEE
              </SortableTh>
              <SortableTh onClick={() => handleSort("save")}>
                YOU SAVE
              </SortableTh>
            </tr>
          </Thead>

          {/* // show skeleton loader here */}
          <tbody>
            {sortedData.map((ex, index) => (
              <Tr
                key={index}
                highlighted={ex.isHighlighted}
                onClick={() => onRowClick && onRowClick(ex)}
              >
                <FirstTd>
                  <Logo style={{ backgroundColor: ex.logoColor }} />
                  <Details>
                    <FlexBox align="center" columnGap="1rem">
                      <Label>{ex.label}</Label>
                      {ex.isWalletLess && <WalletTag>WALLETLESS</WalletTag>}
                    </FlexBox>
                    <Sub>{ex.time}</Sub>
                  </Details>
                </FirstTd>
                <Td>{ex.quote}</Td>
                <Td>
                  <PriceTag>{ex.type}</PriceTag>
                </Td>
                <Td>
                  <GasIcon />
                  {ex.gasFee}
                </Td>
                <Td>{ex.save}</Td>
              </Tr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </Wrapper>
  );
};

export default ExchangeTable;
