import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdSwapCalls } from 'react-icons/md';

import FlexBox from '@/common/UI/FlexBox';
import { Caption, H3 } from '@/common/UI/Headings';
import TokenSelector from './TokenSelector';

const Container = styled(FlexBox)`
  flex-direction: column;
  background-color: #36293b;
  border-radius: 16px;
  padding: 24px;
  color: white;
  font-family: Roboto, Quicksand, "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  width: fit-content;
  row-gap: 1rem;
  position: relative;
`;

const TabsContainer = styled(FlexBox)`
  border: 1px solid #673e60;
  border-radius: 1rem;
  padding: 4px;
  width: 100%;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.75rem;
  transition: background-color 0.3s ease;
  background-color: ${({ $active }) => ($active ? '#e96461' : 'transparent')};
  color: ${({ $active }) => ($active ? 'white' : '#b0a0c0')};
`;

const Section = styled(FlexBox)`
  background-color: #27212b;
  border-radius: 0.5rem;
  flex-direction: column;
  gap: 0.5rem;
  height: 76px;
  padding: 1rem;
  width: 100%;
`;

const TextContainer = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
`;

const CurrencyRow = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  background-color: #27212b;
  border: none;
  color: #fff;
  font-size: 1rem;
  width: 100%;
  outline: none;

  :hover,
  :focus {
    background-color: #27212b;
    outline: none;
  }
`;

const CurrencySelector = styled(FlexBox)`
  column-gap: 1rem;
  align-items: center;
`;

const SwapButton = styled(FlexBox)`
  background-color: white;
  border: 1px solid red;
  width: 30px;
  height: 30px;
  border-radius: 34%;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 161px;
  left: 152px;
  cursor: pointer;
`;

const ActionButtonsContainer = styled.div`
  margin-top: 20px;
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #e96461;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
`;

const SecondaryButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #3a2a4a;
  border: none;
  border-radius: 8px;
  color: #b0a0c0;
`;

const CurrencySection = ({ label, value, onChange, currency, onDropdownClick }) => (
  <Section>
    <TextContainer>
      <Caption color="#a0789c">{label}</Caption>
      <Caption color="#a0789c">Form</Caption>
    </TextContainer>
    <CurrencyRow>
      <Input type="number" placeholder="0.00" value={value} onChange={onChange} />
      <CurrencySelector onClick={onDropdownClick}>
        <H3 color="#fff">{currency}</H3>
        <IoMdArrowDropdown color="#fff" size={26} />
      </CurrencySelector>
    </CurrencyRow>
  </Section>
);

const CryptoExchangeForm = () => {
  const [sendValue, setSendValue] = useState('');
  const [sendCurrency, setSendCurrency] = useState('BTC');
  const [receiveValue, setReceiveValue] = useState('');
  const [receiveCurrency, setReceiveCurrency] = useState('ETH');
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false);
  const [selectingCurrencyType, setSelectingCurrencyType] = useState(null); // 'send' or 'receive'

  // Hardcoded conversion rate for BTC -> ETH and vice versa
  const conversionRates = {
    BTC: { ETH: 15 },
    ETH: { BTC: 1 / 15 },
  };

  const convert = (amount, from, to) => {
    const rate = conversionRates[from]?.[to] || 0;
    return (parseFloat(amount) * rate).toFixed(6);
  };

  const handleSendChange = (e) => {
    const value = e.target.value;
    setSendValue(value);
    const converted = convert(value, sendCurrency, receiveCurrency);
    setReceiveValue(value ? converted : '');
  };

  const handleReceiveChange = (e) => {
    const value = e.target.value;
    setReceiveValue(value);
    const converted = convert(value, receiveCurrency, sendCurrency);
    setSendValue(value ? converted : '');
  };

  const handleSwap = () => {
    setSendValue(receiveValue);
    setReceiveValue(sendValue);
    const tempCurrency = sendCurrency;
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(tempCurrency);
  };

  const handleDropdownClick = (type) => {
    setSelectingCurrencyType(type);
    setIsTokenSelectorOpen(true);
  };

  const handleTokenSelect = (tokenSymbol) => {
    if (selectingCurrencyType === 'send') {
      setSendCurrency(tokenSymbol);
    } else if (selectingCurrencyType === 'receive') {
      setReceiveCurrency(tokenSymbol);
    }
    setIsTokenSelectorOpen(false);
  };

  return (
    <Container>
      <TabsContainer>
        <TabButton $active={true}>Exchange crypto</TabButton>
        <TabButton $active={false}>Buy/Sell crypto</TabButton>
      </TabsContainer>

      <CurrencySection
        label="You send"
        value={sendValue}
        onChange={handleSendChange}
        currency={sendCurrency}
        onDropdownClick={() => handleDropdownClick('send')}
      />

      <SwapButton onClick={handleSwap}>
        <MdSwapCalls color="red" size={18} />
      </SwapButton>

      <CurrencySection
        label="You get"
        value={receiveValue}
        onChange={handleReceiveChange}
        currency={receiveCurrency}
        onDropdownClick={() => handleDropdownClick('receive')}
      />

      <ActionButtonsContainer>
        <PrimaryButton>VIEW OFFERS</PrimaryButton>
        <SecondaryButton>QUICK EXCHANGE</SecondaryButton>
      </ActionButtonsContainer>

      {isTokenSelectorOpen && (
        <TokenSelector
          onClose={() => setIsTokenSelectorOpen(false)}
          onSelectToken={handleTokenSelect}
          selectingCurrencyType={selectingCurrencyType}
        />
      )}
    </Container>
  );
};

export default CryptoExchangeForm;
