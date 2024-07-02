import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedVal, setDebouncedVal] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedVal;
};

export default useDebounce;
