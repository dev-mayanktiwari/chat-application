import Message from "./Message";
import MessageSkeleton from "../Skeletons/MessageSkeleton.jsx";
import useGetMessages from "../../Hooks/useGetMessages.js";
import { useEffect, useRef } from "react";
import useListenMessages from "../../Hooks/useListenMessages.js";

const Messages = () => {
  const { mssgs, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  // Check if mssgs is defined and has at least one element
  const messages = mssgs && mssgs.length > 0 ? mssgs[0].messages || [] : [];
  
  //  console.log(mssgs)
  // console.log(messages);
  // console.log(Array.isArray(messages));
  // console.log(messages);
  // console.log(Array.isArray(messages));

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, 100);
  });

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start conversation.</p>
      )}
    </div>
  );
};

export default Messages;
