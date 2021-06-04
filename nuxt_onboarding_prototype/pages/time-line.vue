<template>
  <div>
    <div class="container mt-5 mb-5">
      <div class="row mb-5">
        <div class="col-md-6 offset-md-3">
          <h4>Add to do's</h4>
          <v-form @submit.prevent="submitTodo">
            <div class="form-group">
              <label for="title">Titel</label>
              <input v-model="title" class="form-control" id="title" />
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea v-model="description" class="form-control" id="description" />
            </div>

            <div class="form-group">
              <label>Due to</label>
              <b-form-datepicker v-model="date" class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary" aria-label="Left Align">Add todo</button>
          </v-form>
        </div>
      </div>

      <!-- source: https://bootsnipp.com/snippets/xrKXW -->
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h4 class="mb-4 d-inline-block">Timeline</h4>
          <b-form-checkbox
            class="mb-4 d-inline-block float-right"
            v-model="showAllItems"
            name="check-button"
            switch
          >
            Show all my to do's
          </b-form-checkbox>

          <ul v-if="showAllItems" class="timeline">
            <!-- <p v-if="todos.length <= 0">There are no todo's</p> -->
            <p v-if="$fetchState.pending">Fetching todos...</p>
            <p v-else-if="$fetchState.error">Couldn't get your todo's</p>
            <TimeLineItem
              v-for="todo in todos"
              v-bind:key="todo.id"
              :todo="todo"
              v-on:delete-todo="deleteToDo(todo.id)"
              v-on:todo-mark-done="markAsDone(todo, true)"
              v-on:todo-mark-undone="markAsDone(todo, false)"
            >
            </TimeLineItem>
          </ul>

          <ul v-else class="timeline">
            <div class="form-group">
              <label>Select date</label>
              <b-form-datepicker v-model="chosenDate" class="form-control" />
            </div>
            <p v-if="$fetchState.pending">Fetching todos...</p>
            <p v-else-if="$fetchState.error">Couldn't get your todo's</p>
            <p v-if="itemsOfChosenDate.length <= 0">There are no todo's</p>
            <TimeLineItem
              v-for="todo in itemsOfChosenDate"
              v-bind:key="todo.id"
              :todo="todo"
              v-on:delete-todo="deleteToDo(todo.id)"
            >
            </TimeLineItem>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeLineItem from "@/components/TimeLineItem";
import { mapActions, mapGetters } from "vuex";


export default {
  middleware: "auth",

  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  async fetch() {
    const user = this.$auth.user;
    try {
      await this.$http.$get(
        `http://localhost:3001/api/api/todos/?userId=${user.id}`
      ).then(response => {
        this.todos = response;
      });
      } catch (e) {
      console.log('error')
      this.todos = JSON.parse(localStorage.getItem("todos"));
      console.log(e);
    }
      this.sortTodos();
  },

  components: {
    TimeLineItem,
  },
  data() {
    return {
      title: "",
      description: "",
      date: "",
      todos: [],
      showAllItems: true,
      chosenDate: new Date(),
      itemsOfChosenDate: [],
      uploaded: false
    };
  },


  watch: {
  showAllItems: {
    handler: function(){
      this.getItemsByDay();
    }
  },
  chosenDate: {
    handler: function(){
      this.getItemsByDay();
    }
  },
},

  mounted () {

    const channel = new BroadcastChannel('sw-todos-messages');
    channel.addEventListener('message', this.setAllItemsUploaded);
  },

  methods: {

    setAllItemsUploaded(){
      this.todos.forEach(todo => {
        todo.uploaded = true;
      });
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },

    //  add to front-end
    addTodo() {
      if (this.title !== "" && this.description !== "" && this.date !== "") {
        let newItem = {
          title: this.title,
          description: this.description,
          done: false,
          date: this.date,
          uploaded: this.uploaded
        };

        this.todos.splice(0, 0, newItem);
        this.sortTodos();
        localStorage.setItem("todos", JSON.stringify(this.todos));

        this.title = ''
        this.description = ''
        this.isSaving = false
      }
    },


    // add to db
          ...mapActions(['saveTodo']),
    async submitTodo() {
      if(this.title !== '' && this.description !== '' && this.date !== ''){
      this.isSaving = true;
      this.uploaded = await this.saveTodo({
        title: this.title,
        description: this.description,
        date: this.date
      });
      this.addTodo();
    }
    },

    deleteToDo(id){
      let index = this.todos.map(todo => todo.id).indexOf(id);
      this.todos.splice(index, 1);
      
      try {
        this.$axios.delete(`/api/todos/${id}`)
    } catch (e) {
      console.log(e);
    }

    if (this.showAllItems === false) {
      this.getItemsByDay();
    }
    },

    markAsDone(todo, done){
      todo.done = done;

      try {
        this.$axios.put(`/api/todos/${todo.id}`, todo)
    } catch (e) {
      console.log(e);
    }
    },

    sortTodos() {
      this.todos.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
    },

    getItemsByDay() {
      if (this.showAllItems === false) {
        var localChosenDate = new Date(this.chosenDate).toDateString();
        localChosenDate = this.formatDate(localChosenDate);

        this.itemsOfChosenDate = this.todos.filter(function (todo) {
          return (
            new Date(todo.date).getTime() ===
            new Date(localChosenDate).getTime()
          );
        });
      }
    },

    formatDate(date) {
      // source: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
</style> 