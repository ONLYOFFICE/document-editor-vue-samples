<template>
    <div v-if="displayAddReply">
      <textarea style="width:270px; margin-right: 8px;" v-model="reply"></textarea>
      <button v-on:click="addCommentReply()">Add</button>
      <button v-on:click="displayAddReply = false; reply = ''">Cancel</button>
    </div>
    <button v-else v-on:click="displayAddReply = true">Add reply</button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'AddCommentReply',
    props: ['connector', 'userName', 'comment'],
    data() {
        return {
          reply: "",
          displayAddReply: false
        }
    },
    methods: {
      addCommentReply () {
        if (Boolean(this.reply)) {
          var currentdate = Date.now(); 
          var datetime = "" + currentdate;

          this.comment["Data"]["Replies"].push({ Text: this.reply, Time: datetime, UserName: this.userName });

          this.connector.executeMethod("ChangeComment", [this.comment["Id"], this.comment["Data"]]);
          this.reply = "";
          this.displayAddReply = false;
        }
      }
    },
  });
</script>