var API = (function () {
    // 创建一些接口变量
    const HELLO_URL = 'https://study.duyiedu.com'; //域名

    const TOKEN_KEY = 'token'; //令牌

    // const REGISTER = '/api/user/reg'; //注册账号

    // const LOGIN = '/api/user/login'; //登录账号

    // // const EXISTS = '/api/user/exists'; //验证账号

    // const PROFILE = '/api/user/profile'; //账号信息

    // const SENDCHAT = '/api/chat'; //发送聊天

    // const CHAT_HISTORY = '/api/chat/history'; //聊天记录

    // 封装两个函数
    function get(path) {
        const headers = {};
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(HELLO_URL + path, {
            headers
        });
    }

    function post(path, bodyObj) {
        const headers = {
            'Content-Type': 'application/json',
        };
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(HELLO_URL + path, {
            headers,
            method: 'POST',
            body: JSON.stringify(bodyObj),
        });
    }

    //注册函数
    async function register(userInfo) {
        const resp = await post('/api/user/reg', userInfo);
        return await resp.json();
    };

    //登录函数
    async function login(loginInfo) {
        const resp = await post('/api/user/login', loginInfo);
        const result = await resp.json();
        if (result.code === 0) {
            // 登录成功
            // 将响应头中的token保存起来（localStorage）
            const token = resp.headers.get('authorization');
            localStorage.setItem(TOKEN_KEY, token);
        }
        return result;
    }

    // 验证账号函数
    async function exists(loginId) {
        const resp = await get('/api/user/exists?loginId=' + loginId);
        return await resp.json();
    }

    //账号信息函数
    async function profile() {
        const resp = await get('/api/user/profile');
        return await resp.json();
    }

    //发送聊天消息

    async function sendChat(content) {
        const resp = await post('/api/chat', {
            content,
        });
        return await resp.json();
    }

    //获取聊天信息
    async function getHistory() {
        const resp = await get('/api/chat/history');
        return await resp.json();
    }

    //退出登录
    function loginOut() {
        localStorage.removeItem(TOKEN_KEY);
    }

    return {
        register,
        login,
        exists,
        profile,
        sendChat,
        getHistory,
        loginOut,
    };
})();