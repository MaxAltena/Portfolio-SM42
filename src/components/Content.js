import React, { Component } from "react";
import Loader from "./common/Loader";

class Content extends Component {
  constructor(props) {
    super(props);

    const item = {};
    const loading = false;

    this.state = {
      item,
      loading
    };
  }

  componentDidMount = () => {
    const item = this.props.item;
    const loading = this.props.item.type === "iframe" ? true : false;
    this.setState({ item, loading });
  };

  componentDidUpdate = () => {
    if (this.state.item !== this.props.item) {
      const item = this.props.item;
      const loading = this.props.item.type === "iframe" ? true : false;
      this.setState({ item, loading });
    }
  };

  handleLoad = () => {
    this.setState({ loading: false });
    // let iframe = document.getElementsByTagName("iframe")[0];
    // let url = iframe.getAttribute("src");
    // if (url.startsWith("https://docs.google.com/document/d/")) {
    //   console.log("hi")
    //   let d = document.createElement("div");
    //   d.classList.add("embedded-doc");
    //   iframe.parentElement.replaceChild(d, iframe);

    //   let xhr = new XMLHttpRequest();
    //   xhr.open("GET", url, true);
    //   xhr.onload = function() {
    //     d.innerHTML = xhr.responseText;
    //   };
    //   xhr.send();
    // }
  };

  render() {
    const { item, loading } = this.state;

    let content;
    switch (item.type) {
      case "iframe":
        content = (
          <main className="Content">
            {loading ? <Loader /> : null}
            <iframe
              src={item.content}
              frameBorder="0"
              title={item.content}
              onLoad={this.handleLoad}
              className={loading ? "loading" : "loaded"}
            />
          </main>
        );
        break;
      case "page":
        content = (
          <main className="Content">
            <div className="innerContent">
              <div className="page">
                <div className="innerPage">
                  <h1 className="hind bold center">{item.title}</h1>
                  <p>{item.content}</p>
                </div>
              </div>
            </div>
          </main>
        );
        break;
      case "placeholder":
      default:
        content = (
          <main className="Content">
            <div className="innerContent">
              <div className="page">
                <div className="innerPage">
                  <h1 className="hind bold center">{item.hash}</h1>
                  <p>Dit bestaat nog niet!</p>
                </div>
              </div>
            </div>
          </main>
        );
        break;
    }

    return content;
  }
}

export default Content;
