import { Box } from "@chakra-ui/react"
import SearchInput from "../../features/search/SearchInput"
import Main from "../../layout/Main"

export default function SearchPage() {
  return (
    <Main>
      <Box borderLeft={"1.5px solid #444"} borderRight={"1.5px solid #444"} p={5}>
        <SearchInput />
      </Box>
    </Main>
  )
}
