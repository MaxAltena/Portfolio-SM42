import React, { Component } from "react";
import menu from "./assets/menu.json";
import Navigation from "./components/Navigation";
import Content from "./components/Content";
import validateHash from "./utils/validateHash";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    const { hash } = this.props.location;
    const hashStripped = hash.substr(1);
    const sidemenuItems = menu;
    const validHash = validateHash(hash, sidemenuItems);

    if (!validHash) {
      this.props.history.push("/#home");
    }

    this.state = {
      hash,
      hashStripped,
      validHash,
      sidemenu: {
        items: sidemenuItems,
        theme: "custom",
        activeItem: hashStripped
      }
    };
  }

  componentDidUpdate = () => {
    const { hash } = this.props.location;
    const hashStripped = hash.substr(1);
    const validHash = validateHash(hash, this.state.sidemenu.items);

    if (!validHash) {
      this.props.history.push("/#home");
    } else {
      if (this.state.hash !== this.props.location.hash) {
        this.setState({
          ...this.state,
          hash,
          hashStripped,
          validHash,
          sidemenu: {
            ...this.state.sidemenu,
            activeItem: hashStripped
          }
        });
      }
    }
  };

  render() {
    const { hashStripped, sidemenu } = this.state;

    let currentItem;
    sidemenu.items.forEach(item => {
      if (item.value === hashStripped) currentItem = item;
      if (item.children) {
        item.children.forEach(childItem => {
          if (childItem.value === hashStripped) currentItem = childItem;
        });
      }
    });

    return (
      <div className="App">
        <Navigation sidemenu={sidemenu} />
        <Content item={currentItem} />
      </div>
    );
  }
}

export default App;
