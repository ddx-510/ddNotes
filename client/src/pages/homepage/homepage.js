import MarkDownEditor from "../../components/editor/mdEditor";
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { showNotes } from "../../api/notes";

function Homepage({ onLogout }) {

  const [items, setItems] = useState([]);
  const [currSelection, setCurrSelection] = useState("allNotes");
  const [notes_id, setNotes_id] = useState("");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    showNotes({ user_id }).then((res) => setItems(res.allNotes));
  }, []);

  const handleClick = (event, param) => {
    setCurrSelection("editor");
    setNotes_id(param);
  }

  // return MarkDownEditor;
  const allNotes = () => {
    return <div className="App">
      <Button variant="outline-danger" onClick={onLogout}>
        Log out
      </Button>
    
      {items.map((item, i) => 
        <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Button onClick={event => handleClick(event, item.notes_id)} variant="primary">edit</Button>
          <Button onClick={handleDelete} variant="warning">delete</Button>
        </Card.Body>
      </Card>)
      }
    </div>
  }

  const handleDelete = () => {

  }

  const onBack = () => {
    setCurrSelection("allNotes")
  }

  return (currSelection === "allNotes" && allNotes()) || (
    <MarkDownEditor onBack={onBack} notes_id = {notes_id}/>
  )
}

export default Homepage;