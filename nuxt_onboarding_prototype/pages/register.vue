<template>
<!-- source: https://www.sitepoint.com/premium/books/build-your-own-link-sharing-site-with-nuxt-js-and-vue-kindergarten/read/1 -->
  <v-form class="section">
    <div class="container">
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <v-text-field
            v-model="username"
            type="text"
            autofocus
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <v-text-field
            v-model="email"
            class="input"
            type="text"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <v-text-field
            v-model="password"
            class="input"
            type="password"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <v-btn
            :disabled="isSaving"
            class="button is-link"
            @click="registerUser"
          >Register</v-btn>
        </div>
      </div>
    </div>
  </v-form>
</template>


<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    isSaving: false,
    username: null,
    email: null,
    password: null
  }),
  methods: {
    ...mapActions(['saveUser']),
    async registerUser() {
      this.isSaving = true
      await this.saveUser({
        username: this.username,
        email: this.email,
        password: this.password
      })
      this.$auth.login({
        data: {
          email: this.email,
          password: this.password
        }
      })
      this.$router.push('/')
    }
  }
}
</script>