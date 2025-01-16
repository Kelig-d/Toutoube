import React, {useState, useEffect, useRef} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';


export function Chat() {
    const [messages, setMessages] = useState([]);
    const connection = useRef(null);
    const [currentMessage, setCurrentMessage] = useState("");
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        const ws = new WebSocket("wss://iai3-react-34db9d7c5920.herokuapp.com");

        // connexion a la WebSocket
        ws.addEventListener("open", () => {
            ws.send("Connection established")
        })

        ws.addEventListener("message", (evt) => {
            console.log("Message received:", evt.data);
            try {
                const newMessages = JSON.parse(evt.data);
                setMessages((prevMessages) => [...prevMessages, ...newMessages]);
            } catch (error) {
                console.error("Failed to parse message:", error);
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
            ws.close();
        };

    }, []);

    const submitMessage = (currentUser, messageString) => {
        const message = { name: currentUser, message: messageString };
        connection.current.send(JSON.stringify(message));
    };

    return (
        <div>
            <Form>
                <Stack direction="horizontal" gap={3}>
                    <Form.Control className="me-auto" placeholder="Your name..." value={currentUser} onChange={(e) => setCurrentUser(e.target.value)}/>
                    <Form.Control className="me-auto" placeholder="Your message..." value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)}/>
                        <Button variant="secondary"
                            onClick={() => {
                                submitMessage(currentUser, currentMessage);
                                setCurrentMessage(""); // Réinitialiser le champ de saisie
                            }}
                        >Submit</Button>
                        <div className="vr" />
                        <Button variant="outline-danger">Reset</Button>
                </Stack>
            </Form>
            {messages.length > 0 ? (
                messages.map((message, index) => (
                    <div key={index}>
                        <p><strong>{message.name}</strong>: {message.message}</p>
                    </div>
                ))
            ) : (
                <p>No messages received yet.</p>
            )}
        </div>
    );
}

export default Chat;

