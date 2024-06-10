import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUser, sendMessage } from "../store/useConversation.js";
import toast from "react-hot-toast";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useRecoilState(sendMessage);
  const selectedUserId = useRecoilValue(currentUser);

  const sendMessagefn = async (messageContent) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/messages/sendMessage/${selectedUserId._id}`,
        {
          message: messageContent, // No need to stringify the message content here
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.error) {
        throw new Error(res.data.error);
      }

      const newMessage = res.data.newMessage;
      console.log("this is", newMessage);

      // Ensure messages is mutable and append the new message
      // Deep copying solved the problem of state not updating
      // remember this as a concept
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        if (updatedMessages.length === 0) {
          return [{ messages: [newMessage] }];
        } else {
          const updatedConversation = { ...updatedMessages[0] };
          updatedConversation.messages = [...updatedConversation.messages, newMessage];
          return [updatedConversation];
        }
      });

      console.log("it is from use send message hook", messages);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessagefn };
};

export default useSendMessage;
