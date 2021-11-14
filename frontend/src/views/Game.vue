<template>
  <div class="game">
    <h1>MMO PRG Offline</h1>
    <Game msg="Ваши данные"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Game from '@/components/Game.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'About',
  components: {
    Game,
  },
});
</script>