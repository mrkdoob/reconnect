import React from "react"
import { Router, Redirect, RouteComponentProps } from "@reach/router"

import { useMe } from "./providers/MeProvider"
import { Login } from "../pages/Login"

export const CheckAuth: React.FC = ({ children }) => {
  const me = useMe()

  return me ? (
    <>{children}</>
  ) : (
    <Router>
      <Login path="/" />
      <RedirectToLogin default={true} />
    </Router>
  )
}

const RedirectToLogin: React.FC<RouteComponentProps> = () => {
  return <Redirect noThrow to="/" />
}
