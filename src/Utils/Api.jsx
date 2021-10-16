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

export const Channel = async (id, token) => {
    try {
        const response = await axios.get("http://206.189.91.54//api/v1/channels/"+id, {
            headers: token
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const NewChannel = async (data, headers) => {
    try {
        const response = await axios({
            method: "post",
            url: 'http://206.189.91.54//api/v1/channels',
            data: data,
            headers: headers
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const AddMemberToChannel = async (data, headers) => {
    try {
        const response = await axios({
            method: "post",
            url: 'http://206.189.91.54//api/v1/channel/add_member',
            data: data,
            headers: headers
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const NewMessage = async (data, headers) => {
    try {
        const response = await axios({
            method: "post",
            url: 'http://206.189.91.54//api/v1/messages',
            data: data,
            headers: headers
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const FetchMessages = async (receiver_class, receiver_id, token) => {
    try {
        const response = await axios.get(`http://206.189.91.54//api/v1/messages?receiver_class=${receiver_class}&receiver_id=`+receiver_id, {
            headers: token
        });
        return response;
    } catch (error) {
        return error;
    }
}