import { Box } from "@chakra-ui/react"
import Thread from "../../features/detail-thread/component/Thread"
import Main from "../../layout/Main"

export default function DetailThread() {
  return (
    <Main>
      <Box borderLeft={"1.5px solid #444"} borderRight={"1.5px solid #444"}>
        <Thread />
      </Box>
    </Main>
  )
}
