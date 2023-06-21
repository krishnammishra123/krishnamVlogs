"use client"
import Link from 'next/link';
import React, { useContext } from 'react';
import styles from "./navbar.module.css";
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { LoginProvider } from '@/loginContext/LoginContext';

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {

  const { logindata } = useContext(LoginProvider);

  return (
    <div className={styles.container}>
      <Link className={styles.logo} href="/">
        KriShnamBlog.com
      </Link>
      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((link) => (
          <Link key={link.id} href={link.url}>
            {link.title}
          </Link>
        ))}
        {logindata ?  (<Link href="/logout">
          <button className={styles.logout}> Logout </button>
        </Link>) : ""}
      </div>
    </div>
  );
}

export default Navbar