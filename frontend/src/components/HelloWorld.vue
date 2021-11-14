<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{got}}</p><hr><hr>
    
    <div class="uu">
    <input v-model="email" placeholder="email">
    <p>Введенный email: {{ email }}</p>
    <input v-model="password" placeholder="password">
    <p>Введенный пароль: {{ password }}</p>
    <button v-on:click="createUser">Зарегаться</button><br>
    <button v-on:click="clearUsers">Очистить</button><br>
    <label>{{status}}</label></div>
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
    },
    async clearUsers() {
      const response = await fetch("http://localhost:3000/user/clear");
      const data = await response.json();
      this.got = await data; 
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
  color: rgb(255, 123, 0);
}
</style>
<style scoped>
  .hello {
  font-family: system-ui;
  background-image: url(https://ramki-vsem.ru/fon/svetlyj-fon75.jpg);
  color: black;
  text-align: center;
  display: flex;
  }
</style>