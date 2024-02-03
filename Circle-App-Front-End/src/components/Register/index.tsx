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
import { useRegister } from "./hooks/useRegister"
import { Link } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function RegisterCard() {
  const { handleChange, handleRegister } = useRegister()
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
          <Box rounded={"lg"} boxShadow={"lg"} p={30} bgColor={"#111"}>
            <Heading textAlign={"center"}>
              <Text as={"span"} color={"green"} fontSize={"5xl"}>
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
              Create account circle
            </Text>
            <Stack spacing={4} mt={5}>
              <FormControl id="full_name" isRequired minW="350px">
                <FormLabel color={"white"}>Full Name</FormLabel>
                <Input
                  onChange={handleChange}
                  placeholder="Full Name"
                  name="full_name"
                  type="name"
                  color={"white"}
                />
              </FormControl>
              <FormControl id="Username" isRequired minW="350px">
                <FormLabel color={"white"}>Username</FormLabel>
                <Input
                  onChange={handleChange}
                  placeholder="Username"
                  name="username"
                  type="name"
                  color={"white"}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel color={"white"}>Email</FormLabel>
                <Input
                  onChange={handleChange}
                  placeholder="Email"
                  name="email"
                  type="email"
                  color={"white"}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel color={"white"}>Password</FormLabel>
                <InputGroup>
                  <Input
                    color={"white"}
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement width="4.5rem">
                    <IconButton
                      color={"white"}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      h="0rem"
                      size="xl"
                      onClick={handleTogglePassword}
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                bgColor={"green"}
                color={"white"}
                w="full"
                fontWeight={"bold"}
                _hover={{ bg: "green.500", color: "white" }}
                transition={"all 0.3s ease"}
                transitionDuration={".3s"}
                onClick={handleRegister}
              >
                Register
              </Button>

              <Text color={"white"} textAlign={"center"}>
                Allready have an account?{" "}
                <Link to={"/login"}>
                  <span style={{ color: "green", fontWeight: "bold" }}>Login</span>
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Flex>
  )
}
