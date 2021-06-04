<template>
  <div class="container vh-100">
    <div class="h-100 row align-items-center" id="center">
      <div class="col">
        <h1 class="text-center">scan to login:</h1>
        <client-only>
          <qr-code class="d-flex justify-content-center mt-5" :text="uuid"></qr-code>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.socket = this.$nuxtSocket({
      name: "home", // Use socket "home"

      // socket.io-client opts:
      reconnection: true,
    });

    this.socket.on("receive-user-data", (name) => {
      this.$store.commit("setName", name);
      console.log(this.$store.state.name);
      localStorage.setItem("name", name);
      this.$router.push("/welcome");
    });

    this.socket.on("connect", () => {
      this.setQrId(this.socket.id);
    });

    this.setQrId();
  },

  data() {
    return {
      uuid: "",
    };
  },

  methods: {
    setQrId(id) {
      this.uuid = id;
    },

  },
};
</script>


