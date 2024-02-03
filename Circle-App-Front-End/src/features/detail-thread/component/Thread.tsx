import { Card, Flex, Box, Text, Avatar, Image } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { API } from "../../../libs/api"
import RepliesThreadForm from "./RepliesThread"

interface Data {
  id: number
  image: string
  content: string
  created_at: string
  userId: {
    username: string
    full_name: string
  }
}

export default function Thread() {
  const params = useParams()

  const { data: DetailThread, isLoading } = useQuery({
    queryKey: ["thread", params.id],
    queryFn: async () => {
      const { data } = await API.get(`/thread/${params.id}`)
      return data
    },
  })

  const created = new Date(DetailThread?.created_at)
  const formatDate = created.toLocaleString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div>
      {isLoading ? (
        <Box>Loading...</Box>
      ) : (
        <Box w={{ base: "115%", md: "100%" }}>
          <Card
            w={"full"}
            mb={2}
            p={{ base: 0, md: 6 }}
            boxShadow="xl"
            color={"white"}
            bgColor={"#111"}
          >
            <Flex>
              <Avatar
                name={DetailThread.createdById?.full_name}
                size={{ base: "sm", md: "md" }}
              />
              <Box ml={4} w={"full"} mt={3}>
                <Box>
                  <Text fontSize="xs" mr={2} fontWeight="bold">
                    {DetailThread.createdById
                      ? DetailThread.createdById.full_name
                      : "Nama tidak tersedia"}
                  </Text>
                  <Flex>
                    <Text fontSize="xs" mr={2} color="gray.400">
                      {DetailThread.createdById
                        ? `@${DetailThread.createdById.username}`
                        : ""}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      • {formatDate}
                    </Text>
                  </Flex>
                </Box>
                <Text fontSize="xl" mt={4}>
                  {DetailThread.content}
                </Text>
                {DetailThread.image && (
                  <Box>
                    <Image
                      src={DetailThread.image}
                      h={"50%"}
                      w={"50%"}
                      // mt={4}
                      objectFit={"cover"}
                      style={{ borderRadius: "5px" }}
                    />
                  </Box>
                )}
                <Box alignItems="center" mt={4}></Box>
              </Box>
            </Flex>
          </Card>
          <Box>
            <Box>
              <RepliesThreadForm />
            </Box>
            {/* Replies */}
            <Card p={4} bgColor={"#111"} boxShadow="xl" color={"white"}>
              <Text fontWeight={"bold"}>{DetailThread.replies?.length} Replies </Text>
              {DetailThread.replies?.map((item: Data) => (
                <Box key={item.id} p={4} boxShadow="xl">
                  <Flex gap={4}>
                    <Avatar
                      name={item.userId.full_name}
                      size={{ base: "sm", md: "md" }}
                    />
                    <Box mt={-2}>
                      <Box gap={4} mt={2}>
                        <Text fontSize={"14px"} fontWeight={"bold"}>
                          {item.userId.full_name}
                        </Text>
                        <Flex gap={1}>
                          <Text fontSize={"xs"} color="gray.400">
                            @{item.userId.username}
                          </Text>
                          <Text fontSize={"xs"} color="gray.400">
                            • {formatDate}
                          </Text>
                        </Flex>
                      </Box>
                      <Box
                        mt={4}
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"start"}
                        justifyContent={"center"}
                      >
                        <Text mb={2} fontSize={"16px"}>
                          {item.content}
                        </Text>
                        {item.image && (
                          <Box h={"100px"}>
                            <Image
                              src={item.image}
                              h={"full"}
                              w={"full"}
                              objectFit={"contain"}
                              style={{ borderRadius: "5px" }}
                            />
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Card>
          </Box>
        </Box>
      )}
    </div>
  )
}
