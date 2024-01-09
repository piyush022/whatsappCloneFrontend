import { Inter } from "next/font/google";
import styles from "@/styles/Group.module.css";
import { IoIosSearch } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./components/Header";

export default function GroupDetail() {
  const [users, setusers] = useState([]);
  const [usersBackup, setusersBackup] = useState([]);

  const [search, setsearch] = useState("");

  async function getUsers() {
    const result = await axios.get(
      process.env.NEXT_PUBLIC_SITE_URL + "user/api/getAllUser"
    );
    console.log("users", result);
    setusers(result.data.data);
    setusersBackup(result.data.data);
  }

  useEffect(() => {
    if (search == "") {
      setusers(usersBackup);
    } else {
      const searchedData = users.filter((item) => item.username == search);
      if (searchedData.length) {
        setusers(searchedData);
      }
    }
  }, [search]);
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <div className={styles.main}>
        <Header />
        <div className={styles.container}>
          <div className={styles.header}>
            <img src="/user.png" alt="Group Icon" className={styles.icon} />
            <div className={styles.info}>
              <h2>Next Group chat</h2>
              <p>Group - {usersBackup.length} Members</p>
            </div>
          </div>
          <div className={styles.members1}>
            <p>{users.length} Members</p>
            <div id="inputGrpDetail">
              <input
                type="text"
                className="mb-4"
                onChange={(e) => setsearch(e.target.value)}
              />
              <IoIosSearch className={styles.searchIcon} />
            </div>
          </div>
          <div className={styles.members}>
            <ul>
              {users.map((item, index) => (
                <li>
                  <p key={index}>
                    <FaCircleUser className={styles.usericon} /> {item.username}
                  </p>
                  <p>~ +91-{item.phone}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
