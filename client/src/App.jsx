import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const searchFromServer = async (text) => {
    const response = await axios.get(
      `http://localhost:4001/trips?keywords=${text}`
    );
    console.log(response);
    setSearchResult(response.data.data);
  };



  useEffect(() => {
    searchFromServer(searchText);
  }, [searchText]);

  return (
    <div className="App">
      {
        <div className="flex flex-col">
          <h1 className="text-5xl font-medium text-blue-500 mt-20 flex justify-center">
            เที่ยวไหนดี
          </h1>
          <label className="text-lg ml-48 mt-6">ค้นหาที่เที่ยว</label>
          <input
            className=" w-8/12 border-2 border-t-white border-x-white ml-48 placeholder: text-center"
            type="text"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            value={searchText}
            placeholder="หาที่เที่ยวแล้วไปกัน ..."
          ></input>
          {searchResult.map((content, index) => {
            
            return (
              <div className=" mt-12 flex" key={index}>
                <div>
                  <img
                    className=" w-80 h-52 rounded-3xl ml-16"
                    src={content.photos[0]}
                  />
                </div>
                <div className="flex flex-col ml-10">
                  <div className=" text-3xl font-medium">{content.title}</div>
                  <div className=" text-gray-500 text-lg">
                    {content.description.substring(0, 100)}{" "}
                    <span className=" text-blue-500">...</span>
                  </div>
                  <a
                    className=" text-blue-500 underline"
                    href={content.url}
                    target="_blank"
                  >
                    อ่านต่อ
                  </a>
                  <div className=" text-gray-500 text-lg">
                    หมวด {content.tags.slice(0, 4)} และ {content.tags.slice(4)}
                  </div>
                  <div>
                    <img src="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}

export default App;
