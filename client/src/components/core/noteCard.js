import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function NoteCard(title, handleClick, handleDelete) {
  return (
    <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button onClick = {handleClick} variant="primary">edit</Button>
        <Button onClick = {handleDelete} variant="warning">delete</Button>
      </Card.Body>
    </Card>
  );
}

export default NoteCard;