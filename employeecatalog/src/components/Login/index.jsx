import React from "react";

import styles from './login.module.scss'

function Login({type, name, placeholder}) {
  return (
    <div className={styles.wrap__username}>
      <input className={styles.input__username} type={type} name={name} placeholder={placeholder}/>
      <span className="focus-username"></span>
    </div>
  )
}

export default Login;