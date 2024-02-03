import { Box, Card, Text, Avatar, Flex, Button } from "@chakra-ui/react"
import useFollow from "../../features/follow/hook/useFollow"
import { User } from "../../types/User"
import { useSelector } from "react-redux"
import { RootState } from "../../store/type/RootState"
import "../../assets/css/follow.css"
import { useEffect, useState } from "react"
import { follow } from "../../types/User"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "../../libs/api"
import { useDispatch } from "react-redux"
import { AUTH_CHECK } from "../../store/RootReducer"

interface IFollow {
  userId?: number
  id: number
  full_name?: string
  username?: string
  follow?: follow[]
}

export function SuggestedCard(props: IFollow) {
  const { full_name, username, id } = props
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)

  const [followId, setFollowId] = useState({
    followingId: id,
  })

  const queryClient = useQueryClient()

  const { mutate: handleFollow } = useMutation({
    mutationFn: () => {
      return API.post(`/follow`, followId)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      const response = await API.get("/auth/check")
      dispatch(AUTH_CHECK(response.data.user))
    },
    onError: (err) => {
      console.log(err)
    },
  })

  function handleClick() {
    setFollowId({ followingId: id })
    handleFollow()
  }

  const isFollowing = auth.following?.some((follow: follow) => follow.id === id)

  return (
    <Flex justifyContent="space-between" mb={2} alignItems={"center"}>
      <Box>
        <Flex key={id} alignItems={"center"}>
          <Avatar name={full_name} size={{ base: "sm", md: "md" }} />
          <Box ml={2}>
            <Text fontSize="xs" fontWeight={"bold"}>
              {full_name}
            </Text>
            <Text fontSize="xs" color={"gray.400"}>
              @{username}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box>
        <Box>
          {isFollowing ? (
            <Button
              onClick={handleClick}
              colorScheme="whatsapp"
              size="xs"
              rounded="full"
              variant="outline"
              mt={8}
              w="fit-content"
              opacity="70%"
              borderRadius={"5px"}
              p={2}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              onClick={handleClick}
              colorScheme="whatsapp"
              size="xs"
              rounded="full"
              variant="outline"
              mt={8}
              w="fit-content"
              borderRadius={"5px"}
            >
              Follow
            </Button>
          )}
        </Box>
      </Box>
    </Flex>
  )
}

function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length
  let temporaryValue: T, randomIndex: number

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export default function Suggested() {
  const auth = useSelector((state: RootState) => state.auth)
  const { User } = useFollow()
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([])

  useEffect(() => {
    if (User && User.length > 0 && suggestedUsers.length === 0) {
      const shuffledUsers = shuffleArray(User).filter(
        (user: { id: number }) => user.id !== auth.id,
      )
      const selectedUsers = shuffledUsers.slice(0, 3)
      setSuggestedUsers(selectedUsers)
    }
  }, [User, auth.id, suggestedUsers])

  return (
    <Box height={"70%"} marginTop={"-60px"}>
      <Card
        w="100%"
        p={6}
        bgColor={"#222"}
        boxShadow="lg"
        color={"white"}
        height={"103%"}
      >
        <Text mb={6} fontWeight={"bold"} fontSize={"xl"}>
          Suggested for you
        </Text>
        <Box className="follow" w="100%" overflowY="auto">
          {suggestedUsers.map((item) => (
            <SuggestedCard
              key={item.id}
              id={item.id}
              full_name={item.full_name}
              username={item.username}
            />
          ))}
        </Box>
      </Card>
    </Box>
  )
}
