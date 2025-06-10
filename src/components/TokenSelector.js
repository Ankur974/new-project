import React, { useState } from "react";
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";

import FlexBox from "@/common/UI/FlexBox";
import { H2 } from "@/common/UI/Headings";
import tokenData from "../data/tokensData";

const Container = styled(FlexBox)`
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

const Header = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
  color: #a0789c;
  position: relative;
`;

const TokenCard = styled(FlexBox)`
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
`;

const Card = styled(FlexBox)`
  background-color: #24203d;
  width: 60px;
  height: 50px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  object-fit: contain;
`;

const MoreIndicator = styled(FlexBox)`
  background-color: #24203d;
  width: 60px;
  height: 50px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
`;

const SearchContainer = styled(FlexBox)`
  align-items: center;
  background-color: #27212b;
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 1.2rem;
`;

const SearchInput = styled.input`
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

const TokenList = styled.div`
  margin-top: 1rem;
  flex: 1;
  overflow-y: auto;
  max-height: 500px;
`;

const TokenItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #2f2936;
  cursor: pointer;
`;

const TokenIcon = styled.div`
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

const TokenDetails = styled.div`
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

const NetworkTag = styled.div`
  font-size: 0.7rem;
  color: #e96461;
  background-color: rgba(233, 100, 97, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
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
    <Container>
      {isSelectingChain ? (
        // Chain Selection UI
        <>
          <Header padding="0.5rem 0">
            <FaArrowLeft
              size={20}
              color="#ffffff"
              onClick={() => setIsSelectingChain(false)}
            />
            <H2
              color="#ffffff"
              bold
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              Select chain
            </H2>
          </Header>

          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search by chain name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon size={20} />
          </SearchContainer>

          {/* Chain list */}
          <TokenList>
            {tokenData
              .filter((chain) =>
                chain.chain.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((chain, index) => (
                <TokenItem
                  key={index}
                  onClick={() => {
                    console.log("Selected chain:", chain);
                    setIsSelectingChain(false); 
                    setSearchTerm("");
                  }}
                >
                  <TokenIcon>
                    {/* <Image src={chain.tokens[0]?.tokenIcon} alt={chain.chain} /> */}
                    <Image src="BTC.png"/>
                  </TokenIcon>
                  <TokenDetails>
                    <TokenSymbol>{chain.chain}</TokenSymbol>
                  </TokenDetails>
                </TokenItem>
              ))}
          </TokenList>
        </>
      ) : (
        // Token Selection UI (Existing)
        <>
          <Header padding="0.5rem 0">
            <FaArrowLeft size={20} color="#ffffff" onClick={onClose} />
            <H2
              color="#ffffff"
              bold
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              Exchange From
            </H2>
          </Header>

          <TokenCard>
            {tokenData.slice(0, 7).map((chain, index) => (
              <Card key={index}>
                {/* <Image src={chain.tokens[0]?.tokenIcon} alt={chain.chain} /> */}
                <Image src="BTC.png"/>

              </Card>
            ))}
            <MoreIndicator onClick={() => setIsSelectingChain(true)}>
              +{tokenData.length - 7}
            </MoreIndicator>
          </TokenCard>

          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search by token name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon size={20} />
          </SearchContainer>

          {/* Token list */}
          <TokenList>
            {filteredTokens.map((token, index) => (
              <TokenItem key={index} onClick={() => onSelectToken(token)}>
                <TokenIcon>
                  {/* <Image src={token.tokenIcon} alt={token.tokenSymbol} /> */}
                                      <Image src="BTC.png"/>

                </TokenIcon>
                <TokenDetails>
                  <TokenSymbol>{token.tokenSymbol}</TokenSymbol>
                  <TokenName>{token.tokenName}</TokenName>
                </TokenDetails>
              </TokenItem>
            ))}
          </TokenList>
        </>
      )}
    </Container>
  );
};

export default TokenSelector;
