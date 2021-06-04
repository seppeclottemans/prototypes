<template>
  <div class="p-5">
      <!-- source: https://bootstrap-vue.org/docs/components/form -->
    <b-form @submit="login">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
        type="password"
          id="input-2"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
      layout: 'base',
    auth: 'guest',
      
    data() {
      return {
          form: {
            username: '',
            password: ''
          },
          error: ''
      }
    },
    methods: {
      async login(e) {
          e.preventDefault();
          
          this.error = null
        await this.$auth.loginWith('laravelPassportPassword', { data: this.form })
        .then(() => this.$router.push('/'))
        .catch((error) => (this.error = 'Incorrect email or password.'))
        console.log(this.$auth.user)
      }
    }
  }
</script>