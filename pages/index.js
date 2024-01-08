import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("userDataChatApp");
    if (user) {
      router.push("/chatWindow");
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (username != "" && password != "") {
      const data = await axios.post("http://localhost:5000/user/api/getUser", {
        email: username,
        password: password,
      });
      console.log(data);
      if (data.data.success) {
        localStorage.setItem("userDataChatApp", JSON.stringify(data.data.data));
        router.push("/chatWindow");
      }
    }
  }
  return (
    <>
      <div className={styles.bg}>
        {/* <img className={styles.logo2} src="/logo2.png" alt="" /> */}
        <Form className={styles.frm} onSubmit={handleSubmit}>
          <h3>
            <img className={styles.innerlogo} src="/logo2.png" alt="" />
            NextChat
          </h3>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setusername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>

          <div className="mt-4">
            <Button variant="primary" type="submit" className={styles.btn1}>
              Login
            </Button>
            <Button variant="primary" type="reset" className={styles.btn2}>
              Reset
            </Button>
          </div>
          <p className="my-2 d-flex justify-content-end">
            Not a member?{" "}
            <Link className={styles.link} href="/Register">
              &nbsp;Sign Up
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
}
