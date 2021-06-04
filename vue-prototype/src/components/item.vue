<template>
    <li class="list-group-item"><label class='itemTitle' :class="{ completed: item.complete}">{{item.title}}</label> 
    <div class='showOnHover'>
    <button v-if="!item.complete" class="completeButton" @click="completeItem(item)">Complete</button> 
    <button v-if="item.complete" class="completeButton" @click="unCompleteItem(item)">Unmark</button> 
    <button class="deleteButton" @click="$emit('delete-item')">Remove</button>
    </div>
    </li>
</template>

<script>
export default {
    name: 'ToDoItem',

    props: ['item'],

    methods: {

    completeItem(item){
        item.complete = true;
    },

    unCompleteItem(item){
        item.complete = false;
    }
    }
}
</script>

<style>
li{
    text-align: left;
    width: 84%;
    list-style: none;
    border: solid black 1px;
}

.itemTitle{
    width: 60%;
    margin-top: 2.2%;
}

.completed{
    text-decoration: line-through;
}

.completeButton{
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  margin: 3px 0;
  margin-left: auto ;
  margin-right: 3% ;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
}

.deleteButton{
  background-color: red;
  color: white;
  padding: 10px 20px;
  margin: 3px 0;
  margin-left: auto ;
  margin-right: 3% ;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
}

.showOnHover{
    display: none;
    width: 40%;
    text-align: right;
}

li:hover .showOnHover{
    display: inline-block;
}
</style>