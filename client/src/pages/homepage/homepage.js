import { Button, Navbar } from "react-bootstrap";
import MarkDownEditor from "../editor/mdEditor";

function Homepage({ onLogout }) {

    // return MarkDownEditor;
    return <div>
      <Navbar.Text>
        <Button variant="outline-danger" onClick={onLogout}>
        Log out
        </Button>
      </Navbar.Text>
      <MarkDownEditor/>
    </div>
  }
export default Homepage;