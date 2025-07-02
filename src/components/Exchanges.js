import FlexBox from "@/common/UI/FlexBox";
import {
  H1,
  H3,
  H6,
  Display,
  ButtonText,
  H5,
  H4,
} from "@/common/UI/Headings";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaArrowRightArrowLeft, FaArrowDown } from "react-icons/fa6";
import { MdRefresh } from "react-icons/md";
import TokenSelector from "./TokenSelector";

const Wrapper = styled(FlexBox)`
  height: 100%;
  flex-direction: column;
`;

const Card = styled(FlexBox)`
  align-items: center;
  border-radius: ${(props) => props.borderRadius || "4px"};
  padding: 0 0.75rem;
  background: linear-gradient(
    80.26deg,
    rgb(42, 47, 52) -9.48%,
    rgb(31, 35, 40) 119.79%
  );
`;

const Container = styled(FlexBox)`
  border-radius: 4px;
  border: 1px solid #74808c;
  height: fit-content;
  background-color: #1f2328;
  align-items: center;
  justify-content: space-between;
  column-gap: 1rem;
  background: linear-gradient(
    80.26deg,
    rgb(42, 47, 52) -9.48%,
    rgb(31, 35, 40) 119.79%
  );
`;

const StyledInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  flex-grow: 1;
  padding: 0.5rem 1.25rem;
`;

const Section = styled(FlexBox)`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

const ImageContainer = styled(FlexBox)`
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  box-shadow: rgba(30, 35, 40, 0.63) 0px 4px 34px;
  background: linear-gradient(
    80.26deg,
    rgb(61, 67, 73) -9.48%,
    rgb(55, 63, 72) 119.79%
  );
  justify-content: center;
  object-fit: contain;
`;

const InputContainerSmallBox = styled(FlexBox)`
  column-gap: 1rem;
  padding: 0.5rem 0.75rem;
  align-items: center;
  justify-content: center;
  background: linear-gradient(80.26deg, rgb(42, 47, 52) 0%, rgb(31, 35, 40) 100%);
  border-radius: 0 4px 4px 0;
`;

const CircleSwaper = styled(FlexBox)`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 33px;
  background: linear-gradient(rgb(42, 47, 52) -9.48%, rgb(31, 35, 40) 119.79%);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: absolute;
  align-items: center;
  justify-content: center;
  left: 44.5rem;
  top: 12rem;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const TokenSelectorWrapper = styled.div`
width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
`;

const Exchanges = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [showTokenSelector, setShowTokenSelector] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime <= 1 ? 10 : prevTime - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTokenSelect = (token) => {
    setSelectedToken(token);
    setShowTokenSelector(false);
  };

  return (
    <Wrapper>
      <CircleSwaper>
        <FaArrowRightArrowLeft color="#fff" />
      </CircleSwaper>
      <Section>
        {/* First Card */}
        <Card borderRadius="4px 0 0 4px">
          <FlexBox column rowGap="1.5rem" padding="1rem">
            <FlexBox columnGap="0.5rem" align="center">
              <FlexBox
                width="50px"
                height="26px"
                justify="center"
                align="center"
                borderRadius="4px"
                backgroundColor="#394049"
              >
                <H6 bold color="#9b9b9b">
                  1 OF 5
                </H6>
              </FlexBox>
              <H4 color="white" bold>
                Start exchange
              </H4>
            </FlexBox>

            {/* Input Box with Dropdown */}
            <DropdownWrapper>
              <Container>
                <StyledInput type="text" placeholder="0.0" />
                <InputContainerSmallBox>
                  <ImageContainer>
                    <Image src="/BTC.png" alt="BTC" />
                  </ImageContainer>
                  <FlexBox column>
                    <H1 color="#f5f5f5">BTC</H1>
                    <H5 color="#96a0ab">BTC</H5>
                  </FlexBox>
                  <FlexBox onClick={() => setShowTokenSelector(true)}>
                    <FaArrowDown color="#fff" size={16} />
                  </FlexBox>
                </InputContainerSmallBox>
              </Container>

              {showTokenSelector && (
                <TokenSelectorWrapper>
                  <TokenSelector
                    onClose={() => setShowTokenSelector(false)}
                    onSelectToken={handleTokenSelect}
                  />
                </TokenSelectorWrapper>
              )}
            </DropdownWrapper>

            <FlexBox justifyContent="space-between" columnGap="0.5rem">
              <FlexBox columnGap="0.25rem">
                <H4 color="#acb7c2">Min:</H4>
                <H4 color="#7a7dfa">0.00047004 BTC</H4>
              </FlexBox>
              <FlexBox columnGap="0.25rem">
                <H4 color="#acb7c2">Max:</H4>
                <H4 color="#7a7dfa">0.00047004 BTC</H4>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </Card>

        {/* Second Card */}
        <Card borderRadius="0 8px 8px 0">
          <FlexBox column rowGap="1.85rem" padding="1rem">
            <FlexBox columnGap="0.5rem" align="center" justify="end">
              <H5 bold color="#9b9b9b">
                Auto refreshes in {timeLeft} sec
              </H5>
              <FlexBox
                width="24px"
                height="24px"
                align="center"
                justify="center"
                borderRadius="50%"
                position="relative"
                overflow="hidden"
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: `conic-gradient(
                      blue ${(timeLeft / 10) * 360}deg,
                      transparent ${(timeLeft / 10) * 360}deg
                    )`,
                    mask: "radial-gradient(circle at center, transparent 50%, white 50%)",
                    WebkitMask:
                      "radial-gradient(circle at center, transparent 50%, white 50%)",
                    zIndex: 1,
                    transition: "background 1s linear",
                  }}
                />
                <MdRefresh size={16} color="white" style={{ zIndex: 2 }} />
              </FlexBox>
            </FlexBox>

            {/* Static Card Section */}
            <Container>
              <StyledInput type="text" placeholder="0.0" />
              <InputContainerSmallBox>
                <ImageContainer>
                  <Image src="/BTC.png" alt="BTC" />
                </ImageContainer>
                <FlexBox column>
                  <H1 color="#f5f5f5">BTC</H1>
                  <H5 color="#96a0ab">BTC</H5>
                </FlexBox>
                <FlexBox onClick={() => setShowTokenSelector(true)}>
                  <FaArrowDown color="#fff" size={16} />
                </FlexBox>
              </InputContainerSmallBox>
            </Container>

            <FlexBox justifyContent="space-between" columnGap="0.5rem">
              <FlexBox columnGap="0.25rem">
                <H4 color="#acb7c2">Min:</H4>
                <H4 color="#7a7dfa">0.00047004 BTC</H4>
              </FlexBox>
              <FlexBox columnGap="0.25rem">
                <H4 color="#acb7c2">Max:</H4>
                <H4 color="#7a7dfa">0.00047004 BTC</H4>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </Card>
      </Section>
    </Wrapper>
  );
};

export default Exchanges;
