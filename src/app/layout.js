"use client";
import Link from "next/link";
import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import "@/app/globals.css";
import styled from "styled-components";

import FlexBox from "@/common/UI/FlexBox";
import { colors as baseColors } from "@/lib/colors";
import * as uiColors from "@/common/UI/colors";

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

const Header = styled.nav`
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
  display: flex;
  color: white;
  font-size: 0.9rem;
  column-gap: 1rem;
`;

export default function RootLayout({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const stored =
      typeof window !== "undefined" && localStorage.getItem("themeMode");
    if (stored) setMode(stored);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("themeMode", mode);
    }
  }, [mode]);

  const theme = {
    ...baseColors,
    ...uiColors,
    mode,
    isDark: mode === "dark",
    background:
      mode === "dark" ? baseColors.background.dark : baseColors.background.main,
    text: mode === "dark" ? baseColors.text.light : baseColors.text.main,
  };

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <Wrapper>
            <Header>
              <Logo>Crypto Exchange</Logo>
              <Breadcrumb>
                <Link href="/">Home</Link>
                <Link href="/exchanges">Exchange</Link>
                <Link href="/table">Table</Link>
              </Breadcrumb>
              <button
                aria-label="Toggle dark mode"
                onClick={toggleTheme}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 24,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  borderRadius: 8,
                  transition: "background 0.2s",
                }}
              >
                {mode === "dark" ? <FaSun /> : <FaMoon />}
              </button>
            </Header>
            {children}
          </Wrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
