import styles from "@/styles/Header.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  function handleLogout() {
    localStorage.clear();
    router.push("/");
  }
  return (
    <>
      <div className={styles.main}>
        <Link href="/GroupDetail" className={styles.leftsec}>
          <img className={styles.avatar} src="/user.png" />
          <h2>Next Group Chat</h2>
        </Link>
        <div className={styles.controls}>
          <NavDropdown title={<BsThreeDotsVertical />} id="basic-nav-dropdown">
            <NavDropdown.Item href="/Profile">View Profile</NavDropdown.Item>
            <NavDropdown.Item href="/GroupDetail">
              View Participants
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </>
  );
};

export default Header;
