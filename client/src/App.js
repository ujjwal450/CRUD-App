import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import UserForm from './components/Users/UserForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState('')
  const [showSignupFrom, setShowSignupForm] = useState(false)
  useEffect(()=> {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    if (token){
      setIsLoggedIn(true)
    }
    if (username){
      setUserData(username)
    }

  }, [])

  const loginHandler = async(loginInformation) => {
    if(loginInformation.accountType === 'admin'){
    try {
      const response = await fetch('http://127.0.0.1:3000/admin/login',{
        method:'POST',
        body: JSON.stringify(loginInformation),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (response.status !== 400){
        setUserData(data.admin.username)
        setIsLoggedIn(true)
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.admin.username)
        localStorage.setItem('accountType', data.admin.accountType)
      }
    } catch (error) {
      console.log(error)
    }
  }
    else{
      try {
        const response = await fetch('http://127.0.0.1:3000/user/login',{
          method:'POST',
          body: JSON.stringify(loginInformation),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        if (response.status !== 400){
          setUserData(data.user.username)
          setIsLoggedIn(true)
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.user.username)
          localStorage.setItem('accountType',data.user.accountType)
        }
      } catch (error) {
        console.log(error)
      }
    }
      
  };
  const logoutHandler =async () => {
    const token = localStorage.getItem('token')
    const accountType = localStorage.getItem('accountType')
    if (accountType === 'admin'){
    try {
      const response = await fetch('http://127.0.0.1:3000/admin/logout',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
      })
      if(response.status === 200){
        setIsLoggedIn(false)
        localStorage.clear()
      }

    } catch (error) {
      
    }
  }else{
    try {
      const response = await fetch('http://127.0.0.1:3000/user/logout',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
      })
      if(response.status === 200){
        setIsLoggedIn(false)
        localStorage.clear()
      }

    } catch (error) {
      
    }
  }
    setIsLoggedIn(false);
  };
  const signupHandler =() => {
    setShowSignupForm((prevState) => {
      return(!prevState)
    })
  }
  const adminSignupHandler = async(data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email:data.email,
      mobileNo: data.mobileNo,
      username: data.username,
      password: data.password,
      accountType: 'admin'
    }
    try {
      const response = await fetch('http://127.0.0.1:3000/admin',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        'body': JSON.stringify(userData)
      })
      const data = await response.json()
      if (response.status !== 400){
        setUserData(data.admin.username)
        setIsLoggedIn(true)
        setShowSignupForm(false)
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.admin.username)
        localStorage.setItem('accountType',data.admin.accountType)
      }
      

    } catch (error) {
      
    }
  }

  return (
    <React.Fragment>
      
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} signup={signupHandler}/>
      {showSignupFrom ? <main><UserForm onSubmit={adminSignupHandler}/> </main>:
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} onLogin={userData}/>}
      </main>
}
    </React.Fragment>
  );
}

export default App;
