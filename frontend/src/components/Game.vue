<template>
  <div id="app">
  <div>
    <div v-if="changedName">
      <input v-model="player" />
      <button @click="changeName">Подтвердить изменение имени</button>
    </div>
    <div v-if="changedName == false">
      <li v-for="value in status.slice().reverse().slice(0,3)">
        <strong>{{ value }}</strong>
      </li>
    </div>
    <div v-if="inventoryShow" class="fon">
      <p>Ваш инвентарь:</p>
    </div>
    <div class="states">
      <div class="fon">
        <p title="Ваш никнейм">{{player}}</p>
        <p title="Опыт">📗{{ xp }}</p>
        <button v-if="lowhp" @click="playerHealth">Исцеление</button>
        <button class="inventory" @click="getInventory">Инвентарь</button>
      </div>
      <img title="Ваш профиль" src="https://moblegends.ru/wp-content/uploads/2020/03/faramis-1.png">
      <div class="fon">
        <p title="Здоровье">❤{{ health }}</p>
        <p title="Атака">🗡{{ attack }}</p>
        <p title="Защита">🧥{{ defence }}</p>
        <button @click="playerAttack">Атака</button>
      </div>
      <div>
        <p>
        <h2>VS</h2>
        </p>
      </div>
      <div class="fon">
        <p title="Здоровье врага">❤{{ healthMob }}</p>
        <p title="Атака врага">🗡{{ attackMob }}</p>
        <p title="Защита врага">🧥{{ defenceMob }}</p>
      </div>
      <img title="Ваш враг" src="https://avatars.mds.yandex.net/get-zen_doc/1628837/pub_5ea02b10fd59420be5ff909e_5ea02ba2f5567254fc35298a/scale_2400">
      <div class="fon">
        <p>{{mob}}</p>
      </div>
    </div>
  </div>
  {{AI}}{{PlayerAI}}{{Win}}{{Lose}}
</div>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Game',
  props: {
    msg: String,
  },
  data() {
    return {
      player: "Игрок ХХХ",
      attack: 2,
      defence: 1,
      health: 10,
      xp: 0,
      mob: "Синий слизень",
      attackMob: 2,
      defenceMob: 1,
      healthMob: 10,
      status: [],
      turnMob: 0,
      countTurn: 0,
      lowhp: false,
      inventoryShow: false,
      changedName: true
    };
  },
  computed: {
    // a computed getter
    Win() {
      // `this` points to the vm instance
      if (this.healthMob < 1) {
        this.healthMob = 10;
        this.xp++;
        this.status.push(`Вы победили, ${this.player}`);
        this.status.push(`Вы получили 1 опыта, ${this.player}`);
        this.lowhp = true
        this.countTurn = 0
      }
    },
    Lose() {
      // `this` points to the vm instance
      if (this.health < 0) {
        this.healthMob = 10;
        this.xp--;
        this.status.push(`Вы проиграли, ${this.player}`);
        this.status.push(`Вы потеряли 1 опыта, ${this.player}`);
        this.lowhp = true
        this.countTurn = 0
      }
    },
    AI() {
      if (this.turnMob == 2 && this.healthMob > 0) {
        this.health = this.health - (this.attackMob - this.defence);
        this.turnMob = 0;
        this.status.push(`${this.mob} нанес ${this.attackMob - this.defence} урона игроку ${this.player}`);
      }
    },
    PlayerAI() {
      this.health < 1 ? this.status.push("Нужно исцеление") : null
      if (this.turnMob == 1 && this.healthMob > 0 && this.health > 0) {
        this.healthMob = this.healthMob - (this.attack - this.defenceMob);
        this.healthMob > 0 ? this.turnMob = 2 : this.turnMob = 0
        this.countTurn++
        this.status.push(`Начался новый цикл битвы: ${this.countTurn}`)
        this.status.push(`Игрок ${this.player} нанес ${this.attack - this.defenceMob} урона врагу ${this.mob}`);
      }
    }
  },
  methods: {
    playerAttack() {
      this.turnMob = 1;
    },
    playerHealth() {
      this.turnMob = 0;
      this.health = 10
      this.lowhp = false
      this.status.push(`Ваше здоровье полностью восстановилось, ${this.player}`);
    },
    getInventory() {
      this.inventoryShow ? this.inventoryShow = false : this.inventoryShow = true
      this.status.push(`Ваш инвентарь пуст, ${this.player}`);
    },
    changeName() {
      this.changedName = false;
      this.status.push(`Имя персонажа успешно задано, теперь вы ${this.player}`);
    }
  }
});
</script>

<style>
    body {
  font-family: system-ui;
  background-image: url(https://cdn.pixabay.com/photo/2016/09/05/15/07/concrete-1646788_960_720.jpg);
  color: black;
  text-align: center;
  display: flex;
}

.states {
    display: flex;
    width: 100px;
    height: 200px;
}

img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 150px;
  box-shadow: -19px 0 22px -19px #000, 19px 0 22px -19px #000;
  background-image: url(https://cdn.pixabay.com/photo/2018/04/29/01/22/tea-plantation-3358870_960_720.jpg);
}
img:hover {
  box-shadow: 0 0 10px 10px rgba(0, 140, 299, 0.5);
}
button:hover {
  box-shadow: 0 0 10px 10px rgba(0, 140, 299, 0.5);
}
p:hover {
  box-shadow: 0 0 5px 5px rgba(0, 140, 186, 0.5);
}
h2:hover {
  box-shadow: 0 0 5px 5px rgba(0, 140, 186, 0.5);
}
hr {
  background: pink
}

div {
  padding: 10px;
}
button {
  margin-left: 10px;
  padding: 10px;
  border-radius: 10px
}

.inventory:hover {
  box-shadow: 0 0 5px 5px rgba(0, 140, 186, 0.5);
}

.fon {
  background-image: url(https://cdn.pixabay.com/photo/2017/02/10/03/12/winter-2054297_960_720.jpg);
}
</style>