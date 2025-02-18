import React from "react";

const Picture = ({ data }) => {
  return (
    <div className="picture">
      <p>{data.photographer}</p>
      <div className="imageContainer">
        <img src={data.src.large} alt="" />
      </div>
      <p>
        下載圖片：
        <a target="_blank" href={data.src.large}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 2 16 16"
            height="1em"
            width="1em"
          >
            <path d="M8 9V2H6.1v7L3.5 6.5 2 8l5 5 5-5-1.5-1.5L8 9z" />
            <path d="M13 12v3H1v-3h-2v6h16v-6h-2z" />
          </svg>
        </a>
      </p>
    </div>
  );
};

export default Picture;
