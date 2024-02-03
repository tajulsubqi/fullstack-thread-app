import { Flex, Box, useBreakpointValue } from "@chakra-ui/react"
import Navbar from "../components/Navbar"
import { NavbarMobile } from "../components/Navbar"
import ProfileSide from "../components/Profile-Side"
import { ReactNode } from "react"

export default function Main({ children }: { children: ReactNode }) {
  const shouldDisplaySidebar = useBreakpointValue({ base: false, md: true })

  return (
    <Box p={10} width={"100%"}>
      <Flex direction={{ base: "column", md: "row" }} height="100%" bg={"#111;"}>
        {shouldDisplaySidebar ? (
          <Box
            width={{ base: "0%", md: "20%" }}
            position="fixed"
            top="0"
            bottom="0"
            left="0"
            p={10}
            bg={"#111;"}
          >
            <Navbar />
          </Box>
        ) : (
          <NavbarMobile />
        )}

        <Box
          width={shouldDisplaySidebar ? "50%" : "100%"}
          ml={shouldDisplaySidebar ? "20%" : "-5%"}
          mt={-10}
          paddingTop={{ base: 20, md: 14 }}
          pr={4}
          borderRight={{ base: "none", md: "1px solid black" }}
        >
          {children}
        </Box>
        {shouldDisplaySidebar && (
          <Box
            width="30%"
            position="fixed"
            right="0"
            display={"flex"}
            bg={"#111;"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            height="100%"
            gap={4}
          >
            <ProfileSide />
          </Box>
        )}
      </Flex>
    </Box>
  )
}
