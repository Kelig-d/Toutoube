import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';


export function Chat() {
    const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {
        const ws = new WebSocket("wss://iai3-react-34db9d7c5920.herokuapp.com");

        // connexion a la WebSocket
        ws.onopen = () => {
            console.log("connected");
            setConnected(true);
        };
        
        // messages
        ws.onmessage = (evt) => {
            console.log("Message received:", evt.data);
            try {
                const newMessages = JSON.parse(evt.data);
                setMessages((prevMessages) => [...prevMessages, ...newMessages]);
            } catch (error) {
                console.error("Failed to parse message:", error);
            }
        };

        ws.onclose = () => {
            console.log("disconnected, reconnect.");
            setConnected(false);
        };

        return () => {
            ws.close();
        };

    }, []);

    const submitMessage = messageString => {
        const message = { name: this.state.name, message: messageString };
        this.ws.send(JSON.stringify(message));
    };

    return (
        <div>
            <Form>
                <Stack direction="horizontal" gap={3}>
                        <Form.Control className="me-auto" placeholder="Add your item here..." value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)}/>
                        <Button variant="secondary"
                            onClick={() => {
                                submitMessage(currentMessage);
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

