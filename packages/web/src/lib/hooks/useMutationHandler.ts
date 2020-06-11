import { ExecutionResult } from "graphql"
import { useToastOptions } from "@chakra-ui/core"
import { ManualFieldError } from "react-hook-form"
import { useToast } from "./useToast"

export interface ValidationError {
  property: string
  constraints: { [key: string]: string }
}

export function formatValidations(
  errors: ValidationError[],
): ManualFieldError<any>[] {
  return errors.map(error => ({
    name: error.property,
    type: error.property,
    types: error.constraints,
  }))
}

export interface MutationHandler<T> {
  onSuccess?: (data: NonNullable<T>) => void
  onValidationError?: (errors: ManualFieldError<any>[]) => void
  onAppError?: (message: string) => void
  onServerError?: (message: string) => void
}

function mutationHandler<T>(
  res: ExecutionResult<NonNullable<T>> | void,
  handler: MutationHandler<T>,
  toast: (props: useToastOptions) => void,
  actions?: {
    setFieldErrors: (errors: ManualFieldError<any>[]) => void
    setAppError: (message: any) => void
  },
) {
  try {
    if (!res) throw new Error("No response")
    if (res.data && !res.errors) {
      if (handler?.onSuccess) {
        handler.onSuccess(res.data)
      }
      return res
    }

    if (
      res.errors?.[0].message.includes("Access denied!") ||
      res.errors?.[0].message.includes("Not authorized")
    ) {
      toast({
        status: "error",
        title: "Not authorized",
        description: "You cannot perform this action",
      })
      return res
    }

    const validationErrors =
      res.errors?.[0].extensions?.exception?.validationErrors
    if (validationErrors) {
      if (handler?.onValidationError) {
        handler.onValidationError(formatValidations(validationErrors))
      } else if (actions) {
        actions.setFieldErrors(formatValidations(validationErrors))
      }
      return res
    }

    if (res.errors?.[0].extensions?.code === "BAD_USER_INPUT") {
      if (handler?.onAppError) {
        handler.onAppError(res.errors[0].message)
      } else if (actions) {
        actions.setAppError(res.errors[0].message)
      } else {
        toast({ status: "error", description: res.errors[0].message })
      }
      return res
    }
    if (res.errors?.[0].message) {
      if (handler?.onServerError) {
        handler.onServerError(res.errors[0].message)
      } else {
        toast({
          status: "error",
          title: "Server error",
          description: "Please try again shortly! We have been notified.",
        })
      }
      return res
    }
  } catch {
    toast({
      status: "error",
      title: "Server error",
      description: "Please try again shortly! We have been notified.",
    })

    return res
  }
}

export function useMutationHandler() {
  const toast = useToast()
  async function handle<T>(
    mutation: () => Promise<ExecutionResult<NonNullable<T>> | void>,
    actions?: MutationHandler<T>,
    formActions?: {
      setFieldErrors: (errors: ManualFieldError<any>[]) => void
      setAppError: (message: any) => void
    },
  ) {
    try {
      const res = await mutation()
      return mutationHandler(res, actions || {}, toast, formActions)
    } catch {
      toast({
        title: "Network error",
        description: "Something went wrong. We have been notified!",
        status: "error",
      })
      return
    }
  }
  return handle
}
