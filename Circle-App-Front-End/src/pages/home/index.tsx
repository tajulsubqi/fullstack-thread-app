import { Box } from "@chakra-ui/react"
import Threads from "../../features/threads"
import Main from "../../layout/Main"

export default function Home() {
  return (
    <Main>
      <Box borderLeft={"1.5px solid #444"} borderRight={"1.5px solid #444"} p={5}>
        <Threads />
      </Box>
    </Main>
  )
}
