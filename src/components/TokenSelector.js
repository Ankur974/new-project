import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";

import FlexBox from "@/common/UI/FlexBox";
import { H2 } from "@/common/UI/Headings";
import tokenData from "../data/tokensData";
import { colors } from "@/lib/colors";

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled(FlexBox)`
  flex-direction: column;
  background-color: ${colors.background.dark};
  border-radius: 16px;
  padding: 1rem;
  color: white;
  width: 100%;
  height: 80vh;
  position: absolute;
  inset: 0;
  z-index: 10;
  animation: ${slideIn} 0.3s ease-out;
`;

const Header = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
  color: ${colors.text.light};
  position: relative;
  animation: ${fadeIn} 0.3s ease-out;
`;

const TokenCard = styled(FlexBox)`
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-start;
  animation: ${fadeIn} 0.3s ease-out;
`;

const Card = styled(FlexBox)`
  background-color: ${colors.overlay.dark};
  width: 60px;
  height: 50px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background-color: ${colors.primary.light};
  }
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  object-fit: contain;
  transition: transform 0.2s ease;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const MoreIndicator = styled(FlexBox)`
  background-color: ${colors.overlay.dark};
  width: 60px;
  height: 50px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  color: ${colors.text.light};
  font-size: 0.8rem;
  font-weight: bold;
  transition: transform 0.2s ease, background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    background-color: ${colors.primary.light};
  }
`;

const SearchContainer = styled(FlexBox)`
  align-items: center;
  background-color: ${colors.overlay.dark};
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 1.2rem;
  transition: background-color 0.2s ease;
  animation: ${fadeIn} 0.3s ease-out;

  &:focus-within {
    background-color: ${colors.primary.light};
  }
`;

const SearchInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: ${colors.text.light};
  font-size: 1rem;
  outline: none;
  font-weight: 400;

  &::placeholder {
    color: ${colors.text.light}80;
  }
`;

const SearchIcon = styled(IoSearchOutline)`
  margin-left: 8px;
  color: ${colors.text.light};
`;

const TokenList = styled.div`
  margin-top: 1rem;
  flex: 1;
  overflow-y: auto;
  max-height: 500px;
  animation: ${fadeIn} 0.3s ease-out;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.overlay.dark};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.primary.main};
    border-radius: 3px;
  }
`;

const TokenItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${colors.overlay.dark};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.primary.light};
  }
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
  color: ${colors.text.light};
`;

const TokenName = styled.div`
  font-size: 0.9rem;
  color: ${colors.text.light}80;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NetworkTag = styled.div`
  font-size: 0.7rem;
  color: ${colors.primary.main};
  background-color: ${colors.primary.light};
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
                    // Handle chain selection - maybe filter tokens based on selected chain
                    console.log("Selected chain:", chain);
                    setIsSelectingChain(false); // Go back to token selection after selecting chain
                    setSearchTerm(""); // Clear search term
                    // You might want to add logic here to filter the allTokens list based on the selected chain
                  }}
                >
                  <TokenIcon>
                    <Image src={chain.tokens[0]?.tokenIcon} alt={chain.chain} />
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
                <Image src={chain.tokens[0]?.tokenIcon} alt={chain.chain} />
              </Card>
            ))}
            <MoreIndicator onClick={() => setIsSelectingChain(true)}>
              +{tokenData.length - 7}
            </MoreIndicator>
          </TokenCard>

          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search by token name or address"
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
                  <Image src={token.tokenIcon} alt={token.tokenSymbol} />
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
