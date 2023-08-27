import { useState } from "react";
import './App.css';

function App() {
  const [message,setMessage]=useState("");
  const [chats,setChats]=useState([]);
  
  const chat =async (e,message)=>{
    e.preventDefault();

    if(!message) return;

    const msgs=chats;
    msgs.push({role:"user",content:message});
    setMessage("");

    fetch("http:/localhost:8000/",{
      method:"POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        chats,
      }),
    })
    .then((res)=>res.json())
    .then((data)=>{
      msgs.push(data.output);
      setChats(msgs);
    })
    .catch((err)=>{
      console.log(err);
    });
  };

  return (
    <div className="App">
      <h1>ChatBot</h1>
      <section>
      {chats && chats.length
          ? chats.map((chat, index) => (
              <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                  <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ""}

      </section>
      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}

export default App;
