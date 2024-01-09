import { Inter } from "next/font/google";
import styles from "@/styles/Profile.module.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoCameraOutline } from "react-icons/io5";
import Header from "./components/Header";
import { useRouter } from "next/router";

export default function Profile() {
  const [username, setusername] = useState("");
  const [userID, setuserID] = useState("");
  const [phone, setphone] = useState("");
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("userDataChatApp");
    if (!user) {
      router.push("/");
    } else {
      setusername(JSON.parse(user).username);
      setphone(JSON.parse(user).phone);
      setuserID(JSON.parse(user)._id);
    }
  }, [router.isReady]);
  return (
    <>
      <Header />
      <div className={styles.prof}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            src="/user.png"
            alt="Profile Picture"
            className={styles.picture}
          />
          <IoCameraOutline className={styles.cam} />
        </div>
        <div className={styles.details}>
          <h3>Name</h3>
          <p className={styles.username}>{username}</p>
        </div>
        <div className={styles.details}>
          <h3>About</h3>
          <p>Hey there i am using next chat !</p>
        </div>
        <div className={styles.details}>
          <h3>Phone</h3>
          <p>+91-{phone}</p>
        </div>
      </div>
    </>
  );
}
