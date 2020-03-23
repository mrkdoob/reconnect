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

export const formatFileName = (filename: string) => {
  const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-")
  return cleanFileName
}

export function convertToNumber(string?: string | number | null): number {
  if (!string) return 0
  try {
    return +string
  } catch {
    return 0
  }
}

export function nullifyEmpty<T extends { [key: string]: any }>(values: T): T {
  return Object.entries(values).reduce((acc, [key, value]) => {
    acc[key] = value || null
    return acc
  }, {} as any)
}
