export function setUserInfo(user) {
    sessionStorage.setItem('userInfo', JSON.stringify(user));
}

export function getUserInfo() {
    return JSON.parse(sessionStorage.getItem('userInfo'));
}
