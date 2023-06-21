'use client'
import React, { useState } from 'react'
import styles from "./page.module.css";
import { PasswordResetValidate } from '@/components/Validation/Validation';
import { PasswordResetAuth } from '@/components/Services/Service.auth';

const ResetPassword = () => {
    const [error, setError] = useState({});
    const [email, setEmail] = useState('');
    const [mistake, setMistake]=useState("");
    const [errors, setErrors] = useState('');
    const handleSubmit = async(e) => {
        e.preventDefault();
        const validate = await PasswordResetValidate(email);
        setError(validate);
        if (Object.keys(validate).length === 0) {
            try {
          const userdetails ={email};
            await PasswordResetAuth(userdetails).then((res) => {
                setMistake(res.data.message);
                setEmail("");
            }).catch((err) => {
                if (err.response.status === 404 || err.response.status === 500) {
                    setErrors(err.response.data.message);
                }  
         }) 
        }catch (err) {
          console.log(err);
        }
        }
    }

  return (
    <div>
      <div className={styles.container}>
        <h1>Forgot Password</h1>
        <h2>You can reset your password here.</h2>
        {mistake ? <p className={styles.message}>{mistake}</p> : ""}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className={styles.err}>{error.email}</p>}
          {errors && <p className={styles.err}>{errors}</p>}
          <button className={styles.button}>Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;