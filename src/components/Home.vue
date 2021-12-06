<template>
  <div>
      <router-link to="/createroom" tag="span" style="cursor: pointer">
      방만들기
      </router-link>
      <ul>
          <li v-for="roomlist in roomlists" v-bind:key="roomlist.roomname">
            <router-link :to="/room/ + roomlist.id" tag="span" style="cursor: pointer">
              {{roomlist.roomname}}
            </router-link>
          </li>
      </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      roomlists: []
    }
  },
  created() {
    const url = 'http://localhost:8000/room';
    axios.get(url,{params: {userid: localStorage.getItem("username")}}).then((res) => {
            this.roomlists = res.data;
            console.log(this.roomlists);
        }).catch((error) => {
                console.log(error);
            })
  }

}
</script>

<style>

</style>