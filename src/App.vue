<template>
  <div id="app">
    <Menu />
    <Game msg="TopBandz" />
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Game from "./components/Game.vue";
import Menu from "./components/Menu.vue";

export default {
  name: "App",
  components: {
    Game,
    Menu,
    Footer,
  },
};
</script>
