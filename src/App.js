import React, { Component } from "react";
import Navigation from "./components/Navigation";
import Content from "./components/Content";
import validateHash from "./utils/validateHash";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    // Custom icons / other brand icons
    // https://github.com/fortunar/react-sidemenu/issues/4

    const { hash } = this.props.location;
    const hashStripped = hash.substr(1);
    const sidemenuItems = [
      {
        divider: true,
        label: "Algemeen",
        value: "nav-algemeen"
      },
      {
        label: "Home",
        value: "home",
        icon: "fa-home"
      },
      { label: "Over mij", value: "about", icon: "fa-user" },
      {
        label: "Weapon of choice",
        value: "weapon-of-choice",
        icon: "fa-android"
      },
      { label: "DuoApp concept", value: "concept", icon: "fa-fire" },
      { divider: true, label: "Techniek", value: "nav-techniek" },
      {
        label: "Workshops",
        value: "tech-workshops",
        icon: "fa-memory",
        children: [
          {
            label: "Workshop 1 - Android introduction",
            value: "tech-workshop-1"
          }
        ]
      },
      {
        divider: true,
        label: "User experience",
        value: "nav-user-experience"
      },
      {
        label: "Workshops",
        value: "ux-workshops",
        icon: "fa-users",
        children: [
          {
            label: "Workshop 1 - UX introduction",
            value: "ux-workshop-1"
          }
        ]
      }
    ];
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
      },
      content: [
        {
          hash: "",
          type: "page",
          title: "Introductie",
          content: "Welkom bij mijn Portfolio website voor SM42"
        },
        {
          hash: "home",
          type: "page",
          title: "Introductie",
          content: "Welkom bij mijn Portfolio website voor SM42"
        },
        {
          hash: "about",
          type: "iframe",
          content:
            "https://docs.google.com/document/d/1mu-9pzo-tCYt2wudpFJeOZjqEg0zHgSwAAB4kxmyltU/preview"
        },
        {
          hash: "weapon-of-choice",
          type: "iframe",
          content:
            "https://docs.google.com/document/d/1AXaM5NSrXI9KKVz5tLyzFIALY_Gmos-uHIh9vXyaHHQ/preview"
        },
        {
          hash: "concept",
          type: "iframe",
          content:
            "https://docs.google.com/document/d/1pgDH9GcDKq39Pq9hUBUOA_pRbtoy2kvkRYK5dbxPHNs/preview"
        },
        { hash: "tech-workshops", type: "placeholder" },
        { hash: "tech-workshop-1", type: "placeholder" },
        { hash: "ux-workshops", type: "placeholder" },
        { hash: "ux-workshop-1", type: "placeholder" }
      ]
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
    const { hashStripped, sidemenu, content } = this.state;

    let currentItem = undefined;
    content.forEach(item => {
      if (item.hash === hashStripped) currentItem = item;
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
