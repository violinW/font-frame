import Dispatcher from 'Dispatcher';
import actionConstants from 'Constants';
import BasicFunc from 'Store/basicStoreFunc';

let LoginState = {};

const userStore = BasicFunc("登录数据", "login", {
  getLoginState(){
    return LoginState;
  }
});

Dispatcher.register(function (action) {
  const data = action.data;
  switch (action.type) {
    case actionConstants.common.GET_LOGINSTATE:
      LoginState = data;
      break;
    default:
  }
  userStore.emitChange();
  return true;
});

module.exports = userStore;
