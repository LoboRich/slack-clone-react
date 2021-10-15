import axios from 'axios';

export const SignIn = async ({email, password}) => {
    try {
        const response = await axios.post("http://206.189.91.54//api/v1/auth/sign_in", {
            email: email,
            password: password
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const SignUp = async (data) => {
    try {
        const response = await axios({
            method: "post",
            url: "http://206.189.91.54//api/v1/auth/",
            data: data,
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const FetchUserChannels = async (token) => {
    try {
        const response = await axios.get("http://206.189.91.54//api/v1/channels", {
            headers: token
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const FetchUserDms = async (token) => {
    try {
        const response = await axios.get("http://206.189.91.54//api/v1/users/recent", {
            headers: token
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const FetchUsers = async (token) => {
    try {
        const response = await axios.get("http://206.189.91.54//api/v1/users", {
            headers: token
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const FetchOwnedChannels = async (token) => {
    try {
        const response = await axios.get("http://206.189.91.54//api/v1/channel/owned", {
            headers: token
        });
        return response;
    } catch (error) {
        return error;
    }
}