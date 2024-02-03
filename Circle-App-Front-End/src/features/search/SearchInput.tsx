import { Box, Card, Input, Text } from "@chakra-ui/react"
import { SuggestedCard } from "../../components/SuggestedFollow"
import { useSelector } from "react-redux"
import { RootState } from "../../store/type/RootState"
import { User } from "../../types/User"
import useFollow from "../follow/hook/useFollow"
import { useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
export default function SearchInput() {
  return (
    <Box>
      <SearchList />
    </Box>
  )
}

export function SearchList() {
  const auth = useSelector((state: RootState) => state.auth)
  const [filter, setFilter] = useState("")
  const { User } = useFollow()
  const filteredUsers = User?.filter((user) => user.id !== auth.id)
  const [isFilterActive, setIsFilterActive] = useState(false)

  useEffect(() => {
    setIsFilterActive(true)
  })

  return (
    <Box>
      <Card
        w={{ base: "80%", md: "100%" }}
        p={2}
        bgColor={"#111"}
        boxShadow="lg"
        color={"white"}
        mt={20}
      >
        <Box
          position={"fixed"}
          padding={2}
          w={{ base: "80%", md: "45%" }}
          top={{ base: 100, md: 10 }}
          left={{ base: 100, md: 408 }}
          // bgColor={"#"}
          zIndex={1000}
          pt={1}
        >
          <Text mb={1} fontWeight={"bold"} fontSize={"xl"}>
            Search
          </Text>
          <Box
            w={{ base: "100%", md: "90%" }}
            ml={{ base: -2, md: 0 }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search"
              size="sm"
              border={"1px solid gray"}
              mt={2}
              p={4}
              borderBottom={"1px solid gray"}
              // w={"90%"}
              focusBorderColor="gray.400"
              color={"white"}
              boxShadow="lg"
              borderRadius={"9px"}
            />

            <Box position={"relative"} left={-31} bottom={-1}>
              <AiOutlineSearch size={22} />
            </Box>
          </Box>
        </Box>
        <Box className="follow" w="100%" h="screen" mt={10}>
          {isFilterActive &&
            filteredUsers
              ?.filter(
                (user) =>
                  user &&
                  (user.full_name?.toLowerCase().includes(filter) ||
                    user.username?.toLowerCase().includes(filter)),
              )
              .map((item: User) => (
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
