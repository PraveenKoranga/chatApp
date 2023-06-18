import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { Tooltip, Avatar, Image, Tag, IconButton } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { DownloadIcon } from "@chakra-ui/icons";
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <>
      <ScrollableFeed>
        {messages &&
          messages.map((m, i) => (
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <>
                  <Tooltip
                    label={m.sender.name}
                    placement="bottom-start"
                    hasArrow
                  >
                    <Avatar
                      mt="7px"
                      mr="1"
                      size="sm"
                      cursor="pointer"
                      name={m.sender.name}
                      src={m.sender.pic}
                    />
                  </Tooltip>
                </>
              )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                }}
              >
                {m.content.endsWith(".jpg") ||
                m.content.endsWith(".jpeg") ||
                m.content.endsWith(".png") ? (
                  <a
                    href={m.content}
                    open
                    // style={{ width: "20%", height: "20%" }}
                  >
                    <Image src={m.content} />
                  </a>
                ) : m.content.endsWith(".pdf") ? (
                  <Tag
                    size={"lg"}
                    key={"lg"}
                    borderRadius="full"
                    variant="white"
                    colorScheme="white"
                  >
                    <a href={m.content} download={true}>
                      {m.content.substring(m.content.lastIndexOf("/") + 1)}
                    </a>
                    <IconButton
                      variant="white"
                      colorScheme="white"
                      icon={<DownloadIcon />}
                    />
                  </Tag>
                ) : (
                  <>{m.content}</>
                )}
              </span>
            </div>
          ))}
      </ScrollableFeed>
    </>
  );
};

export default ScrollableChat;
