import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUser, sendMessage } from "../store/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useGetMessages = () => {
  const [messages, setMessages] = useRecoilState(sendMessage);
  const selectedConversation = useRecoilValue(currentUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMessages = () => {
      setLoading(true);
      axios
        .post(`/api/messages/getMessage/${selectedConversation._id}`)
        .then((res) => {
          const data = res.data;
          if (data.error) {
            throw new Error(data.error);
          }
          // Convert res.data to array
          const dataArray = Array.isArray(data) ? data : [data];
          setMessages(dataArray);
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
