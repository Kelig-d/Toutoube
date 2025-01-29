import React, {useState, useEffect, useRef} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export function Chat() {
    const [messages, setMessages] = useState([]);
    const connection = useRef(null);
    const [currentMessage, setCurrentMessage] = useState("");
    const [currentUser, setCurrentUser] = useState("");

    const chatParent = useRef(null);

    useEffect(() => {
        const ws = new WebSocket("wss://iai3-react-34db9d7c5920.herokuapp.com");

        // connexion a la WebSocket
        ws.addEventListener("open", () => {
            ws.send("Connection established")
        })

        ws.addEventListener("message", (evt) => {
            console.log("Message received:", evt.data)
            try {
                const newMessages = JSON.parse(evt.data)
                setMessages((prevMessages) => [...prevMessages, ...newMessages])
                chatParent.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
            } catch (error) {
                console.error("Failed to parse message:", error)
            }
        })
        connection.current = ws;     

        /*
        ws.onclose = () => {
            console.log("disconnected, reconnect.");
            setConnected(false);
        };
        */
        return () => {
            ws.close()
        };

    }, []);

    const submitMessage = (currentUser, messageString) => {
        const message = { name: currentUser, message: messageString }
        connection.current.send(JSON.stringify(message))
    };

    return (
        <div>
            <div id="chat" className="custom-scrollbars__thumb mt-4">
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <div key={index} >
                            <p>{new Date(message.when).toLocaleString("fr-FR", { month: "2-digit", day: "2-digit", year: "numeric", hour:"2-digit", minute:"2-digit", second: "2-digit"})} 
                                <strong>  {message.name} : </strong>{message.message}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No messages received yet.</p>
                )}
                <div id={'chatParent'} ref={chatParent}/>
            </div>
            <Form>
                <Row className="align-items-center">
                    <Col xs="6">
                        <Form.Control className="mb-2" placeholder="Name" value={currentUser} onChange={(e) => setCurrentUser(e.target.value)}/>
                    </Col>
                    <Col xs="auto">
                        <Form.Check className="mb-2" label="moment" />
                    </Col>
                    <Col xs="auto">
                        <Button className="mb-2"
                        variant="secondary"
                            onClick={() => {
                                submitMessage(currentUser, currentMessage);
                                setCurrentMessage(""); // Réinitialiser le champ de saisie
                            }}
                        >Submit</Button>
                    </Col>
                </Row>
                <Form.Control className="me-auto" placeholder="Your message..." value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)}/>

            </Form>
        </div>
    );
}

export default Chat;

