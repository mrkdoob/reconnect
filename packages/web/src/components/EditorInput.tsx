import React from "react"
import { FormControl, InputProps } from "@chakra-ui/core"
import JoditEditor from "jodit-react"
import { FieldError, useFormContext } from "react-hook-form"

import { InputError } from "./InputError"
import { InputLabel } from "./InputLabel"

// use https://xdsoft.net/jodit/play.html to configure
const config = {
  toolbarAdaptive: false,
  autofocus: false,
  showXPathInStatusbar: false,
  buttons:
    "|,bold,strikethrough,underline,italic,|,superscript,subscript,|,ul,ol,|,outdent,indent,|,brush,fontsize,|,image,table,link,|,align,undo,redo,\n,selectall,cut,copy,paste,eraser,copyformat,|,hr,symbol,fullsize",
}

interface Props extends InputProps {
  name: string
  label?: string
  subLabel?: string
}

export const EditorInput: React.FC<Props> = props => {
  const { errors, register, setValue, getValues } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string

  React.useEffect(() => {
    register({ name: props.name })
  }, [register, props.name])

  const value = getValues()[props.name]

  const handleChange = (selectedOptions: any) => {
    setValue(props.name, selectedOptions)
  }
  return (
    <FormControl isInvalid={!!fieldError} mb={0} isRequired={props.isRequired}>
      <InputLabel
        label={props.label}
        subLabel={props.subLabel}
        name={props.name}
      />
      <JoditEditor value={value} config={config} onBlur={handleChange} />
      <InputError error={fieldError} />
    </FormControl>
  )
}
