import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/Search";
import Picture from "../components/Picture";
// Logical operator &&

const Homepage = () => {
  let [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = process.env.REACT_APP_APIKEY;
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURl = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1&locale=zh-TW`;

  const search = async (url) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: auth,
      },
    });
    setData(response.data.photos);
    setCurrentSearch(input);
  };

  // Closure
  const morePicture = async () => {
    // console.log("page state 目前的值是" + page);
    let newURL;
    /**
     * React 套件中的 function 開始執行時，
     * closure 機制會設定 page 這個 state 的值，
     * 且這個值是固定的。 */
    setPage(page + 1);
    /**
     * 在 morePicture 的 function execution context 中
     * page 的值，並不會被改變。
     * 在 morePicture 之外的地方，
     * page 的 state 會被改變，所以是有必要的。
     */
    // console.log("setPage 後，page state 目前的值是" + page);
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        page + 1
      }&locale=zh-TW`;
    }
    // console.log("正在 morePicture 內部");
    // console.log(newURL);
    let result = await axios.get(newURL, {
      headers: {
        Authorization: auth,
      },
    });
    setData(data.concat(result.data.photos));
  };

  useEffect(() => {
    search(initialURL);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          // 避免直接按下 search 按鈕時發生的錯誤。
          if (input.trim() !== "") {
            search(searchURl);
          } else {
            alert("請輸入搜尋關鍵字");
          }
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d, index) => {
            return <Picture data={d} key={index} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>更多圖片</button>
      </div>
    </div>
  );
};

export default Homepage;
