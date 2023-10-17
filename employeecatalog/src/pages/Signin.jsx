import React, {useEffect} from "react";

import Back from '../components/Back/index'
import Login from "../components/Login";

function SignIn() {
  useEffect(() => {
    return () => {
      const body = document.querySelector('body')
      body.className = 'signin'
      body.style.backgroundColor = '#fff'
    }
  }, [])

  return (
    <div className="limiter">
      <Back/>
      <div className="container__login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-title">Войти</span>
            <Login type={'text'} name={'username'} placeholder={'Логин'}/>
            <Login type={'password'} name={'password'} placeholder={'Пароль'}/>
            <div className="wrap__forgot_pass">
              <div className="wrap__remember_me">
                <input className="custom-checkbox" type="checkbox" name="remember-me" id="ckb1"/>
                <label htmlFor="ckb1">Запомнить</label>
              </div>
              <div className="forgot-me">
                <a className="txt1" href="/"> Забыли пароль? </a>
              </div>
            </div>
            <div className="wrap_login_button">
              <button className="login">Авторизоваться</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn;