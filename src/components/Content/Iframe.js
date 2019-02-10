import React from "react";

const Iframe = ({ url, title, loading, handleLoad }) => {
  return (
    <div className={`Iframe ${loading ? "loading" : "loaded"}`}>
      <iframe
        src={`${
          url.startsWith("https://docs.google.com/document/d/")
            ? url + "/preview"
            : url
        }`}
        frameBorder="0"
        title={title}
        onLoad={handleLoad}
      />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-floating btn-large waves-effect z-depth-2"
        title="Open in new tab"
      >
        <i className="fa fa-long-arrow-alt-up" />
      </a>
    </div>
  );
};

export default Iframe;
