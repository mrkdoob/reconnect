import React from "react"
import { styled } from "./providers/ThemeProvider"
import { Image } from "@chakra-ui/core"

export const ProfilePhoto = ({ ...props }) => {
  return <StyledImage objectFit="cover" {...props} />
}

const StyledImage = styled(Image)`
  image-orientation: from-image;
`
