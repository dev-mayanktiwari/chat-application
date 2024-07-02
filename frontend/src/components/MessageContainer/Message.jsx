import { extractTime } from "../../../../backend/utils/extractTime";
import { useAuthContext } from "../../context/AuthContext";
import { useRecoilValue } from "recoil";
import { currentUser } from "../../store/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const selectedConversation = useRecoilValue(currentUser);
  const shakeClass = message.shouldShake ? "shake" : "";
  // console.log("authUser:", authUser); // Debugging
  // console.log("message.senderId:", message.senderId); // Debugging

  const fromMe = message.senderId === authUser.data._id;
  // console.log("fromMe:", fromMe); // Debugging
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.data.profilePicture
    : selectedConversation?.profilePicture; // Provide a default picture URL if necessary
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-500"; // Ensure the other user's message has a background color

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="User profile" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
