<template>
  <div>
      <Invite/>
  </div>
</template>

<script>
import Invite from './Invite.vue'
export default {
  components: {
       Invite 
    },
    // props: [
    //   'id'
    // ],
    created() {
        // console.log(this.$store.getters.sigId);
        this.$store.dispatch('setSigAll')
    }
  

}
</script>

<style>

</style>