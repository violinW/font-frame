import './Nav.scss';
import React from 'react';
import {UidMaker} from 'Modules/commonMethod';
import {hashHistory} from 'react-router';
import { Logo } from 'Images';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navList: [
        {
          icon: 'fa fa-edit',
          name: "目录一",
          src: "/Firse",
          children: [{
            icon: 'fa fa-trash-o',
            name: "目录1.1",
            src: "/aaa"
          }, {
            icon: 'fa fa-trash-o',
            name: "目录1.2",
            src: "/bbb"
          }]
        }, {
          icon: 'fa fa-edit',
          name: "目录二",
          src: "/Second",
          children: []
        }
      ]
    };
  }

  /**
   * 导航栏点击事件
   * @param src
   */
  onNavListClick = (item) => {
    if (item.children.length) {

    } else {
      history.pushState(item.src)
    }
  };

  render() {
    return (
        <div className="PRIMARY-NAV">
          <img className='logo' src={Logo}/>
          <ButtonList
              list={this.state.navList}
              activeKey={this.props.src}
              onNavListClick={this.onNavListClick}
          />
        </div>
    );
  }
}

class ButtonList extends React.Component {
  static defaultProps = {
    list: [],
    activeKey: '/home'
  };
  static propTypes = {
    list: React.PropTypes.array
  };

  /**
   * 设置active属性
   */
  getActiveKey(src) {
    const {activeKey} = this.props;
    return src === activeKey || activeKey.indexOf(src + '/') !== -1
        ? "active"
        : "";
  }

  /**
   * 生成导航栏列表
   * @param list
   * @returns {*}
   */
  makeList(list) {
    const _this = this;
    return list.map(item => {
      return (
          <li
              key={UidMaker()}
              className={_this.getActiveKey(item.src)}
              onClick={() => this.props.onNavListClick(item)}>
            <i className={item.icon}></i>
            <a src={item.src}>{item.name}</a>
          </li>);
    });
  }

  render() {
    return (
        <ul className="navList">
          {this.makeList(this.props.list)}
        </ul>
    );
  }
}
