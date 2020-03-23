import React from "react"
import {
  Popover,
  IPopover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  Button,
} from "@chakra-ui/core"

interface Props extends IPopover {
  onSubmit: () => void
  text?: string
  title?: string
}

export const Confirmation: React.FC<Props> = props => {
  return (
    <Popover {...props}>
      <PopoverTrigger>{props.children}</PopoverTrigger>
      <PopoverContent zIndex={4}>
        {props.title && (
          <PopoverHeader fontWeight="semibold">{props.title}</PopoverHeader>
        )}
        <PopoverArrow />
        <PopoverCloseButton />
        {props.text && <PopoverBody>{props.text}</PopoverBody>}
        <PopoverFooter border={0} d="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button variant="outline" onClick={props.onClose}>
              Cancel
            </Button>
            <Button variantColor="pink" onClick={props.onSubmit}>
              Submit
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
