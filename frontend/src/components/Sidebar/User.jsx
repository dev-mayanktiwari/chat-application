import { useRecoilState } from "recoil";
import { currentUser } from "../../store/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const User = ({ user, emoji, lastidx }) => {
  const [selectedUser, setSelectedUser] = useRecoilState(currentUser);
  const isSelected = selectedUser?._id === user._id;
  const { onlineUsers } = useSocketContext();
  // console.log(onlineUsers)
  // Check if onlineUsers is not null or undefined before calling .includes
  const isOnline = onlineUsers ? onlineUsers.includes(user._id) : false;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer w-full
        ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedUser(user)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={user.profilePicture} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{user.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastidx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default User;
