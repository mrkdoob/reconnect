import React from "react"
import {
  Link,
  Stack,
  Button,
  Text,
  Icon,
  Flex,
  Box,
  Collapse,
  Image,
} from "@chakra-ui/core"
import { Link as RLink, Match } from "@reach/router"

import { useLogout } from "../lib/hooks/useLogout"
import { styled } from "./providers/ThemeProvider"
import { useToggle } from "../lib/hooks/useToggle"

import { Menu } from "styled-icons/boxicons-regular/Menu"
import { Close } from "styled-icons/material/Close"
import { useMe } from "./providers/MeProvider"
import { User } from "styled-icons/boxicons-regular/User"
import { Home } from "styled-icons/boxicons-regular/Home"
import { Book } from "styled-icons/boxicons-regular/Book"

export const Navbar: React.FC = () => {
  const me = useMe()
  const [menuOpen, toggleMenu] = useToggle({ default: false })
  const [userMenuOpen, toggleUserMenu] = useToggle({ default: false })

  const logout = useLogout()

  return (
    <>
      <StyledSidebar
        p={{ base: 2, lg: 3 }}
        display={{ base: "none", md: "flex" }}
      >
        <Image
          src="https://cdn.dribbble.com/users/60166/screenshots/6352895/new_wave.jpg"
          h={12}
          w={16}
        />

        {/* Md+ */}
        <Flex align="center" justify="space-between" w={me ? "10rem" : "15rem"}>
          {!me ? (
            <>
              <NavLink to="/courses">
                <Text>Courses</Text>
              </NavLink>
              <NavLink to="/login">
                <Button variant="link" color="gray.400">
                  <Text>Log in</Text>
                </Button>
              </NavLink>
              <NavLink to="/register">
                <Button variant="link" color="gray.400">
                  <Text>Sign up</Text>
                </Button>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/">
                <Box cursor="pointer" as={Home} h={8} color="gray.300" />
              </NavLink>
              <NavLink to="/mylevelreward">
                <Box as={Book} h={8} color="gray.300" />
              </NavLink>
            </>
          )}
          {me?.avatar && me.avatar ? (
            <Image
              src={me.avatar}
              size="40px"
              rounded="full"
              onClick={toggleUserMenu}
              objectFit="cover"
              cursor="pointer"
            />
          ) : (
            me && (
              <Box
                cursor="pointer"
                onClick={toggleUserMenu}
                as={User}
                h={8}
                color="gray.300"
              />
            )
          )}
        </Flex>
      </StyledSidebar>
      <Collapse
        as={Flex}
        isOpen={userMenuOpen}
        alignItems="center"
        position="fixed"
        top="60px"
        right="0"
        bg="white"
        zIndex={999}
        borderRadius="lg"
      >
        <StyledStack
          p={6}
          spacing={6}
          fontWeight="bold"
          align="flex-start"
          borderRadius="lg"
        >
          <Text onClick={toggleUserMenu}>
            <NavLink to="/progress">My progress</NavLink>
          </Text>
          <Text onClick={toggleUserMenu}>
            <NavLink to="/courses">Courses</NavLink>
          </Text>
          <Text onClick={toggleUserMenu}>
            <NavLink to="/settings">Settings</NavLink>
          </Text>

          <Button
            variant="link"
            onClick={() => {
              logout()
              toggleUserMenu()
            }}
            color="gray.400"
          >
            <Icon name="external-link" mr={{ base: 0, lg: 2 }} />
            <Text>Logout</Text>
          </Button>
        </StyledStack>
      </Collapse>

      {/* Mobile screen */}
      <StyledSidebar display={{ base: "flex", lg: "none" }} p={4}>
        <Text>Reconnect</Text>
        <Box as={menuOpen ? Close : Menu} h={8} onClick={toggleMenu} />
      </StyledSidebar>
      <Collapse
        as={Flex}
        isOpen={menuOpen}
        h="calc(100vh - 60px)"
        w="100vw"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        top="60px"
        left="0"
        bg="white"
        zIndex={999}
      >
        {me ? (
          <Stack spacing={12} fontWeight="bold" fontSize="xl" align="center">
            <Text onClick={toggleMenu}>
              <NavLink to="/">Dashboard </NavLink>
            </Text>
            <Text onClick={toggleMenu}>
              <NavLink to={`/levelreward/${me?.userLevel?.levelId}`}>
                Current lesson
              </NavLink>
            </Text>
            <Text onClick={toggleMenu}>
              <NavLink to="/courses">Courses</NavLink>
            </Text>
            <Text onClick={toggleMenu}>
              <NavLink to="/progress">My progress</NavLink>
            </Text>
            <Text onClick={toggleMenu}>
              <NavLink to="/settings">Settings</NavLink>
            </Text>
            <Button
              variant="link"
              onClick={logout && toggleMenu}
              color="gray.400"
            >
              <Icon name="external-link" mr={{ base: 0, lg: 2 }} />
              <Text>Logout</Text>
            </Button>
          </Stack>
        ) : (
          <Stack spacing={12} fontWeight="bold" fontSize="xl" align="center">
            <Text onClick={toggleMenu}>
              <NavLink to="/courses">Courses</NavLink>
            </Text>
            <Text onClick={toggleMenu}>
              <NavLink to="/login">Log in </NavLink>
            </Text>
            <Text onClick={toggleMenu}>
              <NavLink to="/register">Sign up </NavLink>
            </Text>
          </Stack>
        )}
      </Collapse>
    </>
  )
}

const StyledSidebar = styled(Flex)`
  position: fixed;
  left: 0;
  top: 0;
  height: 60px;
  width: 100vw;
  justify-content: space-between;
  align-items: center;
  background-color: ${p => p.theme.colors.white};
  font-weight: ${p => p.theme.fontWeights.semibold};
  z-index: ${p => p.theme.zIndices.sticky};
  border-bottom: 1px solid ${p => p.theme.colors.gray[100]};
`

const StyledStack = styled(Stack)`
  border: 1px solid ${p => p.theme.colors.gray[100]};
  border-top: 0;
`

const NavLink: React.FC<{ to: string }> = ({ to, children }) => {
  return (
    <Match path={to}>
      {() => (
        // eslint-disable-next-line
        // @ts-ignore
        <Link as={RLink} to={to} display="flex" alignItems="center">
          {children}
        </Link>
      )}
    </Match>
  )
}
