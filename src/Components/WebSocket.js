import React, {useState, useEffect, useRef} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export function Chat(props) {
    const [messages, setMessages] = useState([]);
    const connection = useRef(null);
    const [currentMessage, setCurrentMessage] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [currentMoment, setCurrentMoment] = useState("");

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
                chatParent.current.scrollIntoView({ block: 'end', behavior: 'instant' });
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

    const submitMessage = (currentUser, messageString,currentMoment) => {
        if(currentUser !== "" && messageString !== ""){
            console.log(parseInt(currentMoment));
                   
            if(currentMoment === "" ){
                const message = { name: currentUser, message: messageString}
                connection.current.send(JSON.stringify(message))
            }else {
                const message = { name: currentUser, message: messageString, moment: parseInt(currentMoment)}
                connection.current.send(JSON.stringify(message))
            }
        
        }
    };

    function date (messagedate){
        const newDate = new Date(messagedate).toLocaleString("fr-FR", { month: "2-digit", day: "2-digit", year: "numeric", hour:"2-digit", minute:"2-digit", second: "2-digit"})
        if (newDate === "Invalid Date"){
            return null 
        }else {
            return  newDate
        }
    }

    
    function timeMessage(messageMoment){
        if (messageMoment != null){
            messageMoment = Number(messageMoment);
            var h = Math.floor(messageMoment / 3600);
            var m = Math.floor(messageMoment % 3600 / 60);
            var s = Math.floor(messageMoment % 3600 % 60);

            var hDisplay = h > 0 ? ( h < 10 ? "0"+h : h) + ":"  : "";
            var mDisplay = m > 0 ? ( m < 10 ? "0"+m : m)+ ":" : "";
            return hDisplay + mDisplay + ( s < 10 ? "0"+s : s); 
        }
        else {
            return ""
        }
    }
    
    return (
        <div>
            <Form>
                <Row className="align-items-center">
                    <Col xs="6">
                        <Form.Control className="mb-2" placeholder="Name" value={currentUser} onChange={(e) => setCurrentUser(e.target.value)} required/>
                    </Col>
                    <Col xs="auto">
                        <Form.Check className="mb-2" label="moment" value={currentMoment}
                             onChange={(e) => setCurrentMoment(e.target.checked ? props.playerRef.current.currentTime() : "")} />
                    </Col>
                    <Col xs="auto">
                        <Button className="mb-2"
                        variant="secondary"
                            onClick={() => {
                                submitMessage(currentUser, currentMessage, currentMoment);
                                setCurrentMessage(""); // Réinitialiser le champ de saisie
                            }}
                        >Submit</Button>
                    </Col>
                </Row>
                    <Form.Control className="me-auto" placeholder="Your message..." value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} required/>
            </Form>
            <div id="chat" className="custom-scrollbars__thumb mt-4">
    {messages.length > 0 ? (
        messages.map((message, index) => {
            if(message.message !== undefined && message.message !== "") { 
                return(
                <div key={index}>
                    <p> 
                        {date(message.when)} <strong>{message.name} :</strong> {message.message} 
                        <Button 
                            variant="link" 
                            size="sm" 
                            onClick={() => { props.playerRef.current.currentTime(message.moment) }}
                        >
                            {timeMessage(message.moment)}
                        </Button>
                    </p>
                </div>)
             }
             return null;

        }
            
           
        )
    ) : (
        <p>No messages received yet.</p>
    )}
    <div id="chatParent" ref={chatParent}></div>
</div>

        </div>
    );
}

export default Chat;

