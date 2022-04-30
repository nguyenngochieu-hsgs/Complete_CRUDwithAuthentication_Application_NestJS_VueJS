import { userService } from "@/services/user.service";

const state = () => ({
    registered: {
        message: '',
        success: false,
    },
    loggedIn: {
        message: '',
        success: false,
    },

    userProfile: {
        id: '',
        username: '',
    },

    tasks: [],
});

const getters = {
    isRegistered(state) {
        return state.registered;
    },

    isLoggedIn(state) {
        return state.loggedIn.success;
    },

    userProfile(state) {
        return state.userProfile;
    },

    tasks(state) {
        return state.tasks;
    }
};

const actions = {
    registerReset({ commit }) {
        commit('registerReset');
    },

    async register({ commit }, user) {
        const res = await userService.register(user);
        if (res.success) {
            commit('registerSuccess');
            return res;
        } else {
            commit('registerFailure');
            return res;
        }
    },

    async login({ commit }, user) {
        const res = await userService.login(user);
        console.log("RES : ", res);
        if (res.success) {

            const userProfile = await userService.getUserProfile();
            if (userProfile.id) {
                console.log("User Profile : ", userProfile);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userProfile", JSON.stringify(userProfile));
                commit('loginSuccess', userProfile);
                console.log("Login SUCCESSFULLY");
                return res;
            } else {
                commit('loginFailure');
                return false;
            }
        } else {
            commit('loginFailure');
            return res;
        }
    },

    async getTasks({ commit }) {
        const res = await userService.getTasks();
        console.log("RES: ", res);
        if (res.success) {
            commit('getTaskSuccess', res.tasks);
            return res.tasks;
        } else {
            commit('getTaskFailure');
            console.log("Get Task Failed");
            return null;
        }
    },

    async createTask({ commit }, task) {
        const res = await userService.createTask(task);
        console.log("create task res : ", res);
        if (res.success) {
            commit('createTaskSuccess', res.task);
            return true;
        } else {
            return false;
        }
    },

    async deleteTask({ commit }, task_ids) {
        const res = await userService.deleteTask(task_ids[0]);
        if (res.success) {
            commit('deleteTaskSuccess', task_ids[1]);
            return true;
        } else {
            return false;
        }
    },

    async updateTask({ commit }, update_task_info) {
        const task_id = update_task_info[0]
        const task_view_idx = update_task_info[1]
        let update_task = {
            id: task_id,
        };
        if (update_task_info[2] !== "") {
            update_task["title"] = update_task_info[2]
        }

        if (update_task_info[3] !== "") {
            update_task["description"] = update_task_info[3]
        }

        console.log("update_task : ", update_task)
        const res = await userService.updateTask(task_id, update_task);
        console.log("TASK ID : ", task_id);
        if (res.success) {
            commit('updateTaskSuccess', [task_view_idx, update_task]);
            return true;
        } else {
            return false;
        }
    }
};

const mutations = {
    registerSuccess(state) {
        state.registered.success = true;
        state.registered.message = 'Register successfully !';
    },

    registerFailure(state) {
        state.registered.success = false;
        state.registered.message = 'Register unsuccessfully !';
    },

    registerReset(state) {
        state.registered.success = false;
        state.registered.message = '';
    },

    loginSuccess(state, userProfile) {
        state.loggedIn.success = true;
        state.loggedIn.message = 'Register successfully !';
        state.userProfile.username = userProfile.username;
        state.userProfile.id = userProfile.id;
    },

    loginFailure(state) {
        state.loggedIn.success = false;
        state.loggedIn.message = 'Register unsuccessfully !';
    },

    loginReset(state) {
        state.loggedIn.success = false;
        state.loggedIn.message = '';
    },

    getTaskSuccess(state, tasks) {
        state.tasks = tasks;
    },

    createTaskSuccess(state, task) {
        console.log("TASK : ", task)
        state.tasks.push(task);
    },

    deleteTaskSuccess(state, task_view_idx) {
        state.tasks.splice(task_view_idx, 1);
    },

    updateTaskSuccess(state, update_info) {
        const task_view_idx = update_info[0]
        const update_task = update_info[1]
        state.tasks[task_view_idx] = update_task;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};