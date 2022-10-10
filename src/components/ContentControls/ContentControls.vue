<template>
  <div class="controlBlock">
    <div v-for="contentControl of computedContentControls">
      <InputContentControl v-if="contentControl.Type === 'input'"
        :id="contentControl.Tag"
        :label="getLabel(contentControl.Tag)"
        :value="contentControl.Value"
        @onChangeSelectedPerson="onChangeSelectedPerson"
        :setFormValue="setFormValue" />
      <RadioContentControl v-else-if="contentControl.Type === 'radio'"
        :id="contentControl.Tag"
        :label="getLabel(contentControl.Tag)"
        :options="contentControl.Value"
        @onChangeSelectedPerson="onChangeSelectedPerson"
        :setFormValue="setFormValue" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputContentControl from './InputContentControl.vue';
import RadioContentControl from './RadioContentControl.vue';

export default defineComponent({
  name: 'ContentControls',
  components: { InputContentControl, RadioContentControl },
  props: ['contentControls', 'setFormValue'],
  methods: {
    getLabel(nameTag: string) {
      return nameTag.replace(/([a-z])([A-Z])/g, '$1 $2');
    },
    onChangeSelectedPerson(value: any) {
      this.$emit('onChangeSelectedPerson', value);
    }
  },
  computed: {
    computedContentControls() {
      let copyContentControls: any[] = [];

      for (i = 0; i < this.contentControls?.length; i++) {
        var copyContentControl = this.contentControls[i];
        copyContentControls[i] = {...copyContentControl};
      }

      let groupsRadioControls: any[] = copyContentControls.filter(contentControl => contentControl.Tag != "" && contentControl.Type == "radio").reduce((r, a) => {
        r[a.GroupKey] = r[a.GroupKey] || [];
        r[a.GroupKey].push({Tag: a.Tag, checked: a.Value});
        return r;
      }, {});

      for (const [key, value] of Object.entries(groupsRadioControls)) {
        let index = [];
        let first = true;

        for (var i = 0; i < copyContentControls.length; i++) {
          if (copyContentControls[i].GroupKey && copyContentControls[i].GroupKey == key) {
            index.push(i);
          } 
        }

        for (var i = 0; i < index.length; i++) {
          if (first) {
            copyContentControls[index[i]].Tag = key;
            copyContentControls[index[i]].Value = value;
            first = false;
          } else {
            copyContentControls.splice(index[i], 1);
          }
        }
      }

      return copyContentControls.filter(contentControl => contentControl.Tag != "");
    }
  }
});
</script>

<style>
  .controlBlock {
    width: 370px;
    text-align: right;
    margin-bottom: 20px;
    display: inline-block;
  }
  
  .control {
    margin: 5px;
  }
  
  .radioControl {
    text-align: left;
    display: inline-block;
    width: 193px;
  }
  
  label {
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    display: inline-block;
    padding-right: 10px;
  }
  
  .radioLabel {
    padding-left: 5px;
  }
  
  input {
    color: rgb(51, 51, 51);
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 0px 1px inset;
    line-height: 16px;
    padding: 6px 12px;
    border-radius: 3em;
    border: none;
    box-sizing: border-box;
    margin: 0px;
  }
  
  iframe {
    display: inline-block;
  }
</style>