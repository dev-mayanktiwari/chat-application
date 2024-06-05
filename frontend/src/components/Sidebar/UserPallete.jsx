import useGetConversation from "../../Hooks/useGetConversation";
import { getRandomEmoji } from "../../utils/emoji";
import User from "./User";

const UserPallete = () => {
  const { loading, conversations } = useGetConversation();
  const users = conversations?.users || [];

  // Define your own function to render the User components
  const renderUsers = (users) => {
    return users.map((user, idx) => (
      <User
        key={user._id}
        user={user}
        emoji={getRandomEmoji()}
        lastidx={idx === users.length - 1}
      />
    ));
  };

  return (
    <div className="py-2 flex flex-col items-center overflow-auto">
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : (
        renderUsers(users)
      )}
    </div>
  );
};

export default UserPallete;
