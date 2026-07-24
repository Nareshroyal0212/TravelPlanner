import { useEffect, useState } from "react";

function useFetch(callback) {
  const [data, setData] = useState([]);

  useEffect(() => {
    callback().then((response) => {
      setData(response.data);
    });
  }, []);

  return data;
}

export default useFetch;