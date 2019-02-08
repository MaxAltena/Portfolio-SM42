import React, { Component } from "react";
import Loader from "./common/Loader";
import Splash from "./Content/Splash";

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
    if (this.props.item.type !== "iframe") {
      this.setState({ item, loading: false });
    } else {
      this.setState({ item, loading: true });
    }
  };

  componentDidUpdate = () => {
    if (this.state.item !== this.props.item) {
      const item = this.props.item;
      if (this.props.item.type !== "iframe") {
        setTimeout(() => {
          this.setState({ loading: true });
        }, 0);
        setTimeout(() => {
          this.setState({ item });
        }, 300);
        setTimeout(() => {
          this.setState({ loading: false });
        }, 600);
      } else {
        this.setState({ item, loading: true });
      }
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
            {loading ? <Loader /> : null}
            <div className={`innerContent ${loading ? "loading" : "loaded"}`}>
              <div className="outerPage">
                <div className="page">
                  <div className="innerPage">
                    <h1 className="hind bold center">{item.title}</h1>
                    <p>{item.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );
        break;
      case "splash":
        content = (
          <main className="Content">
            <div className={`innerContent ${loading ? "loading" : "loaded"}`}>
              {loading ? <Loader /> : null}
              <Splash />
            </div>
          </main>
        );
        break;
      case "placeholder":
      default:
        content = (
          <main className="Content">
            {loading ? <Loader /> : null}
            <div className={`innerContent ${loading ? "loading" : "loaded"}`}>
              <div className="outerPage">
                <div className="page">
                  <div className="innerPage">
                    <h1 className="hind bold center">{item.hash}</h1>
                    <p>Aan deze pagina wordt nog gewerkt!</p>
                  </div>
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
