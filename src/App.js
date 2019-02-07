import React, { Component } from "react";
import Navigation from "./components/Navigation";
import Content from "./components/Content";
import validateHash from "./utils/validateHash";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    const { hash } = this.props.location;
    const hashStripped = hash.substr(1);
    const sidemenuItems = [
      {
        divider: true,
        label: "Algemeen",
        value: "algemeen"
      },
      {
        label: "Home",
        value: "home",
        icon: "fa-home"
      },
      { label: "Kennismaking", value: "kennismaking", icon: "fa-comment" },
      {
        label: "item 2",
        value: "item2",
        icon: "fa-award",
        children: [
          {
            label: "item 2.1",
            value: "item2.1",
            icon: "fa-shower",
            children: [
              { label: "item 2.1.1", value: "item2.1.1", icon: "fa-bed" },
              { label: "item 2.1.2", value: "item2.1.2", icon: "fa-bolt" }
            ]
          },
          { label: "item 2.2", value: "item2.2", icon: "fa-bomb" }
        ]
      },
      {
        label: "item 3",
        value: "item3",
        icon: "fa-bong",
        children: [
          {
            label: "item 3.1",
            value: "item3.1",
            icon: "fa-adjust",
            children: [
              {
                label: "item 3.1.1",
                value: "item3.1.1",
                icon: "fa-anchor"
              },
              {
                label: "item 3.1.2",
                value: "item3.1.2",
                icon: "fa-ankh"
              }
            ]
          },
          { label: "item 3.2", value: "item3.2", icon: "fa-bath" }
        ]
      },
      { divider: true, label: "Strategie & Concept", value: "nav-SCO" },
      { label: "Vak", value: "sco1", icon: "fa-beer" },
      {
        divider: true,
        label: "User Experience & User Centered Design",
        value: "nav-UXU"
      },
      { label: "Vak", value: "uxu1", icon: "fa-beer" },
      { divider: true, label: "Design & Development", value: "nav-DED" },
      { label: "Vak", value: "ded1", icon: "fa-beer" }
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
        { hash: "home", type: "page" },

        {
          hash: "kennismaking",
          type: "iframe",
          content:
            "https://drive.google.com/file/d/1Bc2B8H6ydJK8YMvnhq9jzdu7EER3EwquZu1oJuO0lxg/preview"
        },
        { hash: "item2", type: "page" },
        { hash: "item2.1", type: "page" },
        { hash: "item2.1.1", type: "page" },
        { hash: "item2.1.2", type: "page" },
        { hash: "item2.2", type: "page" },
        { hash: "item3", type: "page" },
        { hash: "item3.1", type: "page" },
        { hash: "item3.1.1", type: "page" },
        { hash: "item3.1.2", type: "page" },
        { hash: "item3.2", type: "page" },
        { hash: "sco1", type: "page" },
        { hash: "uxu1", type: "page" },
        { hash: "ded1", type: "page" }
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
