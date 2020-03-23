import { ExecutionResult } from "graphql"
import { useToastOptions } from "@chakra-ui/core"
import { ManualFieldError } from "react-hook-form"

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

export function mutationHandler<T>(
  res?: ExecutionResult<NonNullable<T>> | void | null,
  handler?: MutationHandler<T>,
  actions?: {
    setFieldErrors: (errors: ManualFieldError<any>[]) => void
    setAppError: (message: any) => void
  },
  toast?: (props: useToastOptions) => void,
) {
  try {
    if (!res) throw new Error("No response")
    if (res.data && !res.errors) {
      if (handler?.onSuccess) {
        return handler.onSuccess(res.data)
      }
      return
    }

    if (res.errors?.[0].message.includes("Access denied!")) {
      if (toast) {
        return toast({ status: "error", description: "Access denied!" })
      }
      if (actions) return actions.setAppError("Access denied!")
      return
    }

    const validationErrors =
      res.errors?.[0].extensions?.exception?.validationErrors
    if (validationErrors) {
      if (handler?.onValidationError) {
        return handler.onValidationError(formatValidations(validationErrors))
      } else if (actions) {
        return actions.setFieldErrors(formatValidations(validationErrors))
      }
      return
    }

    if (res.errors?.[0].extensions?.code === "BAD_USER_INPUT") {
      if (handler?.onAppError) {
        return handler.onAppError(res.errors[0].message)
      }
      if (actions) {
        return actions.setAppError(res.errors[0].message)
      }
      if (toast) {
        return toast({ status: "error", description: res.errors[0].message })
      }
      return
    }
    if (res.errors?.[0].message) {
      if (handler?.onServerError) {
        return handler.onServerError(res.errors[0].message)
      } else if (toast) {
        // TODO: SENTRY
        return toast({
          status: "error",
          title: "Server error",
          description: "Please try again shortly! We have been notified.",
        })
      }
      return
    }
  } catch (e) {
    // TODO: SENTRY
    if (toast) {
      return toast({
        status: "error",
        title: "Server error",
        description: "Please try again shortly! We have been notified.",
      })
    }
  }
}

// export function useMutationHandler() {
//   const toast = useToast()
//   function handle<T>(
//     res: ExecutionResult<NonNullable<T>> | void,
//     actions?: MutationHandler<T>,
//     formActions?: {
//       setFieldErrors: (errors: ManualFieldError<any>[]) => void
//       setAppError: (message: any) => void
//     },
//   ) {
//     return mutationHandler(res, actions, toast, formActions)
//   }
//   return handle
// }
