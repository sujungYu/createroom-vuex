<template>
  <div>
      <p>{{sigName}}</p>
      <button>거절</button>
      <button v-on:click="acceptInvitation">수락</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            token:null,
        }
    },
    created() {
        this.token = this.$route.params.token
        this.$store.dispatch('validateInvitationToken', this.token).then((res)=> {
            if(this.$store.getters.isInvitationTokenValid === false){
            alert('invalid invitation url')
            // this.$router.go(-1)
            this.$router.push("/")
            console.log(res);
        }
        }).catch((error) => {
                console.log(error);
    })
    },
    computed: {
        sigName () {
            return this.$store.getters.sigName
        }
    },
    methods: {
        acceptInvitation() {
          this.$store.dispatch('acceptInvitation', {sigId: this.$store.getters.invitationSigId, isLeader:false}).then((res) => {
            alert('invitation succeed')
            this.$router.push(`/room/${this.$store.getters.invitationSigId}`)
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