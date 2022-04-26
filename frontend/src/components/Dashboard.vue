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
        <tr v-for="(task, task_view_idx) in tasks" :key="task.id"> 
          <td>{{ task.title }}</td> 
          <td>{{ task.description }}</td> 
          <td> 
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" @click="openUpdateModal(task.id, task_view_idx)"> 
              Update {{task.id}}
            </button> 
            <!-- Modal --> 
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" :data="updateData"> 
              <div class="modal-dialog" role="document"> 
                <div class="modal-content"> 
                  <div class="modal-header"> 
                    <h5 class="modal-title" id="exampleModalLabel">Update task</h5> 
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"> 
                      <span aria-hidden="true">&times;</span> 
                    </button> 
                  </div> 
                  <form> 
                    <div class="modal-body"> 
                      <input 
                        type="text" 
                        id="update_task_title" 
                        class="form-control" 
                        v-model="update_task_title" 
                        placeholder="Update task title" 
                      /> 
                      <label class="form-label" for="update_task_title"></label> 
                      <input 
                        type="text" 
                        id="update_task_description" 
                        class="form-control" 
                        v-model="update_task_description" 
                        placeholder="Update task description" 
                      /> 
                      <label class="form-label" for="update_task_description"></label> 
                    </div> 
                    <div class="modal-footer"> 
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> 
                      <h3>{{updateData.task_id}}</h3>
                      <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="updateTask($event, updateData.task_id, updateData.task_view_id)">Save changes</button> 
                    </div> 
                  </form> 
                </div>
              </div> 
            </div> 
          </td>
          <td><button class="btn btn-danger" @click="delTask(task.id, task_view_idx)">Delete</button></td>          
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
      update_task_title: "",
      update_task_description: "",
      updateData: {},
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
      deleteTask: "deleteTask", 
      changeTask: "updateTask" 
    }), 

    async addTask(e) { 
      e.preventDefault(); 
      const new_task = { 
        title: this.new_task_title, 
        description: "", 
      }; 
      await this.createTask(new_task); 
      this.new_task_title = ""; 
      this.tasks = this._tasks; 
    }, 

    async delTask(taskId, task_view_idx) { 
      console.log("Delete task 123123123 : ", task_view_idx) 
      const deleteResult = await this.deleteTask([taskId ,task_view_idx]); 
      console.log("XOA THANH CONG : ", deleteResult); 
      this.tasks = this._tasks; 
    }, 

    openUpdateModal(task_id, task_view_id) {
      this.updateData = {
        task_id : task_id,
        task_view_id: task_view_id
      }
    },

    async updateTask(e, taskId, task_view_idx) { 
      e.preventDefault();
      console.log("task ID : ",taskId);
      console.log(task_view_idx);
      const updateResult = await this.changeTask([taskId, task_view_idx, this.update_task_title, this.update_task_description]); 
      console.log(updateResult);
      this.tasks = this._tasks;
      this.updateData = {};
      this.update_task_title = "";
      this.update_task_description = "";
    } 
  }, 

  async mounted() { 
    console.log(localStorage.getItem("userProfile")); 
    this.userProfile = JSON.parse(localStorage.getItem("userProfile")); 
    this.tasks = await this.getTasks(); 
    console.log(this.tasks); 
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

 