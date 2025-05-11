import { Link } from "react-router-dom"
import { Avatar, Flex, Box, Text, Image, useToast, Menu, MenuList, MenuItem, MenuButton, Portal } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "./Actions"
import { useState } from "react"

// This file is used for creating the user post (img, line and accounts liked)

const UserPost = ({ postImg, postTitle, likes, replies, author, postId }) => {
    const toast = useToast();

    // Dynamically construct the post URL
    const copyPostURL = () => {
        const postURL = `${window.location.origin}/${author}/post/${postId}`; // Use author and postId to generate the URL
        navigator.clipboard.writeText(postURL).then(() => {
            toast({ description: "Post link copied to clipboard" });
        });
    };

    const [liked, setLiked] = useState(false);
    return (
        <Link to={`${author}/post/${postId}`}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar size="md" name={author} src="/zuck-avatar.png" />
                    <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
                    <Box position={"relative"} w={"full"}>
                        <Avatar
                            size="xs"
                            name="John Doe"
                            src="https://bit.ly/dan-abramov"
                            position={"absolute"}
                            top={"0px"}
                            left="15px"
                            padding={"2px"}
                        />
                        <Avatar
                            size="xs"
                            name="John Doe"
                            src="https://bit.ly/sage-adebayo"
                            position={"absolute"}
                            bottom={"0px"}
                            right="-5px"
                            padding={"2px"}
                        />
                        <Avatar
                            size="xs"
                            name="John Doe"
                            src="https://bit.ly/prosper-baba"
                            position={"absolute"}
                            bottom={"0px"}
                            left="4px"
                            padding={"2px"}
                        />
                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text fontSize={"sm"} fontWeight={"bold"}>{author}</Text>
                            <Image src="/verified.png" w={4} h={4} ml={1}></Image>
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontStyle={"sm"} color={"gray.light"}>
                                1d
                            </Text>

                            <Box onClick={(e) => e.preventDefault()}>
                                <Menu>
                                    <MenuButton>
                                        <BsThreeDots />
                                    </MenuButton>
                                    <Portal>
                                        <MenuList bg={"gray.dark"}>
                                            <MenuItem bg={"gray.dark"} onClick={copyPostURL}>
                                                Copy Post Link
                                            </MenuItem>
                                        </MenuList>
                                    </Portal>
                                </Menu>
                            </Box>
                        </Flex>
                    </Flex>
                    <Text fontSize={"sm"}>{postTitle}</Text>
                    {postImg && (
                        <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                            <Image src={postImg} w={"full"} />
                        </Box>
                    )}
                    <Flex gap={3} my={1}>
                        <Actions liked={liked} setLiked={setLiked} />
                    </Flex>

                    <Flex gap={2} alignItems={"center"}>
                        <Text color={"gray.light"} fontSize={"sm"}>
                            {replies} replies
                        </Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                        <Text color={"gray.light"} fontSize={"sm"}>
                            {likes} likes
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Link>
    );
};

export default UserPost;