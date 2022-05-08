/**
 * @Description: websocket
 * @Author: Zander
 * @Date: 2022/5/8 17:14
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/8 17:14
 */
const SOCKET_PATH = process.env.VUE_APP_SOCKET_PATH;

const socketInfo = {
  socket: null,
  groupId: 'groupId',
  userId: null,
  callback: defaultCallback,
  self: null
};

/**
 * 创建WebSocket
 * @param groupId 组织ID
 * @param userId 用户ID
 * @param self this指针
 * @param callback 回调函数
 */
export function createSocket(groupId, userId, self, callback) {
  socketInfo.groupId = groupId || 'groupId';
  socketInfo.userId = userId;
  socketInfo.self = self || null;
  socketInfo.callback = callback || defaultCallback;
  const Socket = window.WebSocket || window.MozWebSocket;
  if (Socket) {
    socketInfo.socket = new Socket(SOCKET_PATH);
    socketInfo.socket.onopen = onopenWS;
    socketInfo.socket.onmessage = onmessageWS;
    socketInfo.socket.onerror = onerrorWS;
    socketInfo.socket.onclose = oncloseWS;
  } else {
    console.log('当前浏览器不支持WebSocket协议！');
  }
}

/**
 * 发送数据
 * @param data
 */
export function sendWSPush(data) {
  const obj = {
    groupId: socketInfo.groupId,
    userId: socketInfo.userId,
    event: data
  };
  if (socketInfo.socket !== null) {
    if (socketInfo.socket.readyState === 3) {
      socketInfo.socket.close();
      const { groupId, userId, self, callback } = socketInfo;
      createSocket(groupId, userId, self, callback);
    } else if (socketInfo.socket.readyState === 1) {
      socketInfo.socket.send(JSON.stringify(obj));
    } else if (socketInfo.socket.readyState === 0) {
      setTimeout(() => {
        socketInfo.socket.send(JSON.stringify(obj));
      }, 3000);
    }
  }
}

/**
 * 打开WebSocket
 */
export function onopenWS() {
  console.log('WebSocket连接建立成功');
  const data = {
    node: 'onopen',
    groupId: socketInfo.groupId,
    userId: socketInfo.userId
  };
  if (socketInfo.socket.readyState === 1) {
    socketInfo.socket.send(JSON.stringify(data));
  }
}

/**
 * WS数据接收统一处理
 * @param event
 */
export function onmessageWS(event) {
  console.log(`WebSocket服务器，推送消息:${event.data}`);
  if (typeof socketInfo.callback === 'function') {
    socketInfo.callback(event.data);
  } else {
    window.dispatchEvent(
      new CustomEvent('onmessageWS', {
        detail: {
          data: event
        }
      })
    );
    console.error('callback is not a function');
  }
}

/**
 * 连接失败重连
 * @param event
 */
export function onerrorWS(event) {
  socketInfo.socket.close();
  const { groupId, userId, self, callback } = socketInfo;
  createSocket(groupId, userId, self, callback);
  console.log(userId);
  console.error(event);
}

/**
 * 关闭WebSocket
 */
export function oncloseWS() {
  console.log('WebSocket服务器。。。。。。关闭！');
}

function defaultCallback(data) {
  if (data.indexOf('通信成功') !== 0) {
    console.log(data);
  }
}

/**
 * 调用
 *
 * import { createSocket, sendWSPush } from "@/utils/socket";
 *
 * createSocket(13, 13, this, function(e) {}); 创建
 *
 * const getDataFunc = function(e) {
 *   console.log(e.detail.data)
 * }
 *
 * 监听ws数据响应
 * window.addEventListener('onmessageWS', getDataFunc)
 *
 * 根据需要，销毁事件监听
 * window.removeEventListener('onmessageWS', getDataFunc)
 *
 * sendWSPush(11111) 发送数据
 */
