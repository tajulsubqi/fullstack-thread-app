import ThreadCard from "./component/ThreadCard"
import ThreadsForm from "./component/ThreadsForm"
import { useThreads } from "./hooks/useThreads"
import { IThreadCard } from "../../types/Threads"
import { useEffect } from "react"
import { Box } from "@chakra-ui/react"

export default function Threads() {
  const { Threads } = useThreads()

  useEffect(() => {}, [Threads])
  return (
    <Box bgColor={"#111"}>
      <ThreadsForm />
      <Box marginTop={24} >
        {Threads?.map((item: IThreadCard) => {
          const usernameWithoutSpace = item.createdById?.username?.replace(/\s/g, "")

          return (
            <ThreadCard
              key={item.id}
              id={item.id}
              full_name={item.createdById?.full_name}
              username={usernameWithoutSpace}
              created_at={item.created_at ?? ""}
              content={item.content}
              image={item.image}
              replies={item.replies}
              likes={item.likes}
            />
          )
        })}
      </Box>
    </Box>
  )
}
