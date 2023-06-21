"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import {
  UserHomeAuth,
  sendMassageService,
} from "@/components/Services/Service.auth";
import { LoginProvider } from "@/loginContext/LoginContext";
import { contactValidate } from "@/components/Validation/Validation";

const Contact = () => {
  const [message, setMessage] = useState();
  const { logindata, setLogindata } = useContext(LoginProvider);
  const [error, setError] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addMessage, setAddMessage] = useState("");

useEffect(() => {
  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await UserHomeAuth(token)
          .then((res) => {
            if (res.data.ValidUserOne) {
              setName(res.data.ValidUserOne.name);
              setEmail(res.data.ValidUserOne.email);
              setLogindata(true);
            } else {
              setName("");
              setEmail("");
              setLogindata(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setName("");
        setEmail("");
        setLogindata(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  getData();
}, [setLogindata, setEmail, setName]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = await contactValidate(name, email, addMessage);
    setError(validate);
    if (Object.keys(validate).length === 0) {
      const userDetails = { name, email, addMessage };
      await sendMassageService(userDetails)
        .then((res) => {
          setMessage(res.data.message);
          setName("");
          setEmail("");
          setAddMessage("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Let's Keep in Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            src="/contact.png"
            alt=""
            height={500}
            width={500}
            className={styles.image}
          />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {message && <p className={styles.massg}>{message}</p>}
          {logindata ? (
            <>
              <input
                type="text"
                placeholder="name"
                value={name}
                disabled
                className={styles.input}
              />
              <input
                type="email"
                placeholder="email"
                value={email}
                disabled
                className={styles.input}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
              />
              {error && error.name && (
                <p className={styles.err}>{error.name}</p>
              )}
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
              {error && error.email && (
                <p className={styles.err}>{error.email}</p>
              )}
            </>
          )}
          <textarea
            className={styles.textArea}
            value={addMessage}
            onChange={(e) => setAddMessage(e.target.value)}
            placeholder="message"
            cols="30"
            rows="10"
          ></textarea>
          {error && error.addMessage && (
            <p className={styles.err}>{error.addMessage}</p>
          )}

          <button className={styles.button} type="send">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
