import React from "react"
import {
  Box,
  Flex,
  Text,
  Spinner,
  Button,
  FlexProps,
  useToast,
} from "@chakra-ui/core"
import { ArrowSortedDown } from "@styled-icons/typicons/ArrowSortedDown"
import { ArrowSortedUp } from "@styled-icons/typicons/ArrowSortedUp"
import { Center } from "./Center"

interface DataType {
  id: string
}
interface Props<T extends DataType> {
  loading: boolean
  children: React.ReactNode
  count?: number
  data?: T[]
  onFetchMore?: () => Promise<any> | void | undefined
  noData?: string
  onSort?: (settings: { order: string; orderBy: string }) => void
  sort?: {
    order: string
    orderBy: string
  }
}

export function Table<T extends DataType>(props: Props<T>) {
  const columns = React.Children.map(
    props.children as any,
    (child: React.ReactElement<ColumnProps<T>>) => child.props,
  )
  const data = props.data || []
  const toast = useToast()
  const handleFetchMore = async () => {
    if (!props.onFetchMore) return
    try {
      await props.onFetchMore()
    } catch {
      toast({ status: "error", description: "Error fetching more" })
    }
  }
  return (
    <Box my={6}>
      <Flex borderBottom="1px solid" borderColor="gray.200" py={1} px={4}>
        {columns.map((column: ColumnProps<T>, i) => (
          <Flex
            key={i.toString()}
            flex={1}
            p={1}
            pr={4}
            overflow="hidden"
            justifyContent={
              i === columns.length - 1 ? "flex-end" : "flex-start"
            }
            {...column}
          >
            {column.header && (
              <Button
                as={
                  props.sort && props.onSort && column.sortKey
                    ? "button"
                    : "div"
                }
                display="flex"
                variant="unstyled"
                alignItems="center"
                minW="auto"
                fontSize="0.9rem"
                color="gray.900"
                fontWeight={
                  props.sort?.orderBy === column.sortKey ? "semibold" : "normal"
                }
                cursor={
                  props.sort && props.onSort && column.sortKey
                    ? "pointer"
                    : "default"
                }
                onClick={() =>
                  props.sort && props.onSort && column.sortKey
                    ? props.onSort({
                        order: props.sort.order === "DESC" ? "ASC" : "DESC",
                        orderBy: column.sortKey,
                      })
                    : {}
                }
              >
                {column.header}
                {props.sort && props.onSort && !!column.sortKey && (
                  <Flex ml={2} flexDir="column" align="center">
                    <Box
                      as={ArrowSortedUp}
                      size="16px"
                      m="-4px"
                      color={
                        props.sort.orderBy === column.sortKey &&
                        props.sort.order === "ASC"
                          ? "gray.600"
                          : "gray.400"
                      }
                    />
                    <Box
                      as={ArrowSortedDown}
                      size="16px"
                      m="-4px"
                      color={
                        props.sort.orderBy === column.sortKey &&
                        props.sort.order === "DESC"
                          ? "gray.600"
                          : "gray.400"
                      }
                    />
                  </Flex>
                )}
              </Button>
            )}
          </Flex>
        ))}
      </Flex>

      {props.loading ? (
        <Center p={10}>
          <Spinner />
        </Center>
      ) : data.length > 0 ? (
        <Box minH="100px">
          {data.map(item => (
            <React.Fragment key={item.id}>
              <Flex w="100%" align="center" px={4}>
                {columns.map((column: ColumnProps<T>, i) => (
                  <Flex
                    key={i.toString()}
                    flex={1}
                    p={1}
                    pr={4}
                    isTruncated
                    fontSize="0.9rem"
                    justify={
                      i === columns.length - 1 ? "flex-end" : "flex-start"
                    }
                    {...column}
                  >
                    {column.row?.(item)}
                  </Flex>
                ))}
              </Flex>
              <Box borderBottom="1px solid" borderColor="gray.200" />
            </React.Fragment>
          ))}
          <Flex align="center" justify="space-between" p={4}>
            {!!props.count && (
              <Text color="gray.700" fontSize="0.8rem">
                {props.count} results
              </Text>
            )}
            {!!props.onFetchMore &&
              !!props.count &&
              props.count > 20 &&
              props.data?.length !== props.count && (
                <Button size="sm" onClick={handleFetchMore}>
                  Show more
                </Button>
              )}
          </Flex>
        </Box>
      ) : (
        <Center p={10}>
          <Text color="gray.600">{props.noData || "No data yet"}</Text>
        </Center>
      )}
    </Box>
  )
}

interface ColumnProps<T> extends FlexProps {
  row: (item: T) => React.ReactNode
  sortKey?: string
  header?: React.ReactNode
}

export function Column<T extends DataType>(_: ColumnProps<T>) {
  return null
}
