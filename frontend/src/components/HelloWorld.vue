<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{got}}</p><hr>
    {{email}}<hr>
    
    <div class="uu">{{password}}</div>
    <input v-model="email" placeholder="email">
    <p>Введенный email: {{ email }}</p>
    <input v-model="password" placeholder="password">
    <p>Введенный email: {{ password }}</p>
    <button v-on:click="createUser">Зарегаться</button><br>
    <label>{{status}}</label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      got: {},
      email: "",
      password: "",
      status: ""
    }
  },
  async created() {
  // GET request using fetch with async/await
  const response = await fetch("http://localhost:3000/user");
  const data = await response.json();
  this.got = data;
  this.email = data["email"]
  this.password = data["password"]
  },
  methods: {
    async createUser() {
      const datas = { email: this.email,
          password: this.password
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datas)
      };
      console.log(requestOptions);
      const response = await fetch("http://localhost:3000/user/post", requestOptions);
      const data = await response.json();
      console.log(data)
      this.got = await data; 
      this.status = `Сервер получил email ${data.email} и следующий пароль ${data.password} вернув их обратно`
    }
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
