"use client";

import "@/app/globals.css";
import styled from "styled-components";
import FlexBox from "@/common/UI/FlexBox";
import Link from "next/link";

const Wrapper = styled(FlexBox)`
  width: 100vw;
  min-height: 100vh;
  flex-direction: column;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(227, 87, 96, 0.5) 50%,
    rgba(227, 87, 96, 0.62) 100%
  );
`;

const Header = styled.header`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

const Breadcrumb = styled.div`
  color: white;
  font-size: 0.9rem;
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Wrapper>
          <Header>
            <Logo>Crypto Exchange</Logo>
            <Breadcrumb>
              <Link href="/">Home</Link>
            </Breadcrumb>
          </Header>
          {children}
        </Wrapper>
      </body>
    </html>
  );
}
