<template>
  <div>
      <input placeholder="방 이름을 입력하세요" v-model="roomname" type="text" >
      <button v-on:click="cancel">취소</button>
      <button v-on:click="create">생성</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            roomname: []
        }
    },
    methods: {
        cancel() {
            this.$router.go(-1) //한단계 뒤로
        },
        create() {
            var url = 'http://localhost:8000/room/';
            var data = {
                 roomname: this.roomname,
                 manager: localStorage.getItem("username")
             }
             axios.post(url, data).then((res) => {
                 this.acceptInvitation(res.data.id)
                 console.log(res.data.id);
             }).catch((error) => {
                console.log(error);
            })
            
        },
        acceptInvitation(sigId) {
                this.$store.dispatch('acceptInvitation', sigId).then((res) => {
                alert('invitation succeed')
                this.$router.push(`/room/${sigId}`)
                console.log(res);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

}
        
        
    


</script>

<style>

</style>