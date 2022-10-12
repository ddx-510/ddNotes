import MarkDownEditor from "../../components/editor/mdEditor";
import React, { useState, useEffect } from 'react';
import { Button, Card , Container, Row, Col} from 'react-bootstrap';
import { deleteNoteContent, showNotes } from "../../api/notes";
import { getWeather } from "../../api";

function Homepage({ onLogout }) {

  const [items, setItems] = useState([]);
  const [weather, setWeather] = useState("");
  const [currSelection, setCurrSelection] = useState("allNotes");
  const [notes_id, setNotes_id] = useState("");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    showNotes({ user_id }).then((res) => {
      if (res !== undefined) {
        setItems(res.allNotes);
      }
    });
  }, [user_id]);

  const handleReload = () => {
    showNotes({ user_id }).then((res) => {
      if (res !== undefined) {
        setItems(res.allNotes);
      }
    });
  }

  const handleClick = (event, param) => {
    setCurrSelection("editor");
    setNotes_id(param);
  }

  const handleNew = (event) => {
    setCurrSelection("editor");
    setNotes_id("new");
  }

  const handleDelete = (event, {notes_id}) => {
    // console.log(notes_id);
    deleteNoteContent({notes_id});
    handleReload();
  }

  const handleWeather = (event, name) => {
    // console.log(notes_id);
    getWeather({name}).then((res) => {
      if (res !== undefined) {
        setWeather(res.forecast);
      }
    })
    handleReload();
  }

  // return MarkDownEditor;
  const allNotes = () => {
    return <div className="App">
      <Container>
        <Row>
          <Col>
            <Button variant="outline-danger" onClick={onLogout}>
              Log out
            </Button>
          </Col>
          <Col>
            <Button onClick={handleNew}>
              New
            </Button>
          </Col>
          <Col>
            <Button variant="outline-danger" onClick={event => handleWeather(event, "Clementi")}>
              Weather
            </Button>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                {weather}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {items.map((item, i) => 
        <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Button onClick={event => handleClick(event, item.notes_id)} variant="primary">edit</Button>
          <Button onClick={event => handleDelete(event, {notes_id: item.notes_id})} variant="warning">delete</Button>
        </Card.Body>
      </Card>)
      }
    </div>
  }

  const onBack = () => {
    setCurrSelection("allNotes");
    handleReload();
  }

  return (currSelection === "allNotes" && allNotes()) || (
    <MarkDownEditor onBack={onBack} notes_id = {notes_id}/>
  )
}

export default Homepage;