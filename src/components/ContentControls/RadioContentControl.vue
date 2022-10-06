<template>
  <div :id="id" class="control">
    <label>{{ label }}</label>
    <div class="radioControl">
        <span v-for="option of options">
          <input type="radio" :id="option.Tag" :name="id" :checked="isChecked(option.Tag)" v-on:change="onChangeRadio($event)" />
          <label class="radioLabel">{{ getLabel(option.Tag) }}</label>
        </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RadioContentControl',
  props: ['id', 'label', 'options', 'setFormValue'],
  methods: {
    onChangeRadio: function (event: Event) {
      this.setFormValue((event.target as HTMLInputElement).id, true)
    },
    isChecked(nameTag: string) {
      for (var i = 0; i < this.options.length; i++) {
        if (this.options[i].checked == true) {
          return nameTag == this.options[i].Tag;
        }
      }

      return false;
    },
    getLabel(nameTag: string) {
      return nameTag.replace(/([a-z])([A-Z])/g, '$1 $2');
    }
  },
})
</script>