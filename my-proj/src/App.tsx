import React, { useState, useEffect,useContext } from 'react';
import logo from './logo.svg';
import './App.css';
// import Login, { Context, UserDetailsType, setUserDetails, userDetails } from './Components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserPage from './Components/UserPage';
import Registration from './Components/Registration';
import { Routing } from './Routing/Routing';
import { UserContext, UserDetailsType } from './Context/UserContext';
import Login from './Components/Login';

interface IsLoggedin {
  isLoggedin: boolean;
}

function App(): JSX.Element {
  let [state, setState] = useState<IsLoggedin>();
  useEffect(() => {
    if (localStorage.loginData)
      setState({ isLoggedin: true })
    else
      setState({ isLoggedin: false })
  }, [])
  // const isAuth = state?.isLoggedin;
  // const v=useContext(userDetails);
    // const { userDetails, setUserDetails } = useContext<UserDetailsType>(UserContext)

  const [userDetails, setUserDetails] = useState<any>();
  // const currentUser = userDetails;
  // const {signedInUser, theme} = props;
  // [userDetails, currentUser] = useState<UserDetailsType>();

  return (
    <div className="App">
      {/* <Context.Provider value={ v }> */}

      <UserContext.Provider value={{ userDetails, setUserDetails }}>
        {/* <header className="App-header">
          {userDetails && state?.isLoggedin &&
            <button onClick={logout}>Logout</button>}
        </header> */}
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>

      {/* </Context.Provider > */}
    </div>
  );
 
}

export default App;
