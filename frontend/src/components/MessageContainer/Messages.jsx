import Message from "./Message";
import MessageSkeleton from "../Skeletons/MessageSkeleton.jsx";
import useGetMessages from "../../Hooks/useGetMessages.js";

const Messages = () => {
  const { mssgs, loading } = useGetMessages();

  // Check if mssgs is defined and has at least one element
  const messages = mssgs && mssgs.length > 0 ? mssgs[0].messages || [] : [];
  //console.log(mssgs)
  console.log(messages);
  console.log(Array.isArray(messages));
  // console.log(messages);
  // console.log(Array.isArray(messages));

  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* {!loading && messages.length > 0 && messages.map((message) => (
        <Message key={message._id} message={message}/>
      ))} */}
      {/* {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Enter message to start chat.</p>
      )} */}
    </div>
  );
};

export default Messages;
