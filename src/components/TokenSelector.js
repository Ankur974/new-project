import React, { useState } from "react";
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";

import FlexBox from "@/common/UI/FlexBox";
import { H2 } from "@/common/UI/Headings";
import tokenData from "../data/tokensData";

const SelectorContainer = styled(FlexBox)`
  flex-direction: column;
  background-color: #362a3b;
  border-radius: 16px;
  padding: 1rem;
  color: white;
  width: 100%;
  height: 80vh;
  position: absolute;
  inset: 0;
  z-index: 10;
`;

const SelectorHeader = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
  color: #a0789c;
  position: relative;
  padding: 0.5rem 0;
`;

const HeaderTitle = styled(H2)`
  color: #ffffff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const TokenGrid = styled(FlexBox)`
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
`;

const TokenGridItem = styled(FlexBox)`
  background-color: #24203d;
  width: 60px;
  height: 50px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TokenImage = styled.img`
  width: 35px;
  height: 35px;
  object-fit: contain;
`;

const MoreButton = styled(FlexBox)`
  background-color: #24203d;
  width: 60px;
  height: 50px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
`;

const SearchWrapper = styled(FlexBox)`
  align-items: center;
  background-color: #27212b;
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 1.2rem;
`;

const SearchField = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: #92909e;
  font-size: 1rem;
  outline: none;
  font-weight: 400;
`;

const SearchIcon = styled(IoSearchOutline)`
  margin-left: 8px;
  color: #fff;
`;

const TokenListContainer = styled.div`
  margin-top: 1rem;
  flex: 1;
  overflow-y: auto;
  max-height: 500px;
`;

const TokenListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #2f2936;
  cursor: pointer;
`;

const TokenIconWrapper = styled.div`
  width: 35px;
  height: 35px;
  background-color: transparent;
  border-radius: 50%;
  margin-right: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TokenInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const TokenSymbol = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: #ffffff;
`;

const TokenName = styled.div`
  font-size: 0.9rem;
  color: #b0a0c0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NetworkBadge = styled.div`
  font-size: 0.7rem;
  color: #e96461;
  background-color: rgba(233, 100, 97, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
`;

const BackButton = styled(FaArrowLeft)`
  cursor: pointer;
`;

const TokenSelector = ({ onClose, onSelectToken }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSelectingChain, setIsSelectingChain] = useState(false);

  // Flatten token data
  const allTokens = tokenData.flatMap((chain) =>
    chain.tokens.map((token) => ({
      ...token,
      chain: chain.chain,
      chainId: chain.chainId,
    }))
  );

  // Filter tokens
  const filteredTokens = allTokens.filter(
    (token) =>
      token.tokenSymbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.tokenName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SelectorContainer>
      {isSelectingChain ? (
        // Chain Selection UI
        <>
          <SelectorHeader>
            <BackButton
              size={20}
              color="#ffffff"
              onClick={() => setIsSelectingChain(false)}
            />
            <HeaderTitle bold>Select chain</HeaderTitle>
          </SelectorHeader>

          <SearchWrapper>
            <SearchField
              type="text"
              placeholder="Search by chain name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon size={20} />
          </SearchWrapper>

          <TokenListContainer>
            {tokenData
              .filter((chain) =>
                chain.chain.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((chain, index) => (
                <TokenListItem
                  key={index}
                  onClick={() => {
                    console.log("Selected chain:", chain);
                    setIsSelectingChain(false);
                    setSearchTerm("");
                  }}
                >
                  <TokenIconWrapper>
                    <TokenImage src="BTC.png" alt={chain.chain} />
                  </TokenIconWrapper>
                  <TokenInfo>
                    <TokenSymbol>{chain.chain}</TokenSymbol>
                  </TokenInfo>
                </TokenListItem>
              ))}
          </TokenListContainer>
        </>
      ) : (
        // Token Selection UI
        <>
          <SelectorHeader>
            <BackButton size={20} color="#ffffff" onClick={onClose} />
            <HeaderTitle bold>Exchange From</HeaderTitle>
          </SelectorHeader>

          <TokenGrid>
            {tokenData.slice(0, 7).map((chain, index) => (
              <TokenGridItem key={index}>
                <TokenImage src="BTC.png" alt={chain.chain} />
              </TokenGridItem>
            ))}
            <MoreButton onClick={() => setIsSelectingChain(true)}>
              More
            </MoreButton>
          </TokenGrid>

          <SearchWrapper>
            <SearchField
              type="text"
              placeholder="Search by token name or symbol"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon size={20} />
          </SearchWrapper>

          <TokenListContainer>
            {filteredTokens.map((token, index) => (
              <TokenListItem
                key={index}
                onClick={() => {
                  onSelectToken(token);
                  onClose();
                }}
              >
                <TokenIconWrapper>
                  <TokenImage src={token.tokenIcon} alt={token.tokenSymbol} />
                </TokenIconWrapper>
                <TokenInfo>
                  <TokenSymbol>{token.tokenSymbol}</TokenSymbol>
                  <TokenName>
                    {token.tokenName}
                    <NetworkBadge>{token.chain}</NetworkBadge>
                  </TokenName>
                </TokenInfo>
              </TokenListItem>
            ))}
          </TokenListContainer>
        </>
      )}
    </SelectorContainer>
  );
};

export default TokenSelector;
