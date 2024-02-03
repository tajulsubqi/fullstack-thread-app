import Main from "../../layout/Main"
import ProfileForm from "../../components/MyProfile/ProfileForm"
import { Box, Center } from "@chakra-ui/react"
export default function EditProfile() {
  return (
    <Main>
      <Box borderLeft={"1.5px solid #444"} borderRight={"1.5px solid #444"}>
        <Center>
          <ProfileForm />
        </Center>
      </Box>
    </Main>
  )
}
