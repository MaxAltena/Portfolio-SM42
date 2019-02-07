import React, { Component } from "react";
import Loader from "./common/Loader";

class Content extends Component {
  constructor(props) {
    super(props);

    const item = this.props.item;
    const loading = this.props.item.type === "iframe" ? true : false;
    this.state = {
      item,
      loading
    };
  }

  componentDidUpdate = () => {
    if (this.state.item !== this.props.item) {
      const item = this.props.item;
      const loading = this.props.item.type === "iframe" ? true : false;
      this.setState({ item, loading });
    }
  };

  handleLoad = () => {
    this.setState({ loading: false });
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
                  <h1 className="hind bold center">Portfolio-S4</h1>
                  <h2 className="hind center">Max Altena</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Optio minus, minima commodi ipsa harum officiis laborum
                    maiores. Eligendi placeat accusamus atque! Praesentium vitae
                    blanditiis iste animi aspernatur! Consectetur, fugit
                    reiciendis?
                  </p>
                </div>
              </div>
            </div>
          </main>
        );
        break;
      default:
        content = (
          <main className="Content">
            <div className="innerContent">
              <div className="page">
                <div className="innerPage">
                  <h1 className="hind bold center">Portfolio-S4</h1>
                  <h2 className="hind center">Max Altena</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Optio minus, minima commodi ipsa harum officiis laborum
                    maiores. Eligendi placeat accusamus atque! Praesentium vitae
                    blanditiis iste animi aspernatur! Consectetur, fugit
                    reiciendis?
                  </p>
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
