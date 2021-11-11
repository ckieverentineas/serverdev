<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{got}}</p><hr>
    {{name}}<hr>
    
    <div class="uu">{{password}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      got: {},
      name: "",
      password: ""
    }
  },
  async created() {
  // GET request using fetch with async/await
  const response = await fetch("http://localhost:3000/user");
  const data = await response.json();
  this.got = data;
  this.name = data["email"]
  this.password = data["password"]
}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.uu {
  color: aqua;
}
</style>
