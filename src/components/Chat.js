import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Підключаємо сокет до сервера
const socket = io("http://localhost:3000");

function Chat({ username, room }) {
    const [messages, setMessages] = useState([]); // Список повідомлень
    const [newMessage, setNewMessage] = useState(""); // Повідомлення для надсилання

    // Підключення до кімнати та отримання історії
    useEffect(() => {
        socket.emit("joinRoom", { username, room }); // Підключення до кімнати

        // Отримання історії повідомлень
        socket.on("roomHistory", (history) => {
            setMessages(history); // Зберігаємо історію
        });

        // Ловимо нові повідомлення в кімнаті
        socket.on("roomMessage", (message) => {
            setMessages((prev) => [...prev, message]); // Додаємо нове повідомлення
        });

        // Чистимо підключення при виході з кімнати
        return () => {
            socket.disconnect();
        };
    }, [username, room]);

    // Надсилання повідомлення
    const handleSend = (e) => {
        e.preventDefault(); // Скасовуємо дефолтне оновлення сторінки
        if (newMessage.trim()) {
            socket.emit("roomMessage", { room, message: newMessage, username });
            setNewMessage(""); // Очищаємо поле вводу
        }
    };

    return (
        <div>
            <h2>Room: {room}</h2>
            <div
                style={{
                    height: "300px",
                    overflowY: "scroll",
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                }}
            >
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
                    style={{ padding: "10px", marginRight: "10px", width: "70%" }}
                />
                <button type="submit" style={{ padding: "10px 20px" }}>
                    Send
                </button>
            </form>
        </div>
    );
}

export default Chat;
