import { useEffect, useState } from "react";
import axios from 'axios';
import './style.css';

const BASE_URL = process.env.BASE_URL;

const EventSourceChat = () => {
 const [userName, setUserName] = useState('');
 const [messages, setMessages] = useState([]);
 const [value, setValue] = useState("");
 const [showLogin, setShowLogin] = useState(true);


 const selectUserName = () => {
  if (!userName) {
   return;
  }
  localStorage.setItem('userName', userName);
  setShowLogin(false);
 };
 const subscribe = async () => {
  const eventSource = new EventSource(`${BASE_URL}/connect`);
  eventSource.onmessage = function (event) {
   console.log(`data:${event.data}`);
   const message = JSON.parse(event.data);
   setMessages((prev) => [...prev, message]);
  };
 };
 useEffect(() => {
  const userName = localStorage.getItem('userName');
  setUserName(userName);
  setShowLogin(userName ? false : true);
  subscribe();
 }, []);

 const sendMessage = async () => {
  await axios.post('/messages', {
   userName,
   text: value,
   date: Date.now()
  });
 };

 return (
  <>
   <div className="login" style={{ display: showLogin ? 'flex' : 'none' }}>
    <input
     type="text"
     value={userName}
     onChange={e => setUserName(e.target.value)} />
    <button onClick={selectUserName}>Set name</button>
   </div><div className="container">
    <div className="form">
     <input
      type="text"
      value={value}
      onChange={e => setValue(e.target.value)} />
     <button onClick={sendMessage}>Send message</button>
    </div>
    <div className="messages">
     {messages.map(message => <div>
      <div>
       <b>{message.userName}</b><br />
       <b style={{ fontSize: '10px' }}>{new Date(message.date).toISOString()}</b>
      </div>
      <div>{message.text}</div>
     </div>)}
    </div>
   </div>
  </>
 );
};

export default EventSourceChat;
