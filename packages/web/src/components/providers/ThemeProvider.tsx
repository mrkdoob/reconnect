import React from "react"
import {
  CSSReset,
  ThemeProvider as CThemeProvider,
  theme,
  DefaultTheme,
  Flex,
} from "@chakra-ui/core"
import emotionStyled, { CreateStyled } from "@emotion/styled"
import { useOutlineControl } from "@noquarter/hooks"

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    gray: {
      ...theme.colors.gray,
      50: "#f7f9fA",
      200: "#dbe2e8",
      400: "#888888",
      500: "#525c65", // TODO: Text color
      700: "#7d97ad",
      800: "#2e3d49", // Color header
      900: "#101115",
    },
    blue: {
      50: "RGBA(99,206,217,0.5)", // with opacity
      100: "#63CED9",
      200: "#63CED9",
      300: "#63CAEA",
      400: "#63CAEA",
      500: "#63CAEA",
      550: "RGBA(86,176,204,0.5)", // with opacity
      600: "#56B0CC",
      700: "#56B0CC",
      800: "#56B0CC",
      900: "#56B0CC",
    },
    green: {
      // ...theme.colors.green,
      50: "RGBA(101,209,196,0.5)", // with opacity
      100: "#65D1C4",
      200: "#65D1C4",
      300: "#65D1C4",
      350: "RGBA(104,213,178,0.5)", // with opacity
      400: "#68D5B2",
      500: "#68D5B2",
      600: "#68D5B2",
      700: "#68D5B2",
      800: "#68D5B2",
      900: "#68D5B2",
    },
    text: "#525c65",
  },
  radii: {
    ...theme.radii,
    lg: "1rem",
    xl: "1.5rem",
  },
}

export const ThemeProvider: React.FC = ({ children }) => {
  useOutlineControl()
  return (
    <CThemeProvider theme={customTheme}>
      <StyledBackground>
        <CSSReset />
        {children}
      </StyledBackground>
    </CThemeProvider>
  )
}

const StyledBackground: React.FC = props => {
  return (
    <Flex color="text" bg="white" justify="center" w="100%">
      {props.children}
    </Flex>
  )
}

export const styled = emotionStyled as CreateStyled<DefaultTheme>
