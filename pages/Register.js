import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Register.module.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add your form submission logic here
      const data = await axios.post(
        "http://localhost:5000/user/api/createUser",
        {
          username,
          email,
          phone,
          password,
        }
      );
      if (data.data.success) {
        toast.success("User registered");
        setUsername("");
        setEmail("");
        setPhone("");
        setPassword("");
        router.push("/");
      } else {
        toast.warning("Email already in use");
      }
    } catch (err) {
      toast.error(err);
    }
  };
  const handleReset = () => {
    setUsername("");
    setEmail("");
    setPhone("");
    setPassword("");
  };
  return (
    <>
      <div className={styles.bg}>
        {/* <img className={styles.logo2} src="/logo2.png" alt="" /> */}

        <Form
          className={styles.frm}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <h3>
            <img className={styles.subLogo} src="/logo2.png" alt="" />
            NextChat
          </h3>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={handlePhoneChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <div className="d-flex gap-31 mb-3">
            <Button type="submit" className={styles.btnn1}>
              Register
            </Button>
            <Button type="reset" className={styles.btnn2}>
              Reset
            </Button>
          </div>
          <Form.Group className={styles.ftr}>
            <p>
              Already Registered Please{" "}
              <Link className="link1" href="/">
                Login
              </Link>
            </p>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
