import  { DocumentEditor }  from "@onlyoffice/document-editor-vue";
import vSelect from "vue-select";
import ContentControls from "./components/ContentControls/ContentControls.vue"

import config from "./../config/config.json";
import persons from "./data/persons.json";

import "vue-select/dist/vue-select.css";

export default {
  title: 'Samples/Work with forms',
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
      connector: null,
      persons: this.getPersonsOptions(),
      selectedPerson: null,
      contentControls: []
    };
  },
  methods: {
    onDocumentReady() {
      try {
        var editor = window.DocEditor.instances[this.editorId];
        this.connector = editor.createConnector();
        this.connector.connect();

        this.getAllContentControls();

        this.connector.attachEvent("onChangeContentControl", this.onChangeContentControl);
        this.connector.attachEvent("onBlurContentControl", this.onBlurContentControl);
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
    setFormValue(formId, value) {
      this.connector.executeMethod("GetFormsByTag", [formId], function(forms) {
        this.connector.executeMethod("SetFormValue", [forms[0]["InternalId"], value], null);
      }.bind(this));
    },
    getAllContentControls() {
      this.connector.executeMethod ("GetAllContentControls", null, function(data) {
        for (let i = 0; i < data.length; i++) {
          switch (data[i].Tag) {
            case "Male":
              data[i].GroupKey = "Sex";
              data[i].Type = "radio";
              break;
            case "Female":
              data[i].GroupKey = "Sex";
              data[i].Type = "radio";
              break;
            default:
              data[i].Type = "input";
          }
  
          this.connector.executeMethod("GetFormValue", [data[i].InternalId], (value) => {
              data[i].Value = value ? value : "";
              if (data.length - 1 == i) {
                this.contentControls = data.filter((contentControl) => contentControl.Tag != "");
              }
          });
        }
      }.bind(this));
    },
    onChangeContentControl() {
      this.getAllContentControls();
    },
    onBlurContentControl(contentControl) {
      this.selectedPerson = { label: "Custom Data" }
    },
    onChangeSelectedPerson(value) {
      this.selectedPerson = value;
    }
  },
  watch: {
    selectedPerson: function (newValue, oldValue) {
      if (this.selectedPerson && this.selectedPerson.label != "Custom Data") {
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
  template: '<vSelect v-model="selectedPerson" :options="persons"></vSelect> <ContentControls :contentControls="contentControls" @onChangeSelectedPerson="onChangeSelectedPerson" :setFormValue="setFormValue"/> <DocumentEditor :id="editorId" :config="config" :documentServerUrl="documentServerUrl" :events_onDocumentReady="onDocumentReady" />',
});

export const FillingFormTemplate = Template.bind({});
FillingFormTemplate.storyName = "Work with forms";
FillingFormTemplate.args = {
  editorId: "pdfEditor",
  documentServerUrl: config.documentServerUrl,
  config: {
    document: {
      fileType: "pdf",
      key: "pdf" + Math.random(),
      title: "withtags.pdf",
      url: config.demoStorage + "withtags.pdf",
    },
    documentType: "word",
    height:"600px",
    width:"70%"
  },
};