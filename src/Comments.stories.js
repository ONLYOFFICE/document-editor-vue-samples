import { DocumentEditor } from "@onlyoffice/document-editor-vue";
import Comments  from "./components/Comments/Comments.vue"
import config from "../config/config.json";

export default {
  title: 'Samples/Work with comments',
  component: Comments,
  decorators: [() => ({ template: '<div style="height: 400px;"><story/></div>' })],
  parameters: {
    docs: false,
  }
};

const Template = (args) => ({
  components: { Comments, DocumentEditor },
  data() {
    return {
      documentServerUrl: args.documentServerUrl,
      editorId: args.editorId,
      userName: args.userName,
      config: {
        document: {
          fileType: "docx",
          key: "docx" + Math.random(),
          title: "demo.docx",
          url: config.demoStorage + "withcomments.docx",
        },
        documentType: "word",
        editorConfig: {
          mode: "edit",
          user: {
              name: args.userName,
          },
        },
        width: "70%",
        height: "600px"
      },
      comments: [],
      connector: null
    };
  },
  methods: {
    onDocumentReady() {
      var editor = window.DocEditor.instances[this.editorId];
      var connector = editor.createConnector();

      connector.executeMethod("GetAllComments", null, function(comments) {
        let commentsRevers = [];
        for (var i = 0; i < comments.length; i++){
          commentsRevers[i] = comments[(comments.length - 1) - i];
        }
        this.comments = commentsRevers;
      }.bind(this));
      
      this.connector = connector;
    }
  },
  template: '<Comments :userName="userName" :comments="comments" :connector="connector"  /> <DocumentEditor :id="editorId" :config="config" :documentServerUrl="documentServerUrl" :events_onDocumentReady="onDocumentReady" />',
});

export const CommentsTemplate = Template.bind({});
CommentsTemplate.storyName = "Work with comments";
CommentsTemplate.args = {
  editorId: "docxForComments",
  userName: "John Smith",
  documentServerUrl: config.documentServerUrl
};
