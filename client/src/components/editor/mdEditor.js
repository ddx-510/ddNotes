// import react, react-markdown-editor-lite, and a markdown parser you like
import MarkdownIt from 'markdown-it';
import React, { useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import MdEditor from 'react-markdown-editor-lite';

// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { saveNotes } from '../../api/notes';
import { getNoteContent } from '../../api/notes';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// handle change
function handleEditorChange({ html, text }) {
  // console.log('handleEditorChange', html, text);
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
export default function MarkDownEditor({onBack, notes_id}) {
  const [content, setContent] = useState("default");

  useEffect(() => {
    getNoteContent({notes_id}).then(res=>setContent(res.allNotes[0].body));
  }, []);
  
  console.log(content);
  const mdEditor = React.useRef(null);
  const handleClick = () => {
    if (mdEditor.current) {
      const user_id = localStorage.getItem("user_id");
      const title  = "test";
      const body = mdEditor.current.getMdValue();
      saveNotes({user_id, title, body}).then(res => console.log(res));
    }
  };

  return (
    <div>
      {content === "default" ? 'loading' 
      :
      <div>
        <Button variant="outline-danger" onClick={handleClick}>
          Save
        </Button>
        <Button variant="outline-danger" onClick={onBack}>
          Back
        </Button>
        <MdEditor ref={mdEditor} defaultValue = {content} style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} onImageUpload={onImageUpload}/>
      </div>
      }
     </div>
  );
}