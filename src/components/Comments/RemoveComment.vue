<template>
  <div className="comment-del-div">
    <span className="comment-del" v-on:click="removeComment()"></span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'RemoveComment',
    props: ['connector', 'commentId'],
    methods: {
      removeComment() {
        this.connector.executeMethod("RemoveComments", [[this.commentId]]);
      }
    },
  });
</script>