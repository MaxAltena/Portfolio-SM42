Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = undefined;

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

// components

// types
var SideMenu = (function(_Component) {
  _inherits(SideMenu, _Component);

  function SideMenu(props) {
    _classCallCheck(this, SideMenu);

    var _this = _possibleConstructorReturn(
      this,
      (SideMenu.__proto__ || Object.getPrototypeOf(SideMenu)).call(this, props)
    );

    _this.state = { itemTree: [], componentStateTree: [] };
    return _this;
  }

  _createClass(SideMenu, [
    {
      key: "componentWillMount",
      value: function componentWillMount() {
        if (this.props.children) {
          this.setState({
            componentStateTree: this.buildComponentStateTree(
              this.props.children,
              null
            )
          });
        }
      }
    },
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        var items = this.props.items;

        if (items) {
          this.setState({ itemTree: this.buildTree(items, null) });
        }
      }
    },
    {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        if (this.props.items && prevProps.items !== this.props.items) {
          this.setState({ itemTree: this.buildTree(this.props.items, null) });
        }
        // We rebuild the whole component tree if activeItem prop changes
        if (
          this.props.activeItem &&
          this.props.activeItem !== prevProps.activeItem
        ) {
          if (this.props.items) {
            this.setState({ itemTree: this.buildTree(this.props.items, null) });
          } else if (this.props.children) {
            this.setState({
              componentStateTree: this.buildComponentStateTree(
                this.props.children,
                null
              )
            });
          }
        }
      }

      //
      // methods for SideMenu using COMPONENT structure
      //
    },
    {
      key: "buildComponentStateTree",
      value: function buildComponentStateTree(children, parent) {
        var _this2 = this;

        var activeItem = this.props.activeItem;

        return _react2.default.Children.map(children, function(child) {
          var newChild = {};
          var subTree = [];

          newChild.active = false;
          newChild.parent = parent;

          if (activeItem === child.props.value) {
            _this2.activateParentsComponentTree(newChild, false);
          }

          if (child.props.children) {
            subTree = _this2.buildComponentStateTree(
              child.props.children,
              newChild
            );
          }
          newChild.children = subTree;

          return newChild;
        });
      }
    },
    {
      key: "handleComponentClick",
      value: function handleComponentClick(item) {
        var collapse = this.props.collapse;
        var componentStateTree = this.state.componentStateTree;

        var activeBefore = item.active;
        if (collapse) {
          this.deactivateComponentTree(componentStateTree);
        } else {
          this.deactivateComponentTreeLeaves(componentStateTree);
        }
        this.activateParentsComponentTree(item, activeBefore);
        this.setState({ componentStateTree: componentStateTree });
      }
    },
    {
      key: "activateParentsComponentTree",
      value: function activateParentsComponentTree(item, activeBefore) {
        if (item) {
          var isLeaf = !item.children || item.children.length === 0;
          // We don't want to inacivate an active leaf item
          if (isLeaf && activeBefore) {
            item.active = true;
          } else if (!activeBefore) {
            item.active = true;
          }
          this.activateParentsComponentTree(item.parent, false);
        }
      }
    },
    {
      key: "deactivateComponentTree",
      value: function deactivateComponentTree(componentStateTree) {
        var _this3 = this;

        if (!componentStateTree) {
          return null;
        }
        return componentStateTree.map(function(child) {
          child.active = false;
          if (child.children) {
            child.children = _this3.deactivateComponentTree(child.children);
          }

          return child;
        });
      }
    },
    {
      key: "deactivateComponentTreeLeaves",
      value: function deactivateComponentTreeLeaves(componentStateTree) {
        var _this4 = this;

        if (!componentStateTree) {
          return null;
        }
        return componentStateTree.map(function(child) {
          if (!child.children || child.children.length === 0) {
            child.active = false;
          } else {
            child.children = _this4.deactivateComponentTreeLeaves(
              child.children
            );
          }
          return child;
        });
      }

      //
      // methods for SideMenu using JSON structure
      //
    },
    {
      key: "buildTree",
      value: function buildTree(children, parent) {
        var _this5 = this;

        var activeItem = this.props.activeItem;

        if (!Array.isArray(children)) {
          return null;
        }
        return children.map(function(child) {
          var newChild = _extends({}, child, {
            active: false,
            parent: parent,
            children: null
          });
          var subTree = [];

          if (newChild.value === activeItem) {
            newChild.active = true;
            _this5.activeParentPath(newChild);
          }

          if (Array.isArray(child.children)) {
            //  $FlowFixMe
            subTree = _this5.buildTree(child.children, newChild);
          }
          newChild.children = subTree;

          return newChild;
        });
      }
    },
    {
      key: "deactivateTree",
      value: function deactivateTree(itemTree) {
        var _this6 = this;

        if (!itemTree) {
          return null;
        }
        itemTree.forEach(function(item) {
          item.active = false;
          if (item.children) {
            _this6.deactivateTree(item.children);
          }
        });
      }
    },
    {
      key: "deactivateTreeLeaves",
      value: function deactivateTreeLeaves(itemTree) {
        var _this7 = this;

        if (!itemTree) {
          return null;
        }
        itemTree.forEach(function(item) {
          if (!item.children) {
            item.active = false;
          } else {
            _this7.deactivateTreeLeaves(item.children);
          }
        });
      }
    },
    {
      key: "activeParentPath",
      value: function activeParentPath(item) {
        var curItem = item;
        while (curItem) {
          curItem.active = true;
          curItem = curItem.parent;
        }
      }
    },
    {
      key: "onItemClick",
      value: function onItemClick(item) {
        var _this8 = this;

        var itemTree = this.state.itemTree;
        var _props = this.props,
          onMenuItemClick = _props.onMenuItemClick,
          collapse = _props.collapse,
          shouldTriggerClickOnParents = _props.shouldTriggerClickOnParents;

        var self = this;
        return function(e) {
          if (e) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }

          var isLeaf = !item.children || item.children.length === 0;
          // handle UI changes
          if (!item.active) {
            // if menu is in collapse mode, close all items
            if (collapse) {
              self.deactivateTree(itemTree);
            } else {
              self.deactivateTreeLeaves(itemTree);
            }
            item.active = true;
            self.activeParentPath(item);
            self.setState({ itemTree: itemTree });
            // eslint-disable-next-line
          }
          // we deactivate the item if it is active and does not have children
          else if (!isLeaf) {
            item.active = false;
            // if menu is in collapse mode, close only
            if (item.children) {
              self.deactivateTree(item.children);
            }
            if (item.parent) {
              self.activeParentPath(item.parent);
            }
            self.setState({ itemTree: itemTree });
          }

          // check if item has an onClick method defined
          if (item.onClick) {
            item.onClick(item.value);
            // handle what happens if the item is a leaf node
          } else if (isLeaf || shouldTriggerClickOnParents) {
            if (onMenuItemClick) {
              onMenuItemClick(item.value, item.extras);
            } else {
              window.location.href = "#" + item.value;
            }
          }

          _this8.setState(_extends({}, _this8.state));
        };
      }
    },
    {
      key: "renderChevron",
      value: function renderChevron(item, rtl) {
        if (item.children && item.children.length > 0) {
          if (item.active) {
            return _react2.default.createElement("i", {
              className: "fa fa-chevron-down"
            });
          } else if (rtl) {
            return _react2.default.createElement("i", {
              className: "fa fa-chevron-right"
            });
          }
          return _react2.default.createElement("i", {
            className: "fa fa-chevron-left"
          });
        }
        return null;
      }
    },
    {
      key: "handleRenderMenuItemContent",
      value: function handleRenderMenuItemContent(item) {
        var _props2 = this.props,
          renderMenuItemContent = _props2.renderMenuItemContent,
          rtl = _props2.rtl;
        if (renderMenuItemContent) {
          return renderMenuItemContent({
            icon: item.icon,
            value: item.value,
            label: item.label
          });
        }
        var short;
        var icon = item.icon;
        if (item.icon !== undefined) {
          short = item.icon.substr(0, item.icon.indexOf("-"));
        }
        switch (short) {
          case "fab":
            icon = "fa-" + icon.split("-")[1];
            break;
          case "fa":
          default:
            break;
        }
        return _react2.default.createElement(
          "span",
          null,
          icon &&
            _react2.default.createElement("i", {
              className: short + " " + icon + " item-icon"
            }),
          _react2.default.createElement(
            "span",
            { className: "item-label" },
            " ",
            item.label,
            " "
          ),
          item.type === "external" &&
            _react2.default.createElement("i", {
              className: "fa fa-external-link-alt item-icon"
            }),
          item.children && this.renderChevron(item, rtl)
        );
      }
    },
    {
      key: "renderItem",
      value: function renderItem(item, level) {
        var _this9 = this;

        if (item.divider) {
          return _react2.default.createElement(
            "div",
            { key: item.value, className: "divider divider-level-" + level },
            this.handleRenderMenuItemContent(item)
          );
        }
        if (item.hidden) return;
        return _react2.default.createElement(
          "div",
          {
            key: item.value,
            className:
              "item item-level-" + level + " " + (item.active ? "active" : "")
          },
          _react2.default.createElement(
            "div",
            {
              className: "waves-effect waves-light item-title",
              onClick: this.onItemClick(item)
            },
            this.handleRenderMenuItemContent(item)
          ),
          _react2.default.createElement(
            "div",
            { className: "children " + (item.active ? "active" : "inactive") },
            item.children &&
              item.children.map(function(child) {
                return _this9.renderItem(child, level + 1);
              })
          )
        );
      }
    },
    {
      key: "render",
      value: function render() {
        var _this10 = this;

        var _state = this.state,
          itemTree = _state.itemTree,
          componentStateTree = _state.componentStateTree;
        var _props3 = this.props,
          theme = _props3.theme,
          onMenuItemClick = _props3.onMenuItemClick,
          rtl = _props3.rtl,
          renderMenuItemContent = _props3.renderMenuItemContent,
          shouldTriggerClickOnParents = _props3.shouldTriggerClickOnParents;

        var sidemenuComponent = this;
        if (!componentStateTree || componentStateTree.length === 0) {
          // sidemenu constructed from json
          return _react2.default.createElement(
            "div",
            {
              className:
                "Side-menu Side-menu-" +
                theme +
                " " +
                (rtl ? "rtl" : "") +
                " children active"
            },
            itemTree &&
              itemTree.map(function(item) {
                return _this10.renderItem(item, 1);
              })
          );
        }
        // sidemenu constructed with react components
        return _react2.default.createElement(
          "div",
          {
            className:
              "Side-menu  Side-menu-" +
              theme +
              " " +
              (rtl ? "rtl" : "") +
              " children active"
          },
          _react2.default.Children.map(this.props.children, function(
            child,
            index
          ) {
            return _react2.default.cloneElement(child, {
              activeState: componentStateTree[index],
              handleComponentClick: _this10.handleComponentClick.bind(_this10),
              renderMenuItemContent: renderMenuItemContent,
              onMenuItemClick: onMenuItemClick,
              shouldTriggerClickOnParents: shouldTriggerClickOnParents,
              rtl: rtl,
              level: 1,
              sidemenuComponent: sidemenuComponent
            });
          })
        );
      }
    }
  ]);

  return SideMenu;
})(_react.Component);

// Because component version of menu is built using cloning and adding some props,
// we need to silence errors related to these added props.

SideMenu.defaultProps = {
  collapse: true,
  rtl: false,
  theme: "default"
};
SideMenu.propTypes = {
  items: _propTypes2.default.array,
  onMenuItemClick: _propTypes2.default.func,
  renderMenuItemContent: _propTypes2.default.func,
  theme: _propTypes2.default.string,
  collapse: _propTypes2.default.bool,
  rtl: _propTypes2.default.bool,
  activeItem: _propTypes2.default.string
};
exports.default = SideMenu;

var Item = (exports.Item = (function(_Component2) {
  _inherits(Item, _Component2);

  function Item() {
    _classCallCheck(this, Item);

    return _possibleConstructorReturn(
      this,
      (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments)
    );
  }

  _createClass(Item, [
    {
      key: "onItemClick",
      value: function onItemClick() {
        var _props4 = this.props,
          onMenuItemClick = _props4.onMenuItemClick,
          children = _props4.children,
          value = _props4.value,
          extras = _props4.extras,
          handleComponentClick = _props4.handleComponentClick,
          activeState = _props4.activeState,
          shouldTriggerClickOnParents = _props4.shouldTriggerClickOnParents,
          onClick = _props4.onClick;

        var isLeaf = !children || children.length === 0;
        if (onClick) {
          onClick(value);
        } else if (isLeaf || shouldTriggerClickOnParents) {
          if (onMenuItemClick) {
            onMenuItemClick(value, extras);
          } else {
            window.location.href = "#" + value;
          }
        }

        handleComponentClick(activeState);
      }
      // $FlowFixMe
    },
    {
      key: "renderChevron",
      value: function renderChevron(children, activeState, rtl) {
        if (children) {
          if (activeState.active) {
            return _react2.default.createElement("i", {
              className: "fa fa-chevron-down"
            });
          } else if (rtl) {
            return _react2.default.createElement("i", {
              className: "fa fa-chevron-right"
            });
          }
          return _react2.default.createElement("i", {
            className: "fa fa-chevron-left"
          });
        }
        return null;
      }
    },
    {
      key: "handleRenderMenuItemContent",
      value: function handleRenderMenuItemContent() {
        // $FlowFixMe
        var _props5 = this.props,
          renderMenuItemContent = _props5.renderMenuItemContent,
          children = _props5.children,
          value = _props5.value,
          label = _props5.label,
          icon = _props5.icon,
          activeState = _props5.activeState,
          rtl = _props5.rtl;

        if (renderMenuItemContent) {
          return renderMenuItemContent({
            icon: icon,
            value: value,
            label: label
          });
        }
        return _react2.default.createElement(
          "span",
          null,
          icon &&
            _react2.default.createElement("i", {
              className: "fa " + icon + " item-icon"
            }),
          _react2.default.createElement(
            "span",
            { className: "item-label" },
            " ",
            label,
            " "
          ),
          this.renderChevron(children, activeState, rtl)
        );
      }
    },
    {
      key: "render",
      value: function render() {
        var _props6 = this.props,
          label = _props6.label,
          onMenuItemClick = _props6.onMenuItemClick,
          divider = _props6.divider,
          children = _props6.children,
          activeState = _props6.activeState,
          level = _props6.level,
          rtl = _props6.rtl,
          renderMenuItemContent = _props6.renderMenuItemContent,
          shouldTriggerClickOnParents = _props6.shouldTriggerClickOnParents,
          sidemenuComponent = _props6.sidemenuComponent,
          handleComponentClick = _props6.handleComponentClick;

        if (divider) {
          return _react2.default.createElement(
            "div",
            { className: "divider divider-level-" + level },
            label,
            " "
          );
        }
        return _react2.default.createElement(
          "div",
          {
            className:
              "item item-level-" +
              level +
              " " +
              (activeState.active ? "active" : "")
          },
          _react2.default.createElement(
            "div",
            { className: "item-title", onClick: this.onItemClick.bind(this) },
            this.handleRenderMenuItemContent()
          ),
          children &&
            _react2.default.createElement(
              "div",
              {
                className:
                  "children " + (activeState.active ? "active" : "inactive")
              },
              _react2.default.Children.map(children, function(child, index) {
                return _react2.default.cloneElement(child, {
                  handleComponentClick: handleComponentClick,
                  activeState:
                    activeState.children != null
                      ? activeState.children[index]
                      : null,
                  renderMenuItemContent: renderMenuItemContent,
                  onMenuItemClick: onMenuItemClick,
                  shouldTriggerClickOnParents: shouldTriggerClickOnParents,
                  rtl: rtl,
                  level: level + 1,
                  sidemenuComponent: sidemenuComponent
                });
              })
            )
        );
      }
    }
  ]);

  return Item;
})(_react.Component));

Item.propTypes = {
  label: _propTypes2.default.string,
  value: _propTypes2.default.string,
  activeState: _propTypes2.default.object,
  level: _propTypes2.default.number,
  icon: _propTypes2.default.string,
  rtl: _propTypes2.default.bool,
  onMenuItemClick: _propTypes2.default.func,
  handleComponentClick: _propTypes2.default.func,
  renderMenuItemContent: _propTypes2.default.func,
  divider: _propTypes2.default.bool
};
