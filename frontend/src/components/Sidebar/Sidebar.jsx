import SearchBar from "./SearchBar";
import UserPallete from "./UserPallete";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchBar />
      <div className="divider px-3">

      </div>
      <UserPallete />
      <LogoutButton/>
    </div>
  );
};

export default Sidebar;
