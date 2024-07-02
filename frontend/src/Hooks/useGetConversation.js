import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { searchTerm } from "../store/useConversation";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const searchValue = useRecoilValue(searchTerm);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "/api/users/getUsers?search=" + searchValue
        );
        if (!data) {
          throw new Error("No data found");
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch conversations");
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, [searchValue]);

  return { loading, conversations };
};

export default useGetConversation;
