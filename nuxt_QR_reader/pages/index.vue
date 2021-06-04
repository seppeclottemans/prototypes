<template>
  <b-form @submit="saveName" class="vh-100">
    <b-container class="vertical-center vh-50" >
      <b-col>
    <b-form-group
      label="Name:"
      description="Enter your name"
    >
      <b-form-input
        id="input-1"
        v-model="name"
        required
        placeholder="Enter name"
      ></b-form-input>
    </b-form-group>
      </b-col>
    

<b-col>
      <b-button
        type="submit"
        variant="primary"
        style="width: 25%"
        >Submit</b-button
      >
</b-col>
      </b-container>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },

  methods: {
    saveName(e) {
      if (this.name !== "") {
        e.preventDefault();
        this.$store.commit("setName", this.name);
        localStorage.setItem("name", this.name);
        this.$router.push("/qr-reader");
      }
    },
  },
};
</script>

<style>
.vertical-center {
  margin-top: 20vh;
}
</style>
