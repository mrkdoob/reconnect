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
  title?: string
  text?: string
}

export const Confirmation: React.FC<Props> = props => {
  return (
    <Popover placement="left" {...props}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>{props.children}</PopoverTrigger>
          <PopoverContent zIndex={4}>
            <PopoverHeader fontWeight="semibold">
              {props.title || "Are you sure?"}
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            {props.text && <PopoverBody>{props.text}</PopoverBody>}
            <PopoverFooter border={0} d="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variantColor="blue"
                  onClick={() => {
                    props.onSubmit()
                    onClose && onClose()
                  }}
                >
                  Submit
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}
