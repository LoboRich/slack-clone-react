export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const getToken = () => {
    const tokenStr = sessionStorage.getItem('token');
    if (tokenStr) return JSON.parse(tokenStr);
    else return null;
}

export const setUserSession = (token, user) => {
    const sessionToken = sessionStorage.setItem('token', JSON.stringify(token));
    const sessionUser = sessionStorage.setItem('user', JSON.stringify(user));
}

export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
}