<template>
  <div class="control">
    <label>{{ label }}</label>
    <input :id="id" :value="value" v-on:keyup="onChangeInput($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputContentControl',
  props: ['id', 'value', 'label', 'setFormValue'],
  methods: {
    onChangeInput: function (event: Event) {
      this.setFormValue((event.target as HTMLInputElement).id, (event.target as HTMLInputElement).value)
    }
  },
})
</script>