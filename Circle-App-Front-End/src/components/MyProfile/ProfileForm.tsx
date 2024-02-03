import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useBreakpointValue,

  useToast,
} from "@chakra-ui/react";
import { useUpdateProfile } from "./hook/useUpdateProfile";
export default function ProfileForm() {
  const { profile, mutate, isPending, handleChange } = useUpdateProfile();
  const shouldDisplaySidebar = useBreakpointValue({ base: false, md: true });
  const toast = useToast();

  return (
    <FormControl w={{ base: "115%", md: "50%" }}>
      <Box>
        <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"} mb={5} color={"white"}>
          Edit Profile
        </Text>
      </Box>

      <FormControl>
        <form
          onSubmit={(e) => {
            e.preventDefault(), mutate();
          }}
        >
    
          <Box display={"flex"} flexDirection={"column"} gap={6} color={"white"}>
            <FormControl>
              <FormLabel>Your name</FormLabel>
              <Input
                placeholder="full name"
                value={profile.full_name}
                name="full_name"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel display={"flex"} alignItems={"center"}>
                <FormLabel>Username</FormLabel>
              </FormLabel>
              <Input
                placeholder="username"
                value={profile.username}
                name="username"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="email"
                value={profile.email}
                name="email"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Input
                placeholder="bio"
                value={profile.bio}
                name="bio"
                onChange={handleChange}
              />
            </FormControl>
            {shouldDisplaySidebar ? (
              <Button
                onClick={() => {
                  const examplePromise = new Promise((resolve) => {
                    setTimeout(() => resolve(200), 1000);
                  });

                  toast.promise(examplePromise, {
                    success: { title: "Successfully Edit Profile" },
                    error: {
                      title: "Promise rejected",
                      description: "Something wrong",
                    },
                    loading: { title: "Please Wait" },
                  });
                }}
                color={"white"}
                fontWeight={"bold"}
                bgColor={"#008000"}
                _hover={{ bgColor: "yellow", color: "black" }}
                type="submit"
                isLoading={isPending}
              >
                Save Profile
              </Button>
            ) : (
              <Button
                onClick={() => {
                  const examplePromise = new Promise((resolve) => {
                    setTimeout(() => resolve(200), 5000);
                  });

                  toast.promise(examplePromise, {
                    success: { title: "Successfully Edit Profile" },
                    error: {
                      title: "Promise rejected",
                      description: "Something wrong",
                    },
                    loading: { title: "Suksess", description: "Please wait" },
                  });
                }}
                bgColor={"#008000"}
                type="submit"
                isLoading={isPending}
                
              >
                Save Profile
              </Button>
            )}
          </Box>
        </form>
      </FormControl>
    </FormControl>
  );
}
