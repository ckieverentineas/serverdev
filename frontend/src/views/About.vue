<template>
  <div class="about">
    <h1>This is an about page</h1>
    <HelloWorld msg="Ваши данные"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'About',
  components: {
    HelloWorld,
  },
});
</script>