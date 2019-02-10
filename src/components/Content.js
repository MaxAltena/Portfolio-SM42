import React, { Component } from "react";
import Loader from "./common/Loader";
import Splash from "./Content/Splash";
import Iframe from "./Content/Iframe";
import External from "./Content/External";

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
    const { item } = this.props;
    switch (item.type) {
      case "iframe":
        this.setState({ item, loading: true });
        break;
      case "external":
        window.open(item.content, "_blank");
        this.setState({ item, loading: false });
        break;
      default:
        this.setState({ item, loading: false });
        break;
    }
  };

  componentDidUpdate = () => {
    if (this.state.item !== this.props.item) {
      const { item } = this.props;

      switch (item.type) {
        case "iframe":
          this.setState({ item, loading: true });
          break;
        case "external":
          window.open(item.content, "_blank");
          setTimeout(() => {
            this.setState({ loading: true });
          }, 0);
          setTimeout(() => {
            this.setState({ item });
          }, 300);
          setTimeout(() => {
            this.setState({ loading: false });
          }, 600);
          break;
        default:
          setTimeout(() => {
            this.setState({ loading: true });
          }, 0);
          setTimeout(() => {
            this.setState({ item });
          }, 300);
          setTimeout(() => {
            this.setState({ loading: false });
          }, 600);
          break;
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
      case "splash":
        content = (
          <main className="Content">
            {loading ? <Loader /> : null}
            <Splash loading={loading} />
          </main>
        );
        break;
      case "iframe":
        content = (
          <main className="Content">
            {loading ? <Loader /> : null}
            <Iframe
              url={item.content}
              title={item.title}
              loading={loading}
              handleLoad={this.handleLoad}
            />
          </main>
        );
        break;
      case "external":
        content = (
          <main className="Content">
            {loading ? <Loader /> : null}
            <External item={item} />
          </main>
        );
        break;
      case "page":
      default:
        content = (
          <main className="Content">
            {loading ? <Loader /> : null}
            <div className={`innerContent ${loading ? "loading" : "loaded"}`}>
              <div className="outerPage">
                <div className="page">
                  <div className="innerPage">
                    <h1 className="hind bold center">{item.value}</h1>
                    <p>{item.content}</p>
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
