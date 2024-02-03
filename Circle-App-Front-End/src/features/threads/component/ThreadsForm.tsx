import { Box, Text, Avatar, Input, Flex, Button } from "@chakra-ui/react"
import { BiImageAdd } from "react-icons/bi"
// import { useThreads } from '../hooks/useThreads';
import { useThread } from "../hooks/useThread"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/type/RootState"
import { Link } from "react-router-dom"

export default function ThreadsForm() {
  // const { handlePost, handleChange, fileInputRef, handleButtonClick, isPending, form } = useThreads();
  const auth = useSelector((state: RootState) => state.auth)

  const { handleChange, handleButtonClick, fileInputRef, mutate, isPending, form } =
    useThread()
  return (
    <Box
      position={{ base: "relative", md: "fixed" }}
      top={0}
      pt={{ base: 5, md: 5 }}
      p={3}
      zIndex={"10000"}
      bgColor={"#111"}
      w={{ base: "50%", md: "47%" }}
      marginBottom={-20}
    >
      <Box mb={4}>
        <Link to="/">
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            color={"white"}
            _hover={{ color: "whatsapp.500" }}
            transitionDuration={"0.3s"}
          >
            Home
          </Text>
        </Link>
      </Box>

      <form
        onSubmit={(e) => {
          e.preventDefault(), mutate()
        }}
        encType="multipart/form-data"
      >
        <Flex mb={4} alignItems="center" justifyContent={"space-between"} p={2} ml={-18}>
          <Box display={"flex"} gap={4} w={"70%"}>
            <Avatar name={auth?.full_name} size={{ base: "sm", md: "md" }} />
            <Box w={"full"} borderBottom={"1px solid gray"} mb={1}>
              <Input
                placeholder="What is happening?!"
                size="sm"
                border={"none"}
                onChange={handleChange}
                name="content"
                value={form.content}
                color={"white"}
                mt={2}
              />
            </Box>
            <Input
              placeholder="Image"
              size="sm"
              border={"none"}
              name="image"
              onChange={handleChange}
              type="file"
              ref={fileInputRef}
              value={""}
              hidden
              bgColor={"white"}
            />
          </Box>

          <Box>
            <Box ml={-40} display={"flex"} gap={2}>
              <Button onClick={handleButtonClick}>
                <BiImageAdd size={20} />
              </Button>
              <Button
                bgColor={"#008000"}
                _hover={{ bgColor: "#75b939", color: "white" }}
                type="submit"
                isLoading={isPending}
              >
                Post
              </Button>
            </Box>
          </Box>
        </Flex>
      </form>
    </Box>
  )
}
