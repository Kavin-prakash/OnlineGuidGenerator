import axios from "axios";
import { useRef, useState } from 'react';
import copy from "copy-to-clipboard";
import Swal from 'sweetalert2';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Header } from "./Components/Header";
import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const baseurl = 'http://localhost:5142/GuidGenerator/GuidGenerator';

  const [data, setData] = useState(null);
  const [enableclipboard, setEnableclipboard] = useState(false);
  const [changebutton, setchangebutton] = useState(false);
  const textRef = useRef();

  const apiresponse = () => {
    axios.get(baseurl).then((response) => {
      setData(response.data);
    });
    setEnableclipboard(true);
    setchangebutton(true);

  }

  const copyToClipboard = () => {
    let copyText = textRef.current.innerText;
    let isCopy = copy(copyText);
    if (isCopy) {
      const Toast = Swal.mixin({
        toast: true, position: "center-right",
        showConfirmButton: false, timer: 1000, timerProgressBar: true,
        customClass: {
          popup: 'custom-toast'
        },
        didOpen: (toast) => { toast.onmouseenter = Swal.stopTimer; toast.onmouseleave = Swal.resumeTimer; }
      });
      Toast.fire({ icon: "success", title: "Copied Successfully" });
    }
  };

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>What is Guid?</h3>
          <Box component="section" sx={{ p: 2, border: '1px solid grey' }}>
            A GUID (Globally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems.
            It’s also known as a UUID (Universally Unique Identifier). GUIDs are designed to be unique across all systems and time, making them highly useful for identifying resources like user accounts, documents, software, and hardware.
          </Box>
        </Col>
      </Row>
      <Row className="mb-3 text-center">
        <Col>
          <h2>Free Online Guid Generator</h2>
        </Col>
      </Row>
      <Row className="mb-3 text-center">
        <Col>
          {
            changebutton === true ?
              <Button variant="success" onClick={apiresponse}>Generate Another Guid!</Button>
              :
              <Button variant="success" onClick={apiresponse}>Generate Some Guid!</Button>
          }
        </Col>
      </Row>
      {data && (
        <Row className="mb-3 text-center">
          {Object.keys(data).map(key => (
            <Col key={key}>
              <h4>Guid is Read!</h4>
              <div ref={textRef}>{data[key]}</div>
            </Col>
          ))}
        </Row>
      )}
      {enableclipboard && (
        <Row className="text-center">
          <Col>
            <Button variant="primary" onClick={copyToClipboard}>Copy to clipboard !</Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
