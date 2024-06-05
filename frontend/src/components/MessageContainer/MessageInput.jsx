import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../Hooks/useSendMessage";

const MessageInput = () => {
  const [messageContent, setMessageContent] = useState("");
  const { loading, sendMessagefn } = useSendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageContent) return;
    console.log(messageContent);
    await sendMessagefn(messageContent);
    setMessageContent("");
  };
  return (
    <form className="px-4 my-3 relative" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white pr-10"
          placeholder="Send a message"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {loading ? (
            <span className="loading loading-spinner "></span>
          ) : (
            <BsSend className="text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
