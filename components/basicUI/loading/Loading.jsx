import React from 'react';
import './Loading.scss';
import { Spin } from 'antd';
import commonStore from 'Store/common';

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount(){
        commonStore.addEventChangeListener('LOADING_LIST', this.update);
    }
    componentWillUnmount(){
        commonStore.removeEventChangeListener('LOADING_LIST', this.update);
    }
    update = () => {
        const status = commonStore.getLoadingListStatus();
        this.setState({ loading:status });
    };
    render() {
        return (
            <div className="LOADING">
                <Spin
                    size="large"
                    spinning={this.state.loading}
                    tip={<span className="loading">
                            <span className="wrapper">
                                <span className="loading-icon"><i className="fa fa-spinner fa-spin" /></span>
                                <span className="loading-text">加载中</span>
                            </span>
                        </span>}
                />
            </div>
        );
    }
}
//加载中的容器模式
class LoadingWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false
        };
    }
    componentDidMount(){
        commonStore.addEventChangeListener('LOADING_WRAPPER', this.update);
    }
    componentWillUnmount(){
        commonStore.removeEventChangeListener('LOADING_WRAPPER', this.update);
    }
    update = () => {
        const status = commonStore.getLoadingWrapperStatus();
        this.setState({ loading:status });
    };
    render() {
        const container = (
                <span className="loading">
                    <span className="wrapper">
                        <span className="loading-icon"><i className="fa fa-spinner fa-spin" /></span>
                        <span className="loading-text">加载中</span>
                    </span>
                </span>
            );
        return (
            <div className="LOADING">
                <Spin
                    size="large"
                    tip={container}
                    spinning={this.state.loading}>
                        {this.props.children}
                </Spin>
            </div>
        );
    }
}
export { Loading, LoadingWrapper };
