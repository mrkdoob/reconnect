import { Flex } from "@chakra-ui/core"
import { styled } from "./providers/ThemeProvider"

export const Center = styled(Flex)`
  height: calc(100% - 60px);
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
