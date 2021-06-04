<template>
  <li>
    <b-card
      no-body
      class="mb-2"
    >

    <b-card-body>
      <img v-if="todo.uploaded" class="icon float-right" src="/wifi.png" />
      <img v-else class="icon float-right" src="/no-wifi.png" />

      <b-card-title v-bind:class="{ done: todo.done }">{{ todo.title }}</b-card-title>      
      <b-card-sub-title class="mb-2">{{ todo.date }} {{ todo.uploaded }}</b-card-sub-title>
      <b-card-text>
        {{ todo.description }}
      </b-card-text>
      <b-button v-if="!todo.done" @click="$emit('todo-mark-done')" variant="primary" aria-label="Left Align">Done</b-button>
      <b-button v-if="todo.done" @click="$emit('todo-mark-undone')" variant="primary" aria-label="Left Align">Undo</b-button>
      <b-button @click="$emit('delete-todo')" variant="danger" aria-label="Center Align">Delete</b-button>
    </b-card-body>
    </b-card>
  </li>
</template>

<script>
export default {
  name: "TimeLineItem",

  props: ["todo"],

  methods: {},
};
</script>

<style>
.done {
  text-decoration: line-through;
}

.icon{
  width: 5%;
}
</style>