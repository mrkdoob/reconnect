import React from "react"
import { RouteComponentProps } from "@reach/router"

import { Page } from "../components/Page"
import gql from "graphql-tag.macro"

import {
  Flex,
  Image,
  Box,
  Button,
  Text,
  FormLabel,
  useDisclosure,
  IconButton,
} from "@chakra-ui/core"

import {
  useMySettingsQuery,
  MySettingsFragmentDoc,
  useUpdateSettingsMutation,
  UpdateInput,
} from "../lib/graphql"
import { Form } from "../components/Form"
import { useForm } from "../lib/hooks/useForm"
import Yup from "../lib/yup"
import { Input } from "../components/Input"
import { styled } from "../components/providers/ThemeProvider"
import { useToast } from "../lib/hooks/useToast"
import { NewAvatar } from "../components/NewAvatar"
import { Modal } from "../components/Modal"
import { User } from "styled-icons/boxicons-regular/User"

export const MYSETTINGS_FRAGMENT = gql`
  fragment MySettings on User {
    id
    firstName
    lastName
    email
    avatar
    groupId
    userGroupMessage {
      id
      showOption
    }
  }
`

export const GET_MY_SETTINGS = gql`
  query MySettings {
    me {
      ...MySettings
    }
  }
  ${MySettingsFragmentDoc}
`

export const UPDATE_SETTINGS = gql`
  mutation UpdateSettings($data: UpdateInput!) {
    updateMe(data: $data) {
      ...MySettings
    }
  }
  ${MySettingsFragmentDoc}
`

const SettingsSchema = Yup.object().shape<UpdateInput>({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  // password: Yup.string().min(6, "Must be at least 6 characters"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
})

interface Props extends RouteComponentProps {}

export const Settings: React.FC<Props> = props => {
  const { data, loading } = useMySettingsQuery({
    fetchPolicy: "cache-and-network",
  })
  const settings = data?.me

  // TODO: Add or remove?
  // const [showOptionState, setShowOptionState] = useState(false)
  // const showOption = settings?.userGroupMessage?.showOption || false
  // React.useEffect(() => {
  //   setShowOptionState(showOption)
  // }, [showOption])

  const { isOpen, onClose, onOpen } = useDisclosure()

  const form = useForm({ validationSchema: SettingsSchema })
  const [updateSettings] = useUpdateSettingsMutation()
  const toast = useToast()
  // const [updateUserGroupMessage] = useUpdateUserGroupMessageMutation()

  const onSubmit = async (values: UpdateInput) => {
    const res = await updateSettings({
      variables: { data: values },
    })
    return form.handler(res, {
      onSuccess: () => {
        toast({
          title: "Saved!",
          description: "Your settings are updated",
          status: "success",
        })
        form.reset(values)
      },
    })
  }

  // TODO: Add or remove?
  // const handleUpdate = async () => {
  //   if (!settings?.userGroupMessage) return
  //   const res = await updateUserGroupMessage({
  //     variables: {
  //       userGroupMessageId: settings.userGroupMessage.id,
  //       data: { showOption: !showOptionState },
  //     },
  //   }).catch(() => null)
  //   return mutationHandler(res, undefined, undefined, toast)
  // }

  return (
    <Page loading={loading} title="Settings">
      <Flex justify="flex-start" direction="column" align="center" w="100%">
        <StyledTile
          w={{ base: "100%", md: 450 }}
          borderRadius="xl"
          backgroundColor="gray.50"
          p={{ base: 8, md: 12 }}
          align="center"
          direction="column"
        >
          <Box position="relative" mb={12}>
            {settings?.avatar ? (
              <StyledImage
                borderRadius="xl"
                size="150px"
                src={settings?.avatar || ""}
                alt={settings?.firstName}
                objectFit="cover"
                onClick={onOpen}
              />
            ) : (
              <StyledTile
                as={User}
                w="150px"
                borderRadius="xl"
                border="1px solid gray"
                color="gray.300"
              />
            )}
            <IconButton
              pos="absolute"
              bottom={0}
              size="sm"
              isLoading={loading}
              isDisabled={loading}
              right={0}
              icon="edit"
              variantColor="blue"
              aria-label="Edit profile picture"
              onClick={onOpen}
            />
          </Box>
          <Modal
            size="md"
            isOpen={isOpen}
            title="New profile picture"
            onClose={onClose}
          >
            <NewAvatar onClose={onClose} />
          </Modal>

          <Form {...form} onSubmit={onSubmit}>
            <Input
              name="firstName"
              label="First name"
              defaultValue={settings?.firstName}
            />
            <Input
              name="lastName"
              label="Last name"
              defaultValue={settings?.lastName}
            />
            <Input name="email" label="Email" defaultValue={settings?.email} />
            {/* <Flex align="center" justify="space-between" mt={6}> */}
            {/* <FormLabel htmlFor="email-alerts">
                Show daily group summary?
              </FormLabel> */}
            {/* TODO: Add or remove? <Switch
                id="email-alerts"
                isChecked={showOptionState}
                onChange={() => {
                  setShowOptionState(!showOptionState)
                  handleUpdate()
                }}
              /> */}
            {/* </Flex> */}
            <Flex
              justify="space-between"
              direction="row-reverse"
              align="center"
              mt={6}
            >
              {form.appError && <Text color="red.500">{form.appError}</Text>}{" "}
              <Button
                variantColor="blue"
                type="submit"
                loadingText="loading"
                isLoading={form.formState.isSubmitting}
              >
                Save
              </Button>
            </Flex>
          </Form>
        </StyledTile>
      </Flex>
    </Page>
  )
}

const StyledTile = styled(Flex)`
  border-top: 3px solid ${p => p.theme.colors.blue[400]};
  border-left: 3px solid ${p => p.theme.colors.blue[200]};
  border-right: 3px solid ${p => p.theme.colors.green[100]};
  border-bottom: 3px solid ${p => p.theme.colors.green[400]};
`

const StyledImage = styled(Image)`
  border-top: 3px solid ${p => p.theme.colors.blue[400]};
  border-left: 3px solid ${p => p.theme.colors.blue[200]};
  border-right: 3px solid ${p => p.theme.colors.green[100]};
  border-bottom: 3px solid ${p => p.theme.colors.green[400]};
`
