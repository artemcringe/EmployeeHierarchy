import React, {useEffect} from "react";

import Back from '../components/Back/index'
import Login from "../components/Login";

function SignUp() {
  useEffect(() => {
    return () => {
      const body = document.querySelector('body')
      body.className = 'signup'
      body.style.backgroundColor = '#fff'
    }
  }, [])

  return (
    <div className="limiter">
      <Back/>
      <div className="container__login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-title">Регистрация</span>
            <Login type={'text'} name={'name'} placeholder={'Имя'}/>
            <Login type={'text'} name={'surname'} placeholder={'Фамилия'}/>
            <Login type={'text'} name={'username'} placeholder={'Логин'}/>
            <Login type={'password'} name={'password'} placeholder={'Пароль'}/>
            <div className="wrap_login_button">
              <button className="login">Зарегистрироваться</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;