import React from "react";
import styled from "styled-components";
import { PiWaveSineBold } from "react-icons/pi";
import { Body1, ButtonText, Caption } from "@/common/UI/Headings";
import FlexBox from "@/common/UI/FlexBox";

// Styled Components

const BottomContainer = styled(FlexBox)`
  background-color: #fbff2d;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  bottom: 0;
  height: 10px;
  left: 0;
  position: absolute;
  width: 100%;
`;

const Card = styled(FlexBox)`
  position: relative;
  width: 100%;
  background-color: #27212b;
  border-radius: 16px;
  padding: 1rem;
  flex-direction: column;
  color: #fff;
  font-family: Roboto, Quicksand, "Source Sans Pro", -apple-system,
    BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
`;

const TopRow = styled(FlexBox)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const LogoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Logo = styled.img`
  width: 20px;
  height: 20px;
`;

const TrustedButton = styled(FlexBox)`
  border-radius: 8px;
  padding: 6px 12px;
  text-align: center;
  background: rgba(39, 174, 96, 0.102);
  text-transform: uppercase;
`;

const Rate = styled.div`
  margin: 18px 0 8px 0;
  font-size: 1.6rem;
  font-weight: 500;
  span {
    color: #b48be4;
    font-size: 1.1rem;
    margin-right: 8px;
  }
`;

const InfoRow = styled(FlexBox)`
  width: 100%;
  align-items: center;
  column-gap: 0.5rem;
`;

const Hr = styled.hr`
  height: 1rem;
  border-left: 1px solid #51354f;
`;

const ExchangeBtn = styled.button`
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 400;
  padding: 8px 16px;
  background-color: transparent;
  color: #e35760;
  border: 1px solid #e35760;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #e35760;
    color: #fff;
  }
`;

export default function ExchangeCard({
  logo = "https://storage.swapspace.co/static/e38a8408cb3ff0c5c82e291e6feb9517996e45bbaae4ef8b49951912d419dd73.svg",
  name = "HTX",
  rate = "4.51712907 ETH",
  eta = "~5 min",
  kycRisk = "Low",
  isTrusted = true,
  label,
  time,
  quote,
  type,
  gasFee,
  save,
  logoColor,
  isWalletless,
  isHighlighted,
}) {
  const displayName = label || name;
  const displayRate = quote || rate;
  const displayEta = time || eta;
  const displayKycRisk = type || kycRisk;
  const displayLogo = logoColor ? undefined : logo;

  return (
    <Card>
      <TopRow>
        <LogoTitle>
          {logoColor ? (
            <Logo style={{ backgroundColor: logoColor }} />
          ) : (
            <Logo src={logo} alt={displayName} />
          )}
          <Body1 color="#fff">{displayName}</Body1>
        </LogoTitle>
        {isTrusted && (
          <TrustedButton>
            <Caption color="#fdffa0">Trusted partner</Caption>
          </TrustedButton>
        )}
      </TopRow>

      <FlexBox align="center" columnGap="0.5rem" margin="1rem 0">
        <ButtonText color="#a0789c">Rate</ButtonText>
        <PiWaveSineBold />
        <Body1 color="#fff">{displayRate}</Body1>
      </FlexBox>

      <FlexBox
        align="center"
        columnGap="0.5rem"
        width="100%"
        justify="space-between"
      >
        <InfoRow>
          <FlexBox align="center" columnGap="0.5rem">
            <ButtonText color="#a0789c">ETA:</ButtonText>
            <Body1 color="#fff">{displayEta}</Body1>
          </FlexBox>

          <Hr />

          <FlexBox align="center" columnGap="0.5rem">
            <ButtonText color="#a0789c">KYC RISK:</ButtonText>
            <Body1 color="#fff">{displayKycRisk}</Body1>
          </FlexBox>
        </InfoRow>

        <ExchangeBtn>Exchange</ExchangeBtn>
      </FlexBox>

      <BottomContainer />
    </Card>
  );
}
