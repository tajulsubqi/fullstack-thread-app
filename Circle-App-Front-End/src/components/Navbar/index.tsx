import { Box, List, ListItem, ListIcon, Text, Button } from "@chakra-ui/react"
import { RiHome7Fill } from "react-icons/ri"
import { CgProfile } from "react-icons/cg"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { FaSearch } from "react-icons/fa"
import { RiUserFollowLine } from "react-icons/ri"
import { AUTH_LOGOUT } from "../../store/RootReducer"
import {
  BiHeart,
  BiHomeCircle,
  BiLogOut,
  BiSearchAlt,
  BiUserCircle,
} from "react-icons/bi"
import useToast from "./hook/loginHook"
export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toast = useToast()
  function handleLogout() {
    dispatch(AUTH_LOGOUT())
    toast("Logout", "Logout Successful", "info")
  }

  return (
    <Box
      // border={"1px solid #444"}
      h={"full"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      w={"137%"}
    >
      <Box>
        <Box mb={4}>
          <Text fontSize="6xl" color="whatsapp.600" as="b">
            Circle
          </Text>
        </Box>

        <List alignItems={"center"}>
          <Box display={"flex"} alignItems="center" marginBottom={30}>
            <BiHomeCircle size={"1.8em"} color={"#fff"} />
            <ListItem ms={3} color={"#fff"}>
              <Link to="/">
                <Text
                  fontSize={"xl"}
                  _hover={{ color: "#75b939" }}
                  transitionDuration={"0.3s"}
                >
                  Home
                </Text>
              </Link>
            </ListItem>
          </Box>

          <Box display={"flex"} alignItems="center" marginBottom={30}>
            <BiSearchAlt size={"1.8em"} color={"#fff"} />
            <ListItem ms={3} color={"#fff"}>
              <Link to="/search">
                <Text
                  fontSize={"xl"}
                  _hover={{ color: "#75b939" }}
                  transitionDuration={"0.3s"}
                >
                  Search
                </Text>
              </Link>
            </ListItem>
          </Box>

          <Box display={"flex"} alignItems="center" marginBottom={30}>
            <BiHeart size={"1.8em"} color={"#fff"} />
            <ListItem ms={3} color={"#fff"}>
              <Link to="/follow">
                <Text
                  fontSize={"xl"}
                  _hover={{ color: "#75b939" }}
                  transitionDuration={"0.3s"}
                >
                  Follows
                </Text>
              </Link>
            </ListItem>
          </Box>

          <Box display={"flex"} alignItems="center" marginBottom={30}>
            <BiUserCircle size={"1.8em"} color={"#fff"} />
            <ListItem ms={3} color={"#fff"}>
              <Link to="/profile">
                <Text
                  fontSize={"xl"}
                  _hover={{ color: "#75b939" }}
                  transitionDuration={"0.3s"}
                >
                  Profile
                </Text>
              </Link>
            </ListItem>
          </Box>
        </List>

        <Button
          bgColor={"#008000"}
          w="80%"
          mt={6}
          fontWeight={"bold"}
          color={"white"}
          _hover={{ bgColor: "#75b939", color: "white" }}
          style={{ borderRadius: "10px" }}
        >
          Create Post
        </Button>
      </Box>

      <Box>
        <Button
          w="80%"
          mt={6}
          gap={2}
          display={"flex"}
          variant="unstyled"
          color="white"
          leftIcon={<BiLogOut size={"2em"} />}
          onClick={() => {
            handleLogout()
            navigate("/")
          }}
        >
          <Text>Log Out</Text>
        </Button>
      </Box>
    </Box>
  )
}

export function NavbarMobile() {
  return (
    <List
      display={"flex"}
      flexDirection={"row"}
      gap={4}
      top={0}
      left={0}
      p={6}
      justifyContent={"space-between"}
      width={"100%"}
      height={"10%"}
      backgroundColor={"#111"}
      zIndex={1000000}
      position={"fixed"}
    >
      <Link to="/">
        <ListItem
          display={"flex"}
          alignItems={"center"}
          p={4}
          _hover={{ boxShadow: "xl" }}
          _active={{ boxShadow: "xl" }}
          cursor={"pointer"}
        >
          <ListIcon as={RiHome7Fill} />
        </ListItem>
      </Link>
      <Link to="/search">
        <ListItem
          display={"flex"}
          alignItems={"center"}
          p={4}
          _hover={{ boxShadow: "xl" }}
          _active={{ boxShadow: "xl" }}
          cursor={"pointer"}
        >
          <ListIcon as={FaSearch} />
        </ListItem>
      </Link>
      <Link to="/follow">
        <ListItem
          display={"flex"}
          alignItems={"center"}
          p={4}
          _hover={{ boxShadow: "xl" }}
          _active={{ boxShadow: "xl" }}
          cursor={"pointer"}
        >
          <ListIcon as={RiUserFollowLine} />
        </ListItem>
      </Link>
      <Link to="/profile">
        <ListItem
          display={"flex"}
          alignItems={"center"}
          p={4}
          _hover={{ boxShadow: "xl" }}
          _active={{ boxShadow: "xl" }}
          cursor={"pointer"}
        >
          <ListIcon as={CgProfile} />
        </ListItem>
      </Link>
    </List>
  )
}
