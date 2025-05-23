import { Box, VStack, Flex, Avatar, Text, Menu, MenuList, MenuItem, MenuButton, Portal, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";

const UserHeader = () => {
    const toast = useToast()
    const copyURL = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            toast({ description: "Link copied to clipboard"});
    })
}
  return (
    <VStack gap={4} alignItems={"start"}>
        <Flex justifyContent={"space-between"} w={"full"}>
            <Box>
                <Text fontSize={"2xl"} fontWeight={"bold"}>Mark Zuckerberg</Text>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={"sm"}>zuckMe</Text>
                    <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
                        threads.net
                    </Text>
                </Flex>
            </Box>
            <Box>
                <Avatar name='Mark Zuckerberg' src='/zuck-avatar.png' size={{
                    base: "md",
                    md: "lg",
                    lg: "xl"
                }
                } />
            </Box>
        </Flex>

        <Text>Co-founder, executive chairman, and CEO of Meta Platforms. AKA babo igre</Text>
        <Flex w={"full"} justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
                <Text color={"gray.light"}>3.2K Followers</Text>
                <Box w={1} h={1} borderRadius={"full"} bg={"gray.light"}></Box>
                <Link color={"gray.light"}>instagram.com</Link>
            </Flex>
            <Flex>
                <Box className="icon-container">
                    <BsInstagram size={24} cursor={"pointer"}/>
                </Box>
                <Box className="icon-container">
                    <Menu>
                        <MenuButton>
                            <CgMoreO size={24} cursor={"pointer"}/>
                        </MenuButton>
                        <Portal>
                            <MenuList bg={"gray.dark"}>
                                <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                </Box>
            </Flex>
        </Flex>

        <Flex w={"full"}>
            <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                <Text fontWeight={"bold"}>Threads</Text>
            </Flex>
            <Flex flex={1} borderBottom={"1.5px solid gray"} justifyContent={"center"} color={"gray.light"} pb={3} cursor={"pointer"}>
                <Text fontWeight={"bold"}>Replies</Text>
            </Flex>
        </Flex>
    </VStack>
  );
}

export default UserHeader;