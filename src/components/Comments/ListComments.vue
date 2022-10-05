<template>
  <div v-for="comment of comments">
    <div className="comment-div">
      <RemoveComment :connector="connector" :commentId="comment['Id']" />
      <div :id="comment['Id']">
        <span className="comment-span">Author: {{ comment["Data"]["UserName"] }}</span>
        <span className="comment-span">Date: {{ new Date(parseInt(comment["Data"]["Time"], 10)).toLocaleString() }} </span>
        <span className="comment-span">Message: {{ comment["Data"]["Text"] }} </span>
      </div>
      <div className="comment-replies">
        <div v-for="reply of comment['Data']['Replies']" style="margin-bottom: 10px">
          <span className="comment-span">Author: {{ reply["UserName"] }}</span>
          <span className="comment-span">Date: {{ new Date(parseInt(reply["Time"], 10)).toLocaleString() }}</span>
          <span className="comment-span">Message: {{ reply["Text"] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import RemoveComment from './RemoveComment.vue';

  export default defineComponent({
    name: 'ListComments',
    components: {
      RemoveComment
    },
    props: ['connector', 'comments']
  });
</script>