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
      { hidden: true, label: "", value: "" },
      {
        divider: true,
        label: "Algemeen",
        value: "nav-algemeen",
        icon: "fa-home"
      },
      {
        label: "Home",
        value: "home",
        icon: "fa-home",
        type: "splash"
      },
      {
        label: "Over mij",
        value: "about",
        icon: "fa-user",
        type: "iframe",
        title: "Document over Max Altena",
        content:
          "https://docs.google.com/document/d/1mu-9pzo-tCYt2wudpFJeOZjqEg0zHgSwAAB4kxmyltU/"
      },
      {
        label: "Weapon of choice",
        value: "weapon-of-choice",
        icon: "fab-android",
        type: "iframe",
        title: "Document over mijn keuze",
        content:
          "https://docs.google.com/document/d/1AXaM5NSrXI9KKVz5tLyzFIALY_Gmos-uHIh9vXyaHHQ/"
      },
      {
        divider: true,
        label: "DuoApp – Hotname",
        value: "nav-duoapp",
        icon: "fa-fire"
      },
      {
        label: "Concept",
        value: "duoapp-concept",
        type: "iframe",
        title: "Document over Hotname",
        content:
          "https://docs.google.com/document/d/1pgDH9GcDKq39Pq9hUBUOA_pRbtoy2kvkRYK5dbxPHNs/"
      },
      {
        label: "GitHub",
        value: "duoapp-github",
        icon: "fab-github",
        type: "external",
        title: "GitHub repo van de DuoApp",
        content: "https://github.com/m-en-m/DuoApp"
      },
      {
        divider: true,
        label: "Techniek",
        value: "nav-techniek",
        icon: "fa-memory"
      },
      {
        label: "Workshops",
        value: "tech-workshops",
        type: "page",
        content: "Hier komt nog wat leuks",
        children: [
          {
            label: "Workshop 1 - Android introduction",
            value: "tech-workshop-1",
            type: "page",
            content: "Hier komen nog leuke dingen over deze workshop"
          }
        ]
      },
      {
        label: "GitHub",
        value: "tech-github",
        icon: "fab-github",
        type: "external",
        title: "GitHub repo van Max Altena's Smart Mobile",
        content: "https://github.com/MaxAltena/SM42"
      },
      {
        divider: true,
        label: "User experience",
        value: "nav-user-experience",
        icon: "fa-user-astronaut"
      },
      {
        label: "Workshops",
        value: "ux-workshops",
        type: "page",
        content: "Hier komt nog wat leuks",
        children: [
          {
            label: "Workshop 1 - UX introduction",
            value: "ux-workshop-1",
            type: "page",
            content: "Hier komen nog leuke dingen over deze workshop"
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

    let currentItem = undefined;
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
