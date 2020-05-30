import React from "react"
import {
  useToast,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/core"

import {
  OptionItemFragmentDoc,
  useGetOptionsQuery,
  OptionItemFragment,
  useUpdateOptionMutation,
  LevelTaskOptionItemFragmentDoc,
  useUpdateLevelTaskOptionMutation,
  useCreateLevelTaskOptionMutation,
  GetLevelTasksDocument,
} from "../lib/graphql"
import { Table, Column } from "./Table"
import gql from "graphql-tag.macro"
import { Tag } from "./Tag"
import { mutationHandler } from "../lib/mutationHandler"

export const GET_OPTIONS = gql`
  query GetOptions {
    getAllOptions {
      ...OptionItem
    }
  }
  ${OptionItemFragmentDoc}
`

export const UPDATE_LEVELTASK_OPTION = gql`
  mutation UpdateLevelTaskOption(
    $levelTaskOptionId: String!
    $data: UpdateLevelTaskOptionInput!
  ) {
    updateLevelTaskOption(levelTaskOptionId: $levelTaskOptionId, data: $data) {
      ...LevelTaskOptionItem
    }
  }
  ${LevelTaskOptionItemFragmentDoc}
`

interface Props {
  onClose: () => void
  levelTaskId: string
  levelId?: string | null
  order?: number
}

type I = OptionItemFragment

export const CourseLevelTaskOptions: React.FC<Props> = props => {
  const toast = useToast()
  const [createTaskOption] = useCreateLevelTaskOptionMutation({
    refetchQueries: [
      { query: GetLevelTasksDocument, variables: { levelId: props.levelId } },
    ],
  })

  const handleSubmit = async (optionId: string) => {
    const res = await createTaskOption({
      variables: {
        data: {
          optionId,
          levelTaskId: props.levelTaskId,
          order: props.order ? props.order : 1,
        },
      },
    })

    mutationHandler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          description: "Added!",
        })
        props.onClose()
      },
    })
  }

  const { data, loading } = useGetOptionsQuery()

  const options = data?.getAllOptions
  const officialOptions = options?.filter(o => o.createdByAdmin === true)
  const createdByUsersOptions = options?.filter(o => o.createdByAdmin === false)

  return (
    <>
      <Tabs variantColor="green">
        <TabList>
          <Tab>Official</Tab>
          <Tab>User created</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Table
              loading={loading}
              noData="No options have been created yet"
              data={officialOptions}
            >
              <Column<I>
                header="Title"
                row={option => (
                  <Text
                    cursor="pointer"
                    onClick={() => handleSubmit(option.id)}
                  >
                    {option.description}
                  </Text>
                )}
              />
              <Column<I>
                row={option => (
                  <>
                    {option.label.split(",").map(label => (
                      <Tag ml={4}>{label}</Tag>
                    ))}
                  </>
                )}
              />
            </Table>
          </TabPanel>
          <TabPanel>
            <Table
              loading={loading}
              noData="No options have been created yet"
              data={createdByUsersOptions}
            >
              <Column<I>
                header="Title"
                row={option => (
                  <Text
                    cursor="pointer"
                    onClick={() => handleSubmit(option.id)}
                  >
                    {option.description}
                  </Text>
                )}
              />
              <Column<I>
                row={option => (
                  <>
                    {option.label.split(",").map(label => (
                      <Tag ml={4}>{label}</Tag>
                    ))}
                  </>
                )}
              />
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
