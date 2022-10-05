<template>
  <div style="text-align: right;">
    <span style="display: block; text-align: left;">Enter your comment:</span>
    <textarea v-model="comment"></textarea>

    <button v-on:click="addComment()">Send</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'AddComment',
    props: ['connector', 'userName'],
    data() {
        return {
          comment: ""
        }
    },
    methods: {
      addComment () {
        if(Boolean(this.comment)) {
          var currentdate = Date.now(); 
          var datetime = "" + currentdate;

          this.connector.executeMethod("AddComment",[{Text: this.comment, UserName: this.userName, Time: datetime}]);
          this.comment = "";
        }
      }
    },
  });
</script>