import { Inter } from "next/font/google";
import styles from "@/styles/Profile.module.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoCameraOutline } from "react-icons/io5";

export default function Profile() {
  return (
    <>
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
          <p>John Doe</p>
        </div>
        <div className={styles.details}>
          <h3>About</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className={styles.details}>
          <h3>Phone</h3>
          <p>+91-1234567890</p>
        </div>
      </div>
    </>
  );
}
