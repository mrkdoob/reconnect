import { Entity, OneToMany, ManyToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { StringField, IntField, UuidField } from "../shared/fields"
import { UserPet } from "../userPet/userPet.entity"
import { User } from "../user/user.entity"

@ObjectType()
@Entity()
export class Pet extends BaseEntity<Pet> {
  @StringField()
  name: string

  @StringField({ nullable: true })
  description: string

  @IntField()
  levelNumber: number

  @StringField()
  avatarUrl: string

  @UuidField({ nullable: true })
  createdBy: string

  // RELATIONS

  @OneToMany(
    () => UserPet,
    userPet => userPet.pet,
  )
  userPets: UserPet[]

  @ManyToOne(
    () => User,
    user => user.petsCreated,
  )
  user: User
}
