import { Entity, ManyToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import {
  UuidField,
  IntField,
  BooleanField,
  StringField,
} from "../shared/fields"
import { User } from "../user/user.entity"
import { Pet } from "../pet/pet.entity"
import { MAX_LIFES } from "../../lib/globalVars"

@ObjectType()
@Entity()
export class UserPet extends BaseEntity<UserPet> {
  @IntField({ default: MAX_LIFES })
  lifes: number

  @BooleanField({ default: true })
  isActive: boolean

  @BooleanField({ default: true })
  challengeActive: boolean

  //TODO: Remove nullable?
  @StringField({ nullable: true })
  petId: string

  @UuidField({ nullable: true })
  userId: string

  // RELATIONS
  @ManyToOne(
    () => User,
    user => user.userPets,
  )
  user: User

  @ManyToOne(
    () => Pet,
    pet => pet.userPets,
  )
  pet: Pet
}
