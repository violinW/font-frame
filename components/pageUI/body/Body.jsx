import './Body.scss';
import React from 'react';
import Nav from './nav/Nav';
import { UidMaker } from 'Modules/commonMethod';
import { Link } from 'react-router';
import { Button, Select, Option } from 'antd';

//import cookieUtil from 'Modules/cookie';


/* 用于整个页面的消息提示 */
import Msg from 'Component/basicUI/msg/Msg.jsx';
import { Loading } from 'Component/basicUI/loading/Loading.jsx';

import userStore from 'Store/user';
import userAction from 'Action/user';

import commonStore from 'Store/common';
import { hashHistory } from 'react-router';


export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginState: {},
            loading: false,
            callbackTaskInfo: [],
            selectedKey: ""
        };
    }

    componentWillMount() {
        commonStore.addChangeListener(this.updateCommon);
    }

    componentDidMount() {
        userStore.addChangeListener(this.update);
    }

    componentWillUnmount() {
        userStore.removeChangeListener(this.update);
        commonStore.removeChangeListener(this.updateCommon);
    }
    componentWillReceiveProps() {
        // if (!cookieUtil.hasItem("token")) {
        //     hashHistory.push("/login");
        // }
    }

    update = () => {
        const data = userStore.getLoginState();
        this.setState({
            loginState: data
        });
    };
    updateCommon = () => {
        const callbackTaskInfo = commonStore.getCallbackTaskInfo();
        if (!_.isEmpty(callbackTaskInfo)) {
            let selectedKey = callbackTaskInfo[0].schedulerId;
            this.setState({ callbackTaskInfo, selectedKey });
        }
    };
    handleQuit = () => {
        //提示 是否确认退出
        const closeLogicBox = LogicBox.close;
        const confirmLogicBox = () => {
            //确认退出
            if (cookieUtil.hasItem('userName')) {
                loginAction.quitLogin(cookieUtil.getItem('userName'), () => {
                    this.context.router.replace('/login');
                });
            } else {
                hashHistory.push("/login");
            }
        };
        const footer = (
            <div className="tag-footer" key={UidMaker()}>
                <Button
                    key="submit"
                    type="primary"
                    size="large"
                    className="confirm-button"
                    onClick={confirmLogicBox}>
                    确定
                </Button>
            </div>
        );

    };
    /**
     * 创建下拉列表的数据
     * @param  {array} data       数据列表
     * @return {array} options    下拉列表数据
     */
    createDataDrag = (data) => {
        let options = [];
        data.forEach(item => {
            options.push({
                key: item.schedulerId,
                value: item.schedulerName,
            });
        });
        return options;
    };
    /**
     * 下拉列表数据切换
     */
    handleChange = (val) => {
        this.setState({ selectedKey: val });
    };

    render() {
        let { loginState, callbackTaskInfo, selectedKey } = this.state;
        let { userName, logined } = loginState;
        //处理state中的数据,用于构建数据拉取的下拉列表和数据表
        let options = this.createDataDrag(callbackTaskInfo);
        // 当前选中项目对应的时间数据
        let timeTextObject = selectedKey && _.find(callbackTaskInfo, ['schedulerId', selectedKey]);
        return (
                <div className="BODY">
                    <Nav src={this.props.location.pathname} />
                    <div className="common-content">
                        <div className="common-content-head">
                            {/* 用户退出按钮 */}
                            <div className='user-and-quit'>
                                {logined ?
                                    <span className="logined">
                                        <span>{userName}</span>
                                        <span
                                            className="login-out"
                                            onClick={this.handleQuit}>
                                            退出
                                    </span>
                                    </span> :
                                    <Link to='/login' style={{ 'color': '#30A9DE' }}>登录</Link>
                                }
                            </div>
                            {/*顶部白条*/}
                            <div className='nav'>
                                {selectedKey &&
                                    <div className="data-drag">
                                        <Select
                                            options={options}
                                            onChange={this.handleChange}
                                            value={selectedKey}>
                                            {options.map(item => (<Option title={item.value} key={item.key}>{item.value}</Option>))}
                                        </Select>
                                        <span className="time-show">
                                            {timeTextObject ? timeTextObject.endRunAt : ""}
                                        </span>
                                    </div>}
                            </div>
                        </div>
                        {this.props.children}
                    </div>
                    <Msg />
                    <Loading />
                </div>
        );
    }
}

Body.contextTypes = {
    router: React.PropTypes.object.isRequired
};
