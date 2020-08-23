import React, { useState, useEffect } from "react";
import Video from "twilio-video";
import Participant from "./Participant";
import TodoList from "./TodoList";

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    Video.connect(token, {
      name: roomName
    }).then((room) => {
      setRoom(room);
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach(function (
            trackPublication
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <button onClick={handleLogout}>Log out</button>
      <div className="local-participant row">
        {room ? (
          <div className="col-6">
            <div>
              <Participant
                key={room.localParticipant.sid}
                participant={room.localParticipant}
              />
            </div>
            <div className="remote-participants">{remoteParticipants}</div>
          </div>
        ) : (
          ""
        )}
        {room ? (
          <div className="col-6">
            <div class="happydays">
              <div className="row">
                <TodoList participant={room.localParticipant}></TodoList>
              </div>
              {participants.map((participant) => (
                <div className="row">
                  <TodoList participant={participant}></TodoList>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Room;
