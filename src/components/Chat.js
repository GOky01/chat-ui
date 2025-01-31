import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function Chat({ username, room }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        // Підключення до кімнати
        socket.emit("joinRoom", { username, room });

        // Отримання історії кімнати
        socket.on("roomHistory", (history) => {
            setMessages(history);
        });

        // Ловимо нові повідомлення
        socket.on("roomMessage", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [username, room]);

    const handleSend = (e) => {
        e.preventDefault();
        socket.emit("roomMessage", { room, message: newMessage, username });
        setNewMessage("");
    };

    return (
        <div>
            <h2>Room: {room}</h2>
            <div style={{ height: "300px", overflowY: "scroll" }}>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.username}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend}>
                <input
                    type="text"
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;
