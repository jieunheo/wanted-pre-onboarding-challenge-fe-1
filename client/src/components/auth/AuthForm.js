import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ setToken }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [message, setMessage] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [passwordEnabled, setPasswordEnabled] = useState(false);

  const submitHnadler = (event) => {
    event.preventDefault();

    setMessage(null);

    setMessage(`회원가입을 진행합니다.`);
    callAuthApi();
  }

  const inputChange = (event) => {
    const { target: { id, value } } = event;
    
    setMessage(null);

    if(id === 'email') {
      setEmail(value);
      if(value === '') {
        setMessage(`이메일을 입력해주세요.`);
        setEmailEnabled(false);

      } else if(!value.includes('@') || !value.includes('.')) {
        setMessage(`이메일 형식으로 입력해주세요.`);
        setEmailEnabled(false);

      } else {
        setEmailEnabled(true);

      }
    }

    if(id === 'password') {
      setPassword(value);
      if(value === '') {
        setMessage(`비밀번호를 입력해주세요.`);
        setPasswordEnabled(false);
  
      } else if(value.length < 8) {
        setMessage(`비밀번호는 8자리 이상 입력해주세요.`);
        setPasswordEnabled(false);
        
      } else {
        setPasswordEnabled(true);

      }
    }
  }

  const callAuthApi = async () => {
    const url = `http://localhost:8080/users/${isLogin ? 'login' : 'create'}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      const { details } = await response.json();
      setMessage(details);
      return;
    }
  
    const { message, token } = await response.json();
    setMessage(message);
    localStorage.setItem("token", token);
    setToken(localStorage.getItem("token"));
    navigate('/');
  }

  return (
    <>
      <h1>{isLogin ? '로그인' : '회원가입'}</h1>
      <form method='post' action='/users/create' onSubmit={submitHnadler}>
        <div>
          <label htmlFor='email'>이메일</label>
          <input type='email' id='email' value={email} onChange={inputChange} />
        </div>
        <div>
          <label htmlFor='password'>비밀번호</label>
          <input type='password' id='password' value={password} onChange={inputChange} />
        </div>
        {message && <p className='error'>{message}</p>}

        <div>
          <button type='submit' disabled={!(emailEnabled && passwordEnabled)}>{isLogin ? '로그인' : '회원가입'}</button>
          <button type='button' onClick={() => setIsLogin((prev) => !prev)}>{isLogin ? '회원가입으로' : '로그인으로'}</button>
        </div>
      </form>
    </>
  )
}

export default AuthForm;