import { useRecoilState } from "recoil";
import { useSocketContext } from "../context/SocketContext"
import { sendMessage } from "../store/useConversation";
import { useEffect } from "react";
import notificationSound from "../assets/sounds/notification.mp3"

const useListenMessages = () => {
  const {socket} = useSocketContext();
  const [messages, setMessages] = useRecoilState(sendMessage);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
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
    })

    return () => socket?.off("newMessage")
  }, [socket, setMessages, messages])
}

export default useListenMessages