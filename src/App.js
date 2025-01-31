import React, { useState } from "react";
import RoomForm from "./components/RoomForm";
import Chat from "./components/Chat";

function App() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    return (
        <div className="App">
            {!room ? (
                <RoomForm setUsername={setUsername} setRoom={setRoom} />
            ) : (
                <Chat username={username} room={room} />
            )}
        </div>
    );
}

export default App;
