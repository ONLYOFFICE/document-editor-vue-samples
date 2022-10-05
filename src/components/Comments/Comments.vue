<template>
  <div id="blockComments">
    <h3>Comments</h3>
    <AddComment :connector="connector" :userName="userName" />
    <ListComments :connector="connector" :comments="comments" :userName="userName" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListComments from './ListComments.vue';
import AddComment from './AddComment.vue';

export default defineComponent({
  name: 'Comments',
  components: {
    ListComments,
    AddComment
  },
  props: ['userName', 'comments', 'connector'],
  watch: {
    connector: function(newVal, oldVal) { 
      if (this.connector) {
        this.connector.attachEvent("onAddComment",  function (val:any) {
          var comments = this.comments;
          var index = this.comments.findIndex((comment:any) => comment.Id === val.Id)

          if (index == -1) {
            comments.unshift(val);
          }
        }.bind(this));


        this.connector.attachEvent("onRemoveComment",  function (val:any) {
          console.log("onRemoveComment");
          const index = this.comments.findIndex((comment:any) => comment.Id === val.Id);

          if (index !== -1) {
            this.comments.splice(index, 1);
          }
        }.bind(this));

        this.connector.attachEvent("onChangeCommentData",  function (val:any) {
          const index = this.comments.findIndex((comment:any) => comment.Id === val.Id);

          if (index !== -1) {
            this.comments[index].Data = val.Data;
          }
        }.bind(this));
      }
    },
  }
});
</script>

<style>
  h3 {
    text-align: left;
  }

  #blockComments{
    margin: 5px;
    display: inline-block;
    width: 306px;
  }
  
  .comment-div {
    position: relative;
    border-radius: 5px;
    border: 2px solid #000;
    margin: 5px;
    text-align: right;
  }
  
  .comment-span{
    display: block;
    margin: 3px;
    text-align: left;
  }
  
  
  .comment-del-div {
    position: absolute;
    margin-top: 3px;
    margin-right: 5px;
    right: 0;
  } 
  
  .comment-del {
    display: inline-flex;
    width: 1rem;
    height: 1rem;
    position: relative;
    cursor: pointer;
  }
  
  .comment-del::before,
  .comment-del::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1rem;
    height: .1rem;
    background-color: #f00;
    margin: -.05rem 0 0 -.4rem;
    transform: rotate(-45deg);
    border-radius: .1rem;
  }
  
  .comment-del::after {
    transform: rotate(45deg);
  }
  
  .comment-replies{
    padding-left: 24px;
    margin-left: 7px;
    box-sizing: border-box;
    background-image: url(reply.svg);
    background-size: 22px;
    background-repeat: no-repeat;
  }
  
  textarea {
    width: 300px;
    min-height: 100px;
  }
  
  iframe {
    display: inline-block;
  }
</style>