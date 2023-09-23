import { useEffect, useState } from "react";
import './index.css'

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);


  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    // console.log(message)
    let msgs = chats;
    // if(chats.role==="user")
    // msgs.push({ role: "user", content: message });
    msgs.push(message)
    console.log(msgs)
    setMessage("");
    console.log(chats.role)


    fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        msgs.push(data.output);
        setChats(msgs);
        setIsTyping(false);
       
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // useEffect(()=>{
  //   chat();
  // },[])

  return (
    <div className="App">
      <h1>ChatBot</h1>
      <section>
        {chats.map((chatx, index) => {
          console.log(chatx)
          return <div>
            <p key={index} className={chatx?.role === "user" ? "user_msg" : chatx}>
              <span>
                <b>{chatx?.role ? chatx?.role.toUpperCase() : "Unknown"}</b>
              </span>
              <span>:</span>
              <span>{chatx.content}</span>
            </p>
          </div>

        })}
      </section>


      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

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
