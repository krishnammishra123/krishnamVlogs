"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerService } from "@/components/Services/Service.auth";
import { RegistrationValidate } from "@/components/Validation/Validation";


const Register = () => {
  const [error, setError] = useState(null);
  const [mistake, setMistake] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

   const handleSubmit = async (e) => {
     e.preventDefault();
     const validate = await RegistrationValidate(name, email, password);
     setError(validate);
     if(Object.keys(validate).length === 0) {
        try {
       const userDetails = { name, email, password };
        await registerService(userDetails).then((res) => {
         if (res.status === 200)
         {
        //  toast.success(res.massage, { position: toast.POSITION.TOP_RIGHT });
         console.log(res.data.message);
         router.push("/dashboard/login");
         }
         setName('');
         setEmail('');
         setPassword('');
       }).catch((err) => {
         if (err.response.status === 400 || err.response.status === 409) {
           console.log(err.response.data.error);
           setMistake(err.response.data.error);
          //  toast.warning({ text: err.response.data.error });
         } else {
           console.log(err.response.data.error);
         }
       })
     } catch (err) {
       console.log(err);
     }
     }

   };

  return (
    <div className={styles.container}>
      <h1>Create an Account</h1>
      <h2>Please sign up to see the dashboard.</h2>
      {mistake ? <h3 className={styles.err}>{mistake}</h3> : ""}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          className={styles.input}
          onChange={(e) => setName(e.target.value)}
        />
        {error && <p className={styles.err}>{error.name}</p>}
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className={styles.err}>{error.email}</p>}
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.err}>{error.password}</p>}
        <button className={styles.button}>Register</button>
      </form>
      <span>- OR -</span>
      <Link href="/dashboard/login">Login with an existing account</Link>
    </div>
  );
};

export default Register;
