import React from "react";

const External = ({ item }) => {
  const { content, title } = item;
  return (
    <div className="External">
      <a href={content} target="_blank" rel="noopener noreferrer">
        <span>
          Klik hier om naar {title} te gaan. (Als je nog er nog niet bent){" "}
          <i className="fa fa-external-link-alt" />
        </span>
      </a>
    </div>
  );
};

export default External;
