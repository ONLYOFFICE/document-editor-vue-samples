<template>
  <div className="reviewBlock">
    <button v-on:click="prevReview">Prev</button>
    <button v-on:click="nextReview">Next</button>
    <button v-on:click="acceptReview">Accept</button>
    <button v-on:click="rejectReview">Reject</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Review',
  props: ['connector'],
  methods: {
    prevReview() {
      this.connector.executeMethod("MoveToNextReviewChange", [false]);
    },
    nextReview() {
      this.connector.executeMethod("MoveToNextReviewChange");
    },
    acceptReview() {
      this.connector.executeMethod("AcceptReviewChanges");
    },
    rejectReview() {
      this.connector.executeMethod("RejectReviewChanges");
    }
  }
});
</script>

<style>
  .reviewBlock {
    text-align: center;
    margin-bottom: 16px;
  }

  button {
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 700;
    border: 0;
    border-radius: 3em;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    font-size: 12px;
    padding: 10px 16px;
    color: #333;
    background-color: transparent;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
    margin-right: 5px;
  }

  button:hover {
    background: rgb(221, 235, 250);
  }
</style>