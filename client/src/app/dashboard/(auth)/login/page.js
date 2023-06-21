"use client";
import React, {useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginValidate } from "@/components/Validation/Validation";
import { loginService } from "@/components/Services/Service.auth";

const Login = () => {
  const [error, setError] = useState(null);
  const [mistake, setMistake] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
 

   const handleSubmit = async (e) => {
     e.preventDefault();
     const validate = await LoginValidate(email, password);
     setError(validate);
     if (Object.keys(validate).length === 0) {
       try {
         const userDetails = {  email, password };
         await loginService(userDetails).then((res) => {
             if (res.status === 200 && res.data.user.role === "user") {
               //  toast.success(res.massage, { position: toast.POSITION.TOP_RIGHT });
               localStorage.setItem("token", res.data.token)
               localStorage.setItem("role", res.data.user.role);
               localStorage.setItem("userid", res.data.user._id);
               router.push("/dashboard");
             }
             setEmail("");
             setPassword("");
           }).catch((err) => {
             if (err.response.status === 400 || err.response.status === 404) {
               setMistake(err.response.data.error);
               //  toast.warning({ text: err.response.data.error });
             } else {
               console.log(err.response.data.error);
             }
           });
       }catch (err) {
         console.log(err);
       }
     }
   };
  

  return (
    <div className={styles.container}>
      <h1>Login an Account</h1>
      <h2>Please sign in to see the dashboard.</h2>
      {mistake ? <p className={styles.err}>{mistake}</p> : ""}
      <form onSubmit={handleSubmit} className={styles.form}>
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
        <button className={styles.button}>Login</button>
         <Link href="/dashboard/resetpassword"><span className={styles.forgot}>Forgot Password?</span></Link> 
      </form>
      <span>- OR -</span>
      <Link href="/dashboard/register">Create new account</Link>
    </div>
  );
};

export default Login;
