import { Entity, OneToMany } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { StringField, IntField } from "../shared/fields"
import { UserPet } from "../userPet/userPet.entity"

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
  pictureUrl: string

  @StringField()
  avatarUrl: string

  // RELATIONS

  @OneToMany(
    () => UserPet,
    userPet => userPet.pet,
  )
  userPets: UserPet[]
}
