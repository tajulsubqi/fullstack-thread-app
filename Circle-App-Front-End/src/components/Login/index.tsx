import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Box,
  Text,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  IconButton,
  Flex,
} from "@chakra-ui/react"
import { useState } from "react"
import { useLogin } from "./hook/useLogin"
import { Link } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function LoginCard() {
  const { handleChange, handleLogin } = useLogin()
  const [showPassword, setShowPassword] = useState(false)
  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Flex
      bg={"#111;"}
      color={"color.100"}
      align={"center"}
      justify={"center"}
      minH={"100vh"}
    >
      <Stack spacing={8} py={12} px={6} w={"auto"} mx="auto">
        <Stack align={"center"}>
          <Box rounded={"lg"} boxShadow={"lg"} p={30} bgColor={"#A"}>
            <Heading textAlign={"center"}>
              <Text as={"span"} color={"#008000"} fontSize={"5xl"}>
                Circle
              </Text>
            </Heading>
            <Text
              fontSize="xl"
              fontWeight={600}
              textAlign={"center"}
              m={1}
              color={"white"}
            >
              Login to Circle
            </Text>
            <Stack spacing={4} mt={4}>
              <FormControl mb={2} id="email" isRequired minW="350px">
                <FormLabel color={"white"}>Email</FormLabel>
                <Input
                  color={"white"}
                  onChange={handleChange}
                  placeholder="Email/Username"
                  name="email"
                  type="email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel color={"white"}>Password</FormLabel>
                <InputGroup>
                  <Input
                    color={"white"}
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement width="4.5rem">
                    <IconButton
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      h="0rem"
                      size="xl"
                      color={"white"}
                      onClick={handleTogglePassword}
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                onClick={handleLogin}
                bgColor={"green"}
                color={"white"}
                w="full"
                fontWeight={"bold"}
                _hover={{ bg: "green.500", color: "white" }}
                transition={"all 0.3s ease"}
                transitionDuration={".3s"}
              >
                Login
              </Button>
              <Text color={"white"} textAlign={"center"}>
                Don't have an account yet?{" "}
                <Link to="/register" color="white">
                  <span style={{ color: "#008000", fontWeight: "bold" }}>Register</span>
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Flex>
  )
}
