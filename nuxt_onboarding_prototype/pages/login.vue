<template>
<div>
  <!-- source: https://www.sitepoint.com/premium/books/build-your-own-link-sharing-site-with-nuxt-js-and-vue-kindergarten/read/1 -->
  <v-form @submit.prevent="onSubmit">
    <div class="container">
      <div class="field">
        <label class="label">Email</label>
        <v-text-field
          v-model="email"
          type="email"
          placeholder="Your Email"
          autofocus
        />
      </div>
      <div class="field">
        <label class="label">Password</label>
        <v-text-field
          v-model="password"
          class="input"
          type="password"
          placeholder="Your Password"
        />
      </div>
      <div class="field">
        <div class="control">
          <v-btn type="submit" class="button is-block is-info is-fullwidth">Login</v-btn>
        </div>
      </div>
    </div>
  </v-form>
  <div
            v-if="showError"
            class="notification is-danger"
          >
            <strong>Oops — we couldn't log you in!</strong><br>
            Please check your email and password and try again.
          </div>
          </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    showError: false
  }),
  methods: {
    async onSubmit() {
      try {
        await this.$auth.login({
          data: {
            email: this.email,
            password: this.password
          }
        })
      } catch (error) {
        this.showError = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style> 