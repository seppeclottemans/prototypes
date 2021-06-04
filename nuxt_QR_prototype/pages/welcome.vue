<template>
  <div class="container">
    <div class="container vh-100">
      <h1 class="text-center">Welcome {{name}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store.state.name);
     if (this.$store.state.name !== "" || this.$store.state.name !== undefined) {
        this.name = this.$store.state.name
      } else {
        this.name = localStorage.getItem('name');
      }
  },

  data() {
    return {
      name: "",
    };
  },

  methods: {
      
  },
};
</script>


