import { DocumentEditor } from "@onlyoffice/document-editor-vue";
import Review  from "./components/Review/Review.vue"
import config from "../config/config.json";

export default {
  title: 'Samples/Work with review',
  component: Review,
  decorators: [() => ({ template: '<div style="height: 400px;"><story/></div>' })],
  parameters: {
    docs: false,
  }
};

const Template = (args) => ({
  components: { Review, DocumentEditor },
  data() {
    return {
      documentServerUrl: args.documentServerUrl,
      editorId: args.editorId,
      config: {
        document: {
          fileType: "docx",
          title: "demo.docx",
          url: config.demoStorage + "review.docx",
          permissions: {
            edit: false,
            review: true
          }
        },
        editorConfig: {
          mode: "edit"
        },
        documentType: "word",
        height: "600px"
      },
      connector: null
    };
  },
  methods: {
    onDocumentReady() {
      var editor = window.DocEditor.instances[this.editorId];
      var connector = editor.createConnector();
      
      this.connector = connector;
    }
  },
  template: '<Review :connector="connector"  /> <DocumentEditor :id="editorId" :config="config" :documentServerUrl="documentServerUrl" :events_onDocumentReady="onDocumentReady" />',
});

export const CommentsTemplate = Template.bind({});
CommentsTemplate.storyName = "Work with review";
CommentsTemplate.args = {
  editorId: "docxForReview",
  documentServerUrl: config.documentServerUrl
};
