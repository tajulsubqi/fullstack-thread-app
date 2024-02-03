import { Card, CardBody, Image, Text, Flex, Box, Button, Avatar } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/type/RootState"
import { Link } from "react-router-dom"
import ThreadCard from "../../features/threads/component/ThreadCard"
import { IThreadCard } from "../../types/Threads"
import { useThreads } from "../../features/threads/hooks/useThreads"
import { useEffect } from "react"

export default function MyProfile() {
  const auth = useSelector((state: RootState) => state.auth)
  const { Threads } = useThreads()

  const usernameUser = auth?.username?.replace(/\s/g, "")

  const userThreads = Threads?.filter((thread) => thread.createdById?.id === auth?.id)

  useEffect(() => {}, [Threads])
  return (
    <Box w={{ base: "115%", md: "100%", bgroundColor: "#222" }}>
      <Card w={"full"} bgColor={"#222"} mt={"-35px"} boxShadow="lg" color={"white"}>
        <CardBody w={"full"}>
          <Box
            h="100px"
            w={{ base: "115%", md: "100%" }}
            left={{ base: -6, md: 0 }}
            position="relative"
          >
            <Box position="absolute" top="60px" left="280px">
              <Avatar name={auth?.full_name} border="2px solid #FFFADD" size="2xl" />
            </Box>
            <Image
              src="https://i.pinimg.com/564x/a9/80/22/a98022cdb8b339e11542132b6428ac92.jpg"
              objectFit={"cover"}
              borderRadius="lg"
              h="130%"
              w="100%"
            />
          </Box>
          <Box
            w="100%"
            display={"flex"}
            alignItems={"end"}
            justifyContent={"end"}
            mt={10}
          >
            <Link to="/edit-profile">
              <Button
                colorScheme="whatsapp"
                variant="outline"
                size="sm"
                style={{ borderRadius: "1100px" }}
                p={3}
              >
                Edit Profile
              </Button>
            </Link>
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight={"bold"}>
              {auth?.full_name}
            </Text>
            <Text fontSize="xs" color="gray.400">
              @{usernameUser}
            </Text>
            <Text fontSize="xs">{auth?.bio}</Text>
            <Flex gap={6} mt={4}>
              <Flex gap={1}>
                <Text fontSize="xs" fontWeight={"bold"}>
                  {userThreads?.length}
                </Text>
                <Text fontSize="xs"> Threads</Text>
              </Flex>
              <Flex gap={1}>
                <Text fontSize="xs" fontWeight={"bold"}>
                  {auth?.following?.length}
                </Text>
                <Text fontSize="xs"> Following</Text>
              </Flex>
              <Flex gap={1}>
                <Text fontSize="xs" fontWeight={"bold"}>
                  {auth?.followers?.length}
                </Text>
                <Text fontSize="xs"> Followers</Text>
              </Flex>
            </Flex>
          </Box>
        </CardBody>
      </Card>
      <Box marginTop={10} width={{ base: "87%", md: "100%", background: "#111;" }}>
        <Box>
          <Text color={"white"} fontSize="xl" fontWeight={"bold"}>
            Your threads
          </Text>
          <Text fontSize="xs" color="gray.400">
            {userThreads?.length} Threads
          </Text>
        </Box>
        {userThreads?.map((item: IThreadCard) => (
          <ThreadCard
            key={item.id}
            id={item.id}
            full_name={item.createdById?.full_name}
            username={usernameUser}
            created_at={item.created_at ?? ""}
            content={item.content}
            image={item.image}
            replies={item.replies}
            likes={item.likes}
          />
        ))}
      </Box>
    </Box>
  )
}
