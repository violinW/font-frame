import keyMirror from 'keymirror';


const common = {
    //全局弹出窗口设置
    SET_MODAL: null,
    //普适方法
    SET_LIST: null,          //设置列表
    SET_DETAIL: null,          //设置详情
    //消息
    TOAST_TO_USER: null,
    //获取登录状态
    GET_LOGINSTATE: null,
    //
    LOGIN_LOGINSTATE: null,
    //全局键盘事件
    KEY_EVENTS: null,
    //全局加载列表中
    LOADING_LIST: null,
    //全局加载容器
    LOADING_WRAPPER: null,
    //数据拉取
    GET_DATADRAG:null,
    //全局socket事件
    SOCKET: null
};

module.exports = {
    common: keyMirror(common)
};
