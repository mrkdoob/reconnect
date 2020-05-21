import React from "react"
import { Box, Spinner, Flex, Heading } from "@chakra-ui/core"
import styled from "@emotion/styled"
import { useMe } from "./providers/MeProvider"
import { Redirect } from "@reach/router"

interface Props {
  title?: string
  loading?: boolean
  disableRedirect?: boolean
}

export const Page: React.FC<Props> = props => {
  const me = useMe()

  // TODO: Use CheckAuth component
  if (!me && !props.disableRedirect)
    return <Redirect noThrow={true} to={`/login`} />
  return (
    <Flex w="98vw" justify="center" overflowX="hidden">
      <Box
        maxWidth={{ base: "100%", md: "1200px" }}
        minHeight="calc(100vh - 60px)"
        mt={{ base: 8, md: "60px" }}
        px={4}
      >
        {props.loading ? (
          <StyledCenter>
            <Spinner />
          </StyledCenter>
        ) : (
          <>
            {props.title && (
              <Heading mt={16} mb={8}>
                {props.title}
              </Heading>
            )}
            {props.children}
          </>
        )}
      </Box>
    </Flex>
  )
}

const StyledCenter = styled(Flex)`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 40px);
`
