import React, { useState } from "react";

function RoomForm({ setUsername, setRoom }) {
    const [name, setName] = useState("");
    const [roomName, setRoomName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsername(name);
        setRoom(roomName);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
            />
            <button type="submit">Join</button>
        </form>
    );
}

export default RoomForm;
