import React, { Component } from "react";
import { Link } from "react-router-dom";
import SideMenu from "react-sidemenu";
import Logo from "../assets/Logo";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logo: Logo(),
      X: undefined
    };
  }

  componentDidMount = () => {
    this.setState({
      ...this.state,
      X: document.getElementsByClassName("X")[0]
    });
  };

  handleAnimation = action => {
    const { X } = this.state;
    switch (action) {
      case "add":
        X.classList.add("animated");
        break;
      case "remove":
        X.classList.remove("animated");
        break;
      default:
        break;
    }
  };

  render() {
    const { items, theme, activeItem } = this.props.sidemenu;
    const { logo } = this.state;
    return (
      <div className="Navigation">
        <div className="top">
          <Link
            to="/#home"
            onMouseEnter={() => this.handleAnimation("add")}
            onAnimationEnd={() => this.handleAnimation("remove")}
          >
            {logo}
          </Link>
          <h1 className="hind bold">Portfolio S4 - Max Altena</h1>
        </div>
        <SideMenu items={items} theme={theme} activeItem={activeItem} />
      </div>
    );
  }
}

export default Navigation;
