let env: string

const hostname = window?.location?.hostname
if (hostname === "becomebetter.life") {
  env = "production"
} else {
  env = "development"
}

export const environment = env

export const production = env === "production"

export const apiUrl = production
  ? "https://reconnect-app-15.herokuapp.com/graphql"
  : "http://localhost:5555/graphql"

export const webUrl = production
  ? "https://reconnect.netlify.com"
  : "http://localhost:3000"
