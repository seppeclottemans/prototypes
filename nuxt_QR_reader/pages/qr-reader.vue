<template>
  <div class="container vh-100">
    <h3>Scan a code</h3>
    <client-only>
      <qrcode-stream @decode="onDecode"></qrcode-stream>
    </client-only>
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
    console.log(this.socket);
  },

  methods: {
    onDecode(decodedString) {
      if (this.$store.state.name !== "") {
        this.socket.emit("send-data", decodedString, this.$store.state.name);
      } else {
        this.socket.emit("send-data", decodedString, localStorage.getItem("name"));
      }

      this.$router.push("/succes-page");
    },
  },
};
</script>

<style>

</style>
