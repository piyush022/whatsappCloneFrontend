import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "@/styles/Chat.module.css";
import { PiNavigationArrowFill } from "react-icons/pi";
import moment from "moment";
import { FaCheck } from "react-icons/fa6";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import Header from "./components/Header";
import sound from "../public/send.wav";

const chatWindow = () => {
  const [isSubmitingLoader, setisSubmitingLoader] = useState(true);
  const [msg, setmsg] = useState("");
  const [messageBackup, setmessageBackup] = useState("");
  const [socket, setsocket] = useState(null);
  const [messageList, setmessageList] = useState([]);
  const [username, setusername] = useState("");
  const [userID, setuserID] = useState("");
  const [phone, setphone] = useState("");
  const [color, setcolor] = useState("");
  const messageListRef = useRef(null);

  const router = useRouter();

  const brightColors = [
    "#FF5733",
    "#FFBD33",
    "#B5FF33",
    "#33FFC4",
    "#336BFF",
    "#BB33FF",
    "#FF33A3",
    "#FF3357",
    "#33FF5E",
    "#33FFAA",
    "#FFD933",
    "#FF8E33",
    "#7D33FF",
    "#3338FF",
    "#FF3333",
    "#FF8633",
    "#33FF9F",
    "#3387FF",
    "#D333FF",
    "#FF33E5",
    "#FF3371",
    "#33D5FF",
    "#33FFEC",
    "#FFD633",
    "#FF5733",
    "#FFBD33",
    "#B5FF33",
    "#33FFC4",
    "#336BFF",
    "#BB33FF",
    "#FF33A3",
    "#FF3357",
    "#33FF5E",
    "#33FFAA",
    "#FFD933",
    "#FF8E33",
    "#7D33FF",
    "#3338FF",
    "#FF3333",
  ];

  // Function to get a random color from the brightColors array
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * brightColors.length);
    return brightColors[randomIndex];
  };
  useEffect(() => {
    setcolor(getRandomColor());
  }, []);
  useEffect(() => {
    const user = localStorage.getItem("userDataChatApp");
    if (!user) {
      router.push("/");
    } else {
      getChats();
      const socketInstance = io("http://localhost:5000", {
        path: "/socket.io",
        transports: ["websocket"],
      });
      setsocket(socketInstance);
      setusername(JSON.parse(user).username);
      setphone(JSON.parse(user).phone);
      setuserID(JSON.parse(user)._id);
    }
  }, [router]);

  useEffect(() => {
    const messageReceiver = (data) => {
      setmessageList((messageList) => [...messageList, data]);
      try {
        playReceiveAudio();
      } catch (err) {
        console.log(err);
      }
    };

    socket?.on("receive_message", messageReceiver);

    // Clean up the event listener when the component unmounts
    return () => {
      socket?.off("receive_message", messageReceiver);
    };
  }, [socket]);

  useEffect(() => {
    // Scroll to the last message when messageList updates
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messageList]);

  function sendMessage(e) {
    e.preventDefault();
    const currentTime = moment().format("HH:mm");

    setmessageBackup(msg);
    socket.emit("send_message", {
      user: userID,
      message: msg,
      time: currentTime,
      useremail: username,
      phone: phone,
    });
    setmessageList((messageList) => [
      ...messageList,
      {
        user: userID,
        message: msg,
        time: currentTime,
        useremail: username,
        phone: phone,
      },
    ]);
    try {
      playAudio();
    } catch (err) {
      console.log(err);
    }

    setmsg("");
  }

  async function getChats() {
    const data = await axios.get("http://localhost:5000/chat/api/getChat");
    console.log("chatData", data);
    setmessageList(data.data.data);
    setTimeout(() => {
      setisSubmitingLoader(false);
    }, 2000);
  }
  function playAudio() {
    try {
      new Audio("/send.wav").play();
    } catch (err) {
      console.log(err);
    }
  }
  function playReceiveAudio() {
    try {
      new Audio("/rec.wav").play();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {isSubmitingLoader ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            transition: "opacity 1s ease-out",
            opacity: isSubmitingLoader ? 1 : 0,
            background: "white", // Set the background to white
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <img
              src="/logo.gif"
              className="img-rotation"
              style={{
                width: "100px",
                height: "100px",
                animation: "rotation 2s infinite linear", // Add a rotation animation
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <div className={styles.main}>
            <Header />
            <Form className={styles.form} onSubmit={sendMessage}>
              <p className={styles.topHeading}>
                Messages are end-to-end encrypted. No one outside of this chat,
                not even NextChat, can read or listen to them. Click to learn
                more.
              </p>
              <div
                id="messageBox"
                className={styles.messageList}
                ref={messageListRef}
              >
                {messageList.length
                  ? messageList.map((item, index) => (
                      <span
                        className={item.user == userID ? "right" : "left"}
                        key={index}
                      >
                        <span
                          className={
                            item.user != userID ? styles.topName : "displayNone"
                          }
                          style={{ color: color }}
                        >
                          ~{item.useremail}
                        </span>
                        <span
                          className={
                            item.user == userID ? "displayNone" : styles.phone
                          }
                        >
                          {item.phone}
                        </span>
                        <span className={styles.msg}>{item.message}</span>
                        <span className={styles.time}>
                          {item.time}
                          <span className={styles.tick}>
                            <FaCheck className="tickIcon" />
                          </span>
                        </span>
                      </span>
                    ))
                  : null}
              </div>
              <Form.Group className={styles.inputGrp} controlId="formBasicText">
                <Form.Control
                  type="text"
                  value={msg}
                  placeholder="Type a message..."
                  onChange={(e) => setmsg(e.target.value)}
                />
                <button className={styles.senBtn}>
                  <PiNavigationArrowFill className="sendBtn" />
                </button>
              </Form.Group>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default chatWindow;
