<template>
  <div id="wrapper">
    <form v-on:submit.prevent="addItem()">
      <input
        type="text"
        class="input"
        placeholder="add a to do item"
        v-model="entry"
      />
      <button type="submit" class="submit">Add</button>
    </form>

    <ul class="list-group" id="uncompletedItemList">
        <ToDoItem v-for="toDoItem in todoList" v-bind:key="toDoItem.id" :item='toDoItem' v-on:delete-item="removeToDo(ToDoItem)"></ToDoItem>
    </ul>
  </div>
</template>

<script>
import ToDoItem from './item';

export default {
    name: 'ToDoList',
    components: {
            ToDoItem
    },

  data() {
    return {
      entry: "",
      todoList: [],
    };
  },

  methods: {
      addItem() {
        if(this.entry !== ''){
            let newToDoItem = {
                title: this.entry,
                complete: false
            }

            this.todoList.splice(0,0,newToDoItem);
        }
      },

    removeToDo(item){
          this.todoList.splice(this.todoList.indexOf(item), 1)
    },

    
  }
};
</script>

<style>
body {
  font-family: "Times New Roman", Times, serif;
}

#credit {
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}

/* source: https://www.w3schools.com/css/tryit.asp?filename=trycss_forms */
.input {
  width: 60%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 2%;
  box-sizing: border-box;
  margin-bottom: 30px;
}

.submit {
  width: 10%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

ul{
    margin-left: 14%;
}

li{
    height: 80px;
}
</style>