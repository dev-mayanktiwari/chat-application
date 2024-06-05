import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUser, sendMessage } from "../store/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useRecoilState(sendMessage);
  const selectedUserId = useRecoilValue(currentUser);

  const sendMessagefn = async (messageContent) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/messages/sendMessage/${selectedUserId._id}`,
        {
          message: JSON.stringify(messageContent),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.error) {
        throw new Error(res.error);
      }
      setMessage([...message, res]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessagefn };
};

export default useSendMessage;
