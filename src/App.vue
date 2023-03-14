<template>
  <Comments 
    userName="John Smith"
    :comments="comments" 
    :connector="connector"
    />

  <DocumentEditor 
    id="docEditor" 
    documentServerUrl="http://192.168.0.169/"
    :config="config"
    :events_onDocumentReady="onDocumentReady"
    /> 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DocumentEditor } from "@onlyoffice/document-editor-vue";
import Comments  from "./components/Comments/Comments.vue"
 
export default defineComponent({
  name: 'App',
  components: {
    DocumentEditor,
    Comments
  },
  data() {
    return {
      config: {
        document: {
            fileType: "docx",
            key: "docx" + Math.random(),
            title: "demo.docx",
            url: "https://d2nlctn12v279m.cloudfront.net/assets/docs/samples/withcomments.docx",
        },
        documentType: "word",
        width: "70%",
        height: "600px"
      },
      comments: [],
      connector: null
    }
  },
  methods: {
    onDocumentReady() {
      var editor = window.DocEditor.instances["docEditor"];
      var connector = editor.createConnector();

      connector.executeMethod("GetAllComments", null, function(comments: any) {
        let commentsRevers = [];
        for (var i = 0; i < comments.length; i++){
          commentsRevers[i] = comments[(comments.length - 1) - i];
        }
        this.comments = commentsRevers;
      }.bind(this));
      
      this.connector = connector;
    }
  },
});
</script>

<style>
#app {
  text-align: center;
}
</style>
