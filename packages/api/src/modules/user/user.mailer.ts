import { Service } from "typedi"
import { FULL_WEB_URL } from "../../lib/config"
import { User } from "./user.entity"
import { Mailer } from "../../lib/mailer"

@Service()
export class UserMailer {
  constructor(private readonly mailer: Mailer) {}

  sendWelcomeEmail(user: User) {
    if (!user.email) return
    this.mailer.send({
      templateId: "d-ba08db2f63594c2a80ae5869cf16f48d",
      to: user.email,
      variables: {
        firstName: user.firstName,
      },
    })
  }

  sendResetPasswordLink(user: User, token: string) {
    if (!user.email) return
    this.mailer.send({
      templateId: "d-ef3598195e6c4d5d889e9e45585ed1a2",
      to: user.email,
      variables: {
        link: `${FULL_WEB_URL()}/reset-password?token=${token}`,
      },
    })
  }
}
