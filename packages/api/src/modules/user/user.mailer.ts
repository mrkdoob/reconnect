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
      // templateId: "d-ba08db2f63594c2a80ae5869cf16f48d",
      to: user.email,
      data: {
        subject: `Welcome to Become!`,
        html: `<p>Hi ${user.firstName}, </p></br> <p>Thank you for your registration!<p>`,
      },
    })
  }

  sendResetPasswordLink(user: User, token: string) {
    if (!user.email) return

    this.mailer.send({
      to: user.email,
      data: {
        subject: `Reset your Become password`,
        html: `<p>Hi ${
          user.firstName
        }, </p></br> <p>Reset your password at ${FULL_WEB_URL()}/reset-password/${token}</p>`,
      },
    })
  }
}
