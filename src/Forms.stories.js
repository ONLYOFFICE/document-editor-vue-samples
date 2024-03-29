import  { DocumentEditor }  from "@onlyoffice/document-editor-vue";
import vSelect from "vue-select";
import ContentControls from "./components/ContentControls/ContentControls.vue"

import config from "./../config/config.json";

import "vue-select/dist/vue-select.css";

export default {
  title: 'Samples/Form templates',
  component: DocumentEditor,
  decorators: [() => ({ template: '<div style="height: 400px;"><story/></div>' })],
  parameters: {
    docs: false,
  }
};

const Template = (args) => ({
  components: { DocumentEditor, vSelect, ContentControls },
  data() {
    return {
      documentServerUrl: args.documentServerUrl,
      editorId: args.editorId,
      config: args.config,
      options: [],
      loading: false,
      selectedForm: null,
    };
  },
  mounted() {
      this.loading = true;

      fetch(config.oformsUrl)
        .then(response => response.json())
        .then(json => {
          const fileOforms = json.data.map((item) => item.attributes.file_oform.data.find((f) => f.attributes.ext === ".pdf"));
          this.options = fileOforms.map((form) => {
            return form && form.attributes
              ? { value: form.attributes.url, label: form.attributes.name }
              : null;
            }).filter((o) => o != null);

          this.loading = false;
        });
  },
  watch: {
    selectedForm: function (newValue, oldValue) {
      let newConfig = this.config;
      newConfig = {...newConfig}

      newConfig.document.title = this.selectedForm.label;
      newConfig.document.url = this.selectedForm.value;
      newConfig.document.key = undefined;

      this.config = newConfig;
    }
  },
  template: '<vSelect v-model="selectedForm" :loading="loading" :options="options" :options="persons"></vSelect> <DocumentEditor :id="editorId" :config="config" :documentServerUrl="documentServerUrl" />',
});

export const FormsTemplate = Template.bind({});
FormsTemplate.storyName = "Form templates";
FormsTemplate.args = {
  editorId: "pdfEditor",
  documentServerUrl: config.documentServerUrl,
  config:{
    document: {
      fileType: "pdf",
      key: "pdf" + Math.random(),
      title: "oform.pdf",
      url: config.demoStorage + "oform.pdf",
    },
    documentType: "word",
    height: "600px"
  }
};
