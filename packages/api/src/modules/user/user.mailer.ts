import { Service, Inject } from "typedi"
import { FULL_WEB_URL } from "../../lib/config"
import { User } from "./user.entity"
import { Mailer } from "../../lib/mailer"
import { UserBoosterRepository } from "../userBooster/userBooster.repository"
import { UserRepository } from "./user.repository"

@Service()
export class UserMailer {
  constructor(private readonly mailer: Mailer) {}
  @Inject(() => UserBoosterRepository)
  userBoosterRepository: UserBoosterRepository
  @Inject(() => UserRepository)
  userRepository: UserRepository

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

  sendEndOfCourseByFailureEmail(user: User) {
    if (!user.email) return
    this.mailer.send({
      to: user.email,
      data: {
        subject: `Oh no! You have lost your course progress`,
        html: `<p>Hi ${user.firstName}, </p></br> <p>Unfortunately, you have been idle for too long and are out of retry attempts.</p>
        <p>You can try the program again whenever you like.</p>`,
      },
    })
  }

  // TODO: Make better mail
  sendRetryLevelEmail(user: User, retries: number) {
    if (!user.email) return
    this.mailer.send({
      to: user.email,
      data: {
        subject: `Oh no! You have lost your level progress`,
        html: `<p>Hi ${user.firstName}, </p></br> <p>Unfortunately, you have run out of lifes.</p>
        <p>You have ${retries} retry left.</p>`,
      },
    })
  }

  // TODO: Make better
  sendCoachingEmail(user: User) {
    if (!user.email) return
    this.mailer.send({
      to: user.email,
      data: {
        subject: `Need help?`,
        html: `<p>Hi ${user.firstName}, </p></br> <p>I have noticed that you have fallen behind.</p>
        <p>If you need any help or tips, please let me know. I believe you can do it!</p>`,
      },
    })
  }

  // TODO: Make dynamic
  async sendSponsorInviteEmail(boosterId: string) {
    const booster = await this.userBoosterRepository.findById(
      boosterId /* TODO: Debug {
      relations: ["user"],
    }*/,
    )
    const user = await this.userRepository.findById(booster.userId)

    if (!booster.sponsorEmail) return
    this.mailer.send({
      to: booster.sponsorEmail,
      data: {
        subject: `Sponsor ${user.firstName}`,
        html: `<p>Hi!</p></br> <p>${user.firstName} would like you to sponsor him/her during his challenge on the Become platform.</p>
        <p>It would be great if you can donate ${booster.sponsorAmount} euro to the Isha foundation when ${user.firstName} has completed his challenge.</p>
        <p>Please <a href="https://www.becomebetter.life/sponsor/${booster.id}">click here</a> if you would like to sponsor.</p>
        </br><p>With joy,</p>
        <p>The Become team</p>`,
      },
    })
  }

  async sendSponsorCompleteEmail(boosterId: string) {
    const booster = await this.userBoosterRepository.findById(boosterId)
    const user = await this.userRepository.findById(booster.userId)

    if (!booster.sponsorEmail) return
    this.mailer.send({
      to: booster.sponsorEmail,
      data: {
        subject: `${user.firstName} has completed his challenge!`,
        html: `<p>Hi!</p></br> <p>${user.firstName}has completed his/her challenge on the Become platform.</p>
        <p>It would be great if you can donate ${booster.sponsorAmount} euro to the <a href="https://www.ishaoutreach.org/en/action-rural-rejuvenation/project/corona-relief">Isha Outreach</a></p>.
        <p><a href="https://www.ishaoutreach.org/en/action-rural-rejuvenation/project/corona-relief">https://www.ishaoutreach.org/en/action-rural-rejuvenation/project/corona-relief</a></p>
        </br><p>With joy,</p>
        <p>The Become team</p>`,
      },
    })
  }
}
