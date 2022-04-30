import axios from "axios";

const register = async function(user) {
    console.log("REGISTER : ", user);
    return await axios.post("http://localhost:3000/api/user/register", JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log("RES :", res);
        return res.data;
    }).catch((error) => {
        console.log(error.response.data);
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
        return res.data;
    }).catch((error) => {
        return error.response.data;
    })
}

const getUserProfile = async function() {
    return await axios.get("http://localhost:3000/api/user/me", {
        withCredentials: true
    }).then((res) => {
        console.log("GetUserProfile : ", res.data);
        return res.data;
    }).catch((error) => {
        return error.response.data;
    })
}

const getTasks = async function() {
    return await axios.get("http://localhost:3000/api/task", {
        withCredentials: true,
    }).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    })
}

const createTask = async function(task) {
    return await axios.post("http://localhost:3000/api/task", JSON.stringify(task), {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((res) => {
        console.log(res.data);
        return res.data;
    }).catch((error) => {
        return error.response.data;
    })
}

const updateTask = async function(task_id, update_task) {
    return await axios.put("http://localhost:3000/api/task/" + task_id, JSON.stringify(update_task), {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    }).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    })
}

const deleteTask = async function(task_id) {
    return await axios.delete("http://localhost:3000/api/task/" + task_id, {
        withCredentials: true
    }).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    })

}



export const userService = {
    register,
    login,
    getUserProfile,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
}