// import react, react-markdown-editor-lite, and a markdown parser you like
import MarkdownIt from 'markdown-it';
import React, { useState, useEffect} from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
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
  const [formValue, setFormValue] = useState("");
  const [isNewNote, setIsNewNote] = useState(false);

  useEffect(() => {
    if ((notes_id) !== "new" ){ // not new note, edit mode
      getNoteContent({notes_id}).then(res => {
        setIsNewNote(false);
        setContent(res.allNotes[0].body);
        setFormValue(res.allNotes[0].title);
      });
      setFormValue("");
    } else {
      setIsNewNote(true);
      setContent("") // new notes, set default to null
    }
  }, [notes_id]);
  
  // console.log(content);
  const mdEditor = React.useRef(null);
  const handleClick = () => {
    if (mdEditor.current) {
      const user_id = localStorage.getItem("user_id");
      const title  = formValue;
      const body = mdEditor.current.getMdValue();
      saveNotes({user_id, title, body}).then(res => {
        console.log(res);
        if (res !== undefined) {
          alert(`${title} is successfully saved !`);
          setIsNewNote(false);
        } else {
          alert(`Error content and title cannot be empty :(`);
        }
      });
    }
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    setFormValue(event.target.value);
  }

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
        <Form>
          <Row>
          <Col xs={7}>
            <Form.Control placeholder="Enter a title" value={formValue} onChange={handleChange} disabled={!isNewNote}/>
          </Col>
          </Row>
        </Form>
        <MdEditor ref={mdEditor} defaultValue = {content} style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} onImageUpload={onImageUpload}/>
      </div>
      }
     </div>
  );
}