import FlexBox from '@/common/UI/FlexBox'
import { H1, H3, H6, Display, ButtonText, H5, H4 } from '@/common/UI/Headings'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaArrowRightArrowLeft } from "react-icons/fa6"
import { MdRefresh } from "react-icons/md"
import { FaArrowDown } from "react-icons/fa6"
import TokenSelector from './TokenSelector'

const RefreshIcon = styled(MdRefresh)`
  z-index: 2;
`;

const ExchangeWrapper = styled(FlexBox)`
  height: 100%;
  background-color: #191d21;
  flex-direction: column;
`;

const ExchangeCard = styled(FlexBox)`
  width: 100%;
  justify-content: end;
`;

const ExchangeButton = styled(FlexBox)`
  align-items: center;
  column-gap: 1rem;
  background-color: #24282e;
  padding: 0.75rem;
`;

const ExchangeSection = styled(FlexBox)`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
`;

const ExchangeContainer = styled(FlexBox)`
  border-radius: 4px;
  border: 1px solid #74808c;
  height: fit-content;
  background-color: #1f2328;
  align-items: center;
  justify-content: space-between;
  column-gap: 1rem;
  background: linear-gradient(80.26deg, rgb(42, 47, 52) -9.48%, rgb(31, 35, 40) 119.79%);
`;

const ExchangeInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  flex-grow: 1;
  padding: 0.5rem;
`;

const TokenCard = styled(FlexBox)`
  align-items: center;
  border-radius: ${props => props.borderRadius || '8px 0 0 8px'};
  padding: 0 0.75rem;
  background: linear-gradient(80.26deg, rgb(42, 47, 52) -9.48%, rgb(31, 35, 40) 119.79%);
`;

const TokenImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

const TokenImageContainer = styled(FlexBox)`
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  box-shadow: rgba(30, 35, 40, 0.63) 0px 4px 34px;
  background: linear-gradient(80.26deg, rgb(61, 67, 73) -9.48%, rgb(55, 63, 72) 119.79%);
  justify-content: center;
  object-fit: contain;
`;

const SwapButton = styled(FlexBox)`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 33px;
  background: linear-gradient(rgb(42, 47, 52) -9.48%, rgb(31, 35, 40) 119.79%);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: absolute;
  align-items: center;
  justify-content: center;
  left: 44.5rem;
  top: 33rem;
`;

const RefreshTimer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 0;
`;

const RefreshProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props => `conic-gradient(
    blue ${props.timeLeft / 10 * 360}deg,
    transparent ${props.timeLeft / 10 * 360}deg
  )`};
  mask: radial-gradient(circle at center, transparent 50%, white 50%);
  -webkit-mask: radial-gradient(circle at center, transparent 50%, white 50%);
  z-index: 1;
  transition: background 1s linear;
`;

const ExchangeInfo = styled(FlexBox)`
  column-gap: 1rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  background: linear-gradient(80.26deg, rgb(42, 47, 52) -9.48%, rgb(31, 35, 40) 119.79%);
`;

const TokenInfo = styled(FlexBox)`
  column-gap: 1rem;
`;

const TokenDetails = styled(FlexBox)`
  column-gap: 1rem;
`;

const TokenDropdown = styled(FlexBox)`
  cursor: pointer;
`;

const MinMaxContainer = styled(FlexBox)`
  justify-content: space-between;
  column-gap: 0.5rem;
`;

const MinMaxInfo = styled(FlexBox)`
  column-gap: 0.25rem;
`;

const RefreshContainer = styled(FlexBox)`
  column-gap: 0.5rem;
  align-items: center;
  justify-content: end;
`;

const RefreshIconWrapper = styled(FlexBox)`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
`;

const ExchangeCounter = styled(FlexBox)`
  width: 50px;
  height: 26px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: #394049;
`;

const Exchanges = ({ onDropdownClick }) => {
  const [timeLeft, setTimeLeft] = useState(10)
  const [showTokenSelector, setShowTokenSelector] = useState(false)
  const [selectedToken, setSelectedToken] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          return 10
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleTokenSelect = (token) => {
    setSelectedToken(token)
    setShowTokenSelector(false)
  }

  return (
    <ExchangeWrapper>
      {showTokenSelector && (
        <TokenSelector 
          onClose={() => setShowTokenSelector(false)}
          onSelectToken={handleTokenSelect}
        />
      )}
      <SwapButton>
        <FaArrowRightArrowLeft color='#fff'/>
      </SwapButton>
      <ExchangeSection>
        <TokenCard borderRadius='8px 0 0 8px'>
          <FlexBox column padding="1rem" rowGap="1.5rem">
            <FlexBox columnGap="0.5rem" align="center">
              <ExchangeCounter>
                <H6 bold color="#9b9b9b">1 OF 5</H6>
              </ExchangeCounter>
              <H3 color="white" bold>Start exchange</H3>
            </FlexBox>

            <FlexBox column rowGap="0.5rem">
              <ExchangeContainer>
                <ExchangeInput type="text" placeholder="0.0" />
                <ExchangeInfo>
                  <TokenImageContainer>
                    <TokenImage src="/BTC.png" alt="BTC" />
                  </TokenImageContainer>
                  <TokenDetails column columnGap="1rem">
                    <H1 color="#f5f5f5">BTC</H1>
                    <H5 color="#96a0ab">BTC</H5>
                  </TokenDetails>
                  <TokenDropdown onClick={() => setShowTokenSelector(true)}>
                    <FaArrowDown color="#fff" size={16} />
                  </TokenDropdown>
                </ExchangeInfo>
              </ExchangeContainer>

              <MinMaxContainer>
                <MinMaxInfo>
                  <H4 color="#acb7c2">Min:</H4>
                  <H4 color="#7a7dfa">0.00047004 BTC</H4>
                </MinMaxInfo>
                <MinMaxInfo>
                  <H4 color="#acb7c2">Max:</H4>
                  <H4 color="#7a7dfa">0.00047004 BTC</H4>
                </MinMaxInfo>
              </MinMaxContainer>
            </FlexBox>
          </FlexBox>
        </TokenCard>
        <TokenCard borderRadius='0 8px 8px 0'>
          <FlexBox column padding="1rem" rowGap="1.75rem">
            <RefreshContainer>
              <H5 bold color="#9b9b9b">Auto refreshes in {timeLeft} sec </H5>
              <RefreshIconWrapper>
                <RefreshTimer />
                <RefreshProgress timeLeft={timeLeft} />
                <RefreshIcon size={16} color='white'/>
              </RefreshIconWrapper>
            </RefreshContainer>

            <FlexBox column rowGap="0.5rem">
              <ExchangeContainer>
                <ExchangeInput type="text" placeholder="0.0" />
                <ExchangeInfo>
                  <TokenImageContainer>
                    <TokenImage src="/BTC.png" alt="BTC" />
                  </TokenImageContainer>
                  <TokenDetails column columnGap="1rem">
                    <H1 color="#f5f5f5">BTC</H1>
                    <H5 color="#96a0ab">BTC</H5>
                  </TokenDetails>
                  <TokenDropdown>
                    <H3 color="#f5f5f5">▼</H3>
                  </TokenDropdown>
                </ExchangeInfo>
              </ExchangeContainer>
              <MinMaxContainer>
                <MinMaxInfo>
                  <H5 color="#fff">1 BTC ≈ 327.7599611 XMR</H5>
                </MinMaxInfo>
              </MinMaxContainer>
            </FlexBox>
          </FlexBox>
        </TokenCard>
      </ExchangeSection>
    </ExchangeWrapper>
  )
}

export default Exchanges
