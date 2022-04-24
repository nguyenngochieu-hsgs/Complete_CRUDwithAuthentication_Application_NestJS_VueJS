<template>
  <div class="home container">
    <h1>Dashboard</h1>
    <p>{{ userProfile.username }}</p>
    <p>{{ userProfile.id }}</p>
    <form>
      <input
        type="text"
        id="add_task"
        class="form-control"
        v-model="new_task_title"
        placeholder="Add task title"
      />
      <label class="form-label" for="add_task"></label>
      <button type="submit" class="btn btn-secondary" @click="addTask">
        Add
      </button>
    </form>

    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="task in tasks">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td><button class="btn btn-primary">Update</button></td>
          <td><button class="btn btn-danger">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template> 

  

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      userProfile: {},
      tasks: [],
      new_task_title: "",
    };
  },

  computed: {
    ...mapGetters("user", {
      getUserProfile: "userProfile",
      _tasks: "tasks",
    }),
  },

  methods: {
    ...mapActions("user", {
      getTasks: "getTasks",
      createTask: "createTask",
    }),

    async addTask(e) {
      e.preventDefault();
      console.log(this.new_task_title);
      const new_task = {
        title: this.new_task_title,
        description: "",
      };
      console.log(new_task);
      await this.createTask(new_task);
      this.new_task_title = "";
      this.tasks = this._tasks;
    },
  },

  async mounted() {
    console.log(localStorage.getItem("userProfile"));
    this.userProfile = JSON.parse(localStorage.getItem("userProfile"));
    this.tasks = await this.getTasks();
  },
};
</script> 

  

<style scoped>
form {
  display: flex;
  gap: 10px;
  margin: 10px;
}
</style> 

 