let env: string

const hostname = window?.location?.hostname
if (hostname === "becomebetter.life") {
  env = "production"
  console.log("Production")
} else {
  env = "development"
}

export const environment = env

export const production = env === "production"

export const apiUrl = production
  ? "https://reconnect-app-15.herokuapp.com/graphql"
  : "http://localhost:5555/graphql"

console.log("production: " + production)

export const webUrl = production
  ? "www.becomebetter.life"
  : "http://localhost:3000"
