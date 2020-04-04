import React from "react"
import { RouteComponentProps } from "@reach/router"

import { Page } from "../components/Page"
import gql from "graphql-tag.macro"
import {
  CourseLevelFragmentDoc,
  MyProgressFragmentDoc,
  useMyProgressQuery,
  MyCourseProgressFragmentDoc,
  MyLevelProgressFragmentDoc,
} from "../lib/graphql"
import { CourseLevelList } from "../components/CourseLevelList"

export const MY_PROGRESS_FRAGMENT = gql`
  fragment MyProgress on User {
    id
    userLevel {
      ...MyLevelProgress
    }
    userCourse {
      id
      isActive
      course {
        ...MyCourseProgress
      }
    }
  }
  ${MyLevelProgressFragmentDoc}
  ${MyCourseProgressFragmentDoc}
`

export const MY_COURSE_PROGRESS_FRAGMENT = gql`
  fragment MyCourseProgress on Course {
    id
    levels {
      ...CourseLevel
    }
  }
  ${CourseLevelFragmentDoc}
`

export const MY_LEVEL_PROGRESS_FRAGMENT = gql`
  fragment MyLevelProgress on UserLevel {
    id
    progressDay
    completed
    level {
      id
      levelNumber
    }
  }
`

export const GET_MY_PROGRESS = gql`
  query MyProgress {
    me {
      ...MyProgress
    }
  }
  ${MyProgressFragmentDoc}
`

interface Props extends RouteComponentProps<{ levelId: string }> {}

export const Progress: React.FC<Props> = props => {
  const { data, loading } = useMyProgressQuery()
  const myProgress = data?.me

  const activeCourse = myProgress?.userCourse?.find(uc => uc.isActive)?.course

  return (
    <Page loading={loading}>
      {activeCourse && (
        <CourseLevelList
          course={activeCourse}
          userLevel={myProgress?.userLevel}
        />
      )}
    </Page>
  )
}
