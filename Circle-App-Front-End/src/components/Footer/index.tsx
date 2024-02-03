import { Box, Flex, Text, Card, Image } from "@chakra-ui/react"
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai"
import { BsFacebook } from "react-icons/bs"
import Logo from "../../assets/logohaeader.png"

export default function Footer() {
  return (
    <Box>
      <Card marginTop={"-140px"} p={8} bgColor={"#222"} boxShadow="lg" color={"white"}>
        <Box>
          <Flex>
            <Text fontSize="xs" mr={4} fontWeight={"bold"}>
              Develop Tajul
            </Text>
            <Flex gap={2}>
              <AiFillGithub />
              <BsFacebook />
              <AiFillLinkedin />
              {/* <AiFillInstagram /> */}
            </Flex>
          </Flex>
          <Box display={"flex"} alignItems={"center"}>
            <Text color={"white"} fontSize={"xs"} textTransform={"capitalize"} mr={"1"}>
              powered by
            </Text>
            <Image boxSize="15px" objectFit="cover" src={Logo} alt="Dan Abramov" />
            <Text color={"white"} fontSize={"xs"} textTransform={"capitalize"} ms={"1"}>
              Dumbways Indonesia . #1CodingBootCamp
            </Text>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}
