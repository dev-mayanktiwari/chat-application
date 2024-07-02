import { useSetRecoilState } from "recoil";
import { searchTerm } from "../../store/useConversation";
import useDebounce from "../../Hooks/useDebounce";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const [searchVal, setSearchVal] = useState("");
  const setSearchValue = useSetRecoilState(searchTerm);
  const debouncedSearchVal = useDebounce(searchVal, 300);

  useEffect(() => {
    setSearchValue(debouncedSearchVal);
  }, [debouncedSearchVal, setSearchValue]);

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="text"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        placeholder="Search...."
        className="input input-bordered rounded-full"
      />
      {/* {loading ? (
        <div className="loading-container">
          <span className="loading loading-spinner mx-auto"></span>
        </div>
      ) : (
        <div className="user-list">{renderUsers(filteredUsers)}</div>
      )} */}
    </div>
  );
};

export default SearchBar;
