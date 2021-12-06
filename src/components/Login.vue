<template>
  <div>
      <input type="text" placeholder="아이디" v-model="username"><br>
      <input type="password" placeholder="비밀번호" v-model="password" v-on:keyup.enter="login"><br>
      <button v-on:click="login">login</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''

        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
        watch: {
            user (value) {
                if (value !== null && value !== undefined) {
                     this.$router.push('./')
                 }
             }
        },
        methods: {
            login() {
                this.$store.dispatch('signUserIn', {username: this.username, password: this.password})
                console.log(this.user);
            }
        },
    }
</script>