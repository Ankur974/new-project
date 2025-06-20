import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowDown } from "react-icons/fa6";
import { MdOutlineArrowDropDown } from "react-icons/md";

import FlexBox from "@/common/UI/FlexBox";
import { Caption, H3 } from "@/common/UI/Headings";
import TokenSelector from "./TokenSelector";
import Table from "./Table";
const FormContainer = styled(FlexBox)`
  flex-direction: column;
  background: linear-gradient(180deg, rgb(52, 57, 62) 0%, rgb(21, 25, 30) 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  font-family: Roboto, Quicksand, "Source Sans Pro", -apple-system,
    BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  width: fit-content;
  row-gap: 1rem;
  position: relative;
`;

const ExchangeTabs = styled(FlexBox)`
  border: 1px solid #673e60;
  border-radius: 0.4rem;
  padding: 4px;
  width: 100%;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px 15px;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.75rem;
  transition: background-color 0.3s ease;
  background-color: ${({ $active }) => ($active ? "#e96461" : "transparent")};
  color: ${({ $active }) => ($active ? "white" : "#b0a0c0")};
`;

const CurrencySection = styled(FlexBox)`
  background-color: #27212b;
  border-radius: 0.5rem;
  flex-direction: column;
  gap: 0.5rem;
  height: 76px;
  padding: 1rem;
  width: 100%;
`;

const SectionHeader = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
`;

const CurrencyRow = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const CurrencyInput = styled.input`
  background-color: #27212b;
  border: none;
  color: #fff;
  font-size: 1rem;
  width: 100%;
  outline: none;

  /* Hide number input spinners for Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Hide number input spinners for Firefox */
  -moz-appearance: textfield;

  :hover,
  :focus {
    background-color: #27212b;
    outline: none;
  }
`;

const CurrencySelector = styled(FlexBox)`
  column-gap: 1rem;
  align-items: center;
  cursor: pointer;
`;

const SwapButton = styled(FlexBox)`
  background: linear-gradient(180deg, rgb(52, 57, 62) 0%, rgb(21, 25, 30) 100%);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 149px;
  left: 146px;
  cursor: pointer;
`;

const ActionButtons = styled.div`
  background-color: transparent;
  padding: 0.5rem 0;
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
  font-weight: bold;
  transition: background-color 0.3s ease;
  transition: all 0.3s ease;
  &:hover {
    background: linear-gradient(45deg, #ff6b68, #ff7b78);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(233, 100, 97, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled.button`
  width: 100%;
  padding: 15px;
  border: 1px solid #e96461;
  border-radius: 8px;
  background-color: transparent;
  color: #e96461;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
`;

const CurrencyInputSection = ({
  label,
  value,
  onChange,
  currency,
  onDropdownClick,
}) => (
  <CurrencySection>
    <SectionHeader>
      <Caption color="#a0789c">{label}</Caption>
      <Caption color="#a0789c">Form</Caption>
    </SectionHeader>
    <CurrencyRow>
      <CurrencyInput
        type="number"
        placeholder="0.00"
        value={value}
        onChange={onChange}
      />
      <CurrencySelector onClick={onDropdownClick}>
        <H3 color="#fff">{currency}</H3>
        <MdOutlineArrowDropDown color="#fff" size={24} />
      </CurrencySelector>
    </CurrencyRow>
  </CurrencySection>
);

const CryptoExchangeForm = () => {
  const [sendValue, setSendValue] = useState("");
  const [sendCurrency, setSendCurrency] = useState("BTC");
  const [receiveValue, setReceiveValue] = useState("");
  const [receiveCurrency, setReceiveCurrency] = useState("ETH");
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false);
  const [selectingCurrencyType, setSelectingCurrencyType] = useState(null);

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
    setReceiveValue(value ? converted : "");
  };

  const handleReceiveChange = (e) => {
    const value = e.target.value;
    setReceiveValue(value);
    const converted = convert(value, receiveCurrency, sendCurrency);
    setSendValue(value ? converted : "");
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

  const handleTokenSelect = (token) => {
    if (selectingCurrencyType === "send") {
      setSendCurrency(token.tokenSymbol);
    } else if (selectingCurrencyType === "receive") {
      setReceiveCurrency(token.tokenSymbol);
    }
    setIsTokenSelectorOpen(false);
  };

  return (
    <FormContainer>
      <ExchangeTabs>
        <TabButton $active={true}>Exchange crypto</TabButton>
        <TabButton $active={false}>Buy/Sell crypto</TabButton>
      </ExchangeTabs>

      <CurrencyInputSection
        label="You send"
        value={sendValue}
        onChange={handleSendChange}
        currency={sendCurrency}
        onDropdownClick={() => handleDropdownClick("send")}
      />

      <SwapButton onClick={handleSwap}>
        <FaArrowDown color="#fff" size={14} />
      </SwapButton>

      <CurrencyInputSection
        label="You get"
        value={receiveValue}
        onChange={handleReceiveChange}
        currency={receiveCurrency}
        onDropdownClick={() => handleDropdownClick("receive")}
      />

      <ActionButtons>
        <PrimaryButton>VIEW OFFERS</PrimaryButton>
        <SecondaryButton>QUICK EXCHANGE</SecondaryButton>
      </ActionButtons>
      {isTokenSelectorOpen && (
        <TokenSelector
        onClose={() => setIsTokenSelectorOpen(false)}
        onSelectToken={handleTokenSelect}
        />
      )}
    </FormContainer>
  );

};

export default CryptoExchangeForm;
