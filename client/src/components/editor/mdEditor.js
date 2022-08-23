// import react, react-markdown-editor-lite, and a markdown parser you like
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// handle change
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

// get the current file as an image blob 
// todo: link the uploaded image to backend server
function onImageUpload(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = data => {
      resolve(data.target.result);
    };
    reader.readAsDataURL(file);
  });
}

// this.mdEditor.getMdValue()
function MarkDownEditor() {
  return (
    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} onImageUpload={onImageUpload}/>
  );
}

export default MarkDownEditor;