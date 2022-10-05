<template>
  <div className="comment-del-div">
    <span className="comment-del" v-on:click="removeCommentReply()"></span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'RemoveCommentReply',
    props: ['connector', 'comment', 'replyId'],
    methods: {
      removeCommentReply() {
        let commentData = this.comment["Data"];
        commentData["Replies"].splice(this.replyId, 1);

        this.connector.executeMethod("ChangeComment", [this.comment["Id"], commentData]);
      }
    },
  });
</script>