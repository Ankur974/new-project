import React, { useState } from 'react';
import styled from 'styled-components';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import FlexBox from '@/common/UI/FlexBox';
import { H3, H5 } from '@/common/UI/Headings';
import { RxCross2 } from "react-icons/rx";

const Container = styled(FlexBox)`
  flex-direction: column;
  background-color: #36293b;
  border-radius: 16px;
  padding: 16px;
  gap: 1.5rem;
  color: white;
  font-family: Roboto, Quicksand, "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  width: fit-content; 
  row-gap: 0.25rem;
  position: absolute; 
  top: 0; 
  left: 0; 
  bottom: 0; 
  right: 0; 
  z-index: 10; 
`;

const Header = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
  color: #a0789c;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SearchContainer = styled(FlexBox)`
  align-items: center;
  background-color: #27212b;
  border-radius: 8px;
  padding: 1rem 0.75rem;
`;

const SearchInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  outline: none;
`;

const SearchIcon = styled(IoSearchOutline)`
  margin-left: 8px;
  color: #b0a0c0;
`;

const TabsContainer = styled(FlexBox)`
  width: 100%;
  gap: 0.5rem;
`;

const TabButton = styled.button`
background-color: #6B4D6B;
    border-radius: 4px;
    padding: 2px;
  flex: 1;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.75rem;
  transition: background-color 0.3s ease;
  background-color: ${({ $active }) => ($active ? '#e96461' : '#6B4D6B')};
  color: #fff;
`;

const TokenList = styled.div`
  flex: 1; /* Allow list to take remaining space */
  overflow-y: auto; 
`;

const TokenItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #2f2936; /* Separator */
  cursor: pointer;
`;

const TokenIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
  margin-right: 12px;
`;

const TokenDetails = styled.div`
  flex: 1;
  overflow: hidden;
`;

const TokenSymbol = styled.div`
  font-weight: bold;
  font-size: 1rem;
`;

const TokenName = styled.div`
  font-size: 0.9rem;
  color: #b0a0c0;
`;

const NetworkTag = styled.div`
  font-size: 0.7rem;
  color: #e96461; /* Highlight color */
`;

// Placeholder data (replace with actual data fetching later)
const dummyTokens = [
  { id: 1, symbol: '$ADS', name: 'Alkimi', network: 'Ethereum (ERC20)' },
  { id: 2, symbol: '0', name: 'Volt Inu V2', network: 'Ethereum (ERC20)' },
  { id: 3, symbol: '1000SATS', name: '1000*SATS (Ordinals)', network: 'Bitcoin network (BRC)' },
  { id: 4, symbol: '10SET', name: 'Tenset', network: 'Binance Smart Chain (BEP20)' },
  { id: 5, symbol: '1BAND1', name: 'Bandadsasda Protocol', network: '' },
  // Add more dummy tokens as needed
];

const TokenSelector = ({ onClose, onSelectToken, selectingCurrencyType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Basic filtering for now (can add more sophisticated search later)
  const filteredTokens = dummyTokens.filter(token =>
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <H3 color='a0789c'>You Send</H3>
            <RxCross2 size={24} color='a0789c' onClick={onClose} />
      </Header>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon size={20} />
      </SearchContainer>
      <TabsContainer>
        <TabButton $active={activeTab === 'all'} onClick={() => setActiveTab('all')}>All</TabButton>
        <TabButton $active={activeTab === 'popular'} onClick={() => setActiveTab('popular')}>Popular</TabButton>
      </TabsContainer>
      <H5 color='#a0789c'>Select a Token</H5>
      <TokenList>
        {filteredTokens.map(token => (
          <TokenItem key={token.id} onClick={() => {
            onSelectToken(token.symbol);
            onClose();
          }}> {/* Add actual token selection logic */}
            <TokenIcon />
            <TokenDetails>
              <TokenSymbol>
                <FlexBox columnGap="0.25rem" align="center">
                    {token.symbol}
                    <H3 color='#a0789c'>{token.name}</H3>
                </FlexBox>
                </TokenSymbol>
              <NetworkTag>{token.network}</NetworkTag>
            </TokenDetails>
          </TokenItem>
        ))}
      </TokenList>
    </Container>
  );
};

export default TokenSelector; 