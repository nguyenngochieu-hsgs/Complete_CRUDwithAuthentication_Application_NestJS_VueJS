import axios from "axios";

const register = async function(user) {
    console.log(user);
    await axios.post("http://localhost:3000/api/user/register", JSON.stringify(user),{
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    })
}

const login = async function(user) {
    console.log(user);
    return await axios.post("http://localhost:3000/api/user/login", JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((res) => {
        console.log(res.data);
        return res.data;
    }).catch((error)=>{
        return error.response.data;
    })
}

export const userService = {
    register,
    login,
}