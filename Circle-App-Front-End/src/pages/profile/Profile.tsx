import Main from "../../layout/Main"
import MyProfile from "../../components/MyProfile/index"
import { Box } from "@chakra-ui/react"
export default function ProfilePage() {
  return (
    <Main>
      <Box borderLeft={"1.5px solid #444"} borderRight={"1.5px solid #444"} p={5}>
        <MyProfile />
      </Box>
    </Main>
  )
}
