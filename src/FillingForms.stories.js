import  { DocumentEditor }  from "@onlyoffice/document-editor-vue";
import config from "./../config/config.json";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import persons from "./data/persons.json";

export default {
  title: 'Samples/Work with forms',
  component: DocumentEditor,
  decorators: [() => ({ template: '<div style="height: 400px;"><story/></div>' })],
  parameters: {
    docs: false,
  },
  argTypes: {
    events_onAppReady: { action: 'onAppReady' },
    events_onDocumentReady: { action: 'onDocumentReady' },
    events_onDocumentStateChange: { action: 'onDocumentStateChange' },
    events_onError: { action: 'onError' }
  },
};

const Template = (args) => ({
  components: { DocumentEditor, vSelect },
  data() {
    return {
      documentServerUrl: args.documentServerUrl,
      editorId: args.editorId,
      config: args.config,
      persons: this.getPersonsOptions(),
      selectedPerson: null,
      connector: null
    };
  },
  methods: {
    onDocumentReady() {
      try {
        var editor = window.DocEditor.instances[this.editorId];
        this.connector = editor.createConnector();
        this.connector.connect();

        // this.getAllContentControls();
        // this.connector.attachEvent("onChangeContentControl", this.onChangeContentControl);
      } catch (err) {
        console.error(err);
      }
    },
    getPersonsOptions() {
      let personsOptions = [];
      for(let i = 0; i < persons.length; i++) {
        personsOptions[i] = {
          label: persons[i].FirstName +" "+ persons[i].LastName,
          value: persons[i]
        }
      }

      return personsOptions;
    },
    setFormValue (formId, value) {
      this.connector.executeMethod("GetFormsByTag", [formId], function(forms) {
        this.connector.executeMethod("SetFormValue", [forms[0]["InternalId"], value], null);
      }.bind(this));
    }
  },
  watch: {
    selectedPerson: function (newValue, oldValue) {
      if (this.selectedPerson) {
        for (var [key, value] of Object.entries(this.selectedPerson.value)) {
          if (key == "Sex") {
            key = value == "Male" ? "Male" : "Female";
            value = "true";
          }

           this.setFormValue(key, value || "");
        }
      }
    }
  },
  template: '<vSelect v-model="selectedPerson" :options="persons"></vSelect> <DocumentEditor :id="editorId" :config="config" :documentServerUrl="documentServerUrl" :events_onDocumentReady="onDocumentReady" />',
});

export const FillingFormTemplate = Template.bind({});
FillingFormTemplate.storyName = "Work with forms";
FillingFormTemplate.args = {
  editorId: "oformEditor",
  documentServerUrl: config.documentServerUrl,
  config: {
    document: {
      fileType: "oform",
      title: "demo.oform",
      url: config.demoStorage + "withtags.oform",
    },
    documentType: "word",
    height:"600px",
    width:"70%"
  },
};