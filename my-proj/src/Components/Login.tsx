import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import globals from '../Services/Globals';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import VacationsConnect from '../Services/VacationsConnect';
import { UserContext, UserDetailsType } from '../Context/UserContext';

function Login(): JSX.Element {
  const { userDetails, setUserDetails } = useContext<UserDetailsType>(UserContext)
  let [state, setState] = useState({ userName: "", password: "", admin: false, login: false, id: 0 });


  useEffect(() => {

    const UserExist = localStorage.getItem('loginData');
    debugger;
    if (UserExist) {
      VacationsConnect.vacationsConnect.connect();
      const data = JSON.parse(UserExist);
      console.log('data', data);
      setUserDetails({ userName: data?.userName, id: data?.id, role: data?.role, firstName: data?.firstName, lastName: data?.lastName });
      console.log('userDetails', userDetails);
      setState({ ...state, login: true, admin: data.role });
    }
    else {
      setState({ ...state, login: false });
    }
  }, []);

  return (
    <div className="p-5 m-5 border">
      {!state.login &&
        <div className="mb-3 mt-3" >
          <label htmlFor="username" className="form-label">שם משתמש</label>
          <p>
            <input className="form-control" id="username" onChange={usernameChanged} required />
          </p>
          <label htmlFor="password" className="form-label">סיסמה</label>
          <p>
            <input className="form-control" id="password" onChange={passwordChanged} required />
          </p>
          <p>
            {state.userName != "" && state.password != "" ?
            <button className="btn btn-primary" onClick={login}>כניסה</button>
              : <button disabled className="btn btn-primary">כניסה</button>} 
              
          </p>
          <Link to="/registration" className="btn btn-outline-primary" replace={true} >הרשמה</Link> <br />
        </div>}
      {state.admin && state.login && <Navigate to="/admin" replace={true} />}
      {!state.admin && state.login && <Navigate to="/user" replace={true} />}
    </div>
  );

  function usernameChanged(e: SyntheticEvent) {
    setState({ userName: (e.target as HTMLInputElement).value, password: state.password, admin: state.admin, login: state.login, id: state.id })
  }

  function passwordChanged(e: SyntheticEvent) {
    setState({ userName: state.userName, password: (e.target as HTMLInputElement).value, admin: state.admin, login: state.login, id: state.id })
  }

  async function login(e: SyntheticEvent) {
    try {
      const response = await axios.post(globals.loginUrl, { userName: state.userName, password: state.password })
      console.log(response.data);
      const id = response.data.id;
      setState({ userName: state.userName, password: state.password, admin: state.admin, login: state.login, id: response.data.id });
      console.log("loginData", localStorage.loginData);
      console.log("userDetails", localStorage.userDetails);
      console.log(id);
      debugger;
      VacationsConnect.vacationsConnect.connect();
  
      if (!response.data.role) {
        console.log("is not role");
        setState({ userName: state.userName, password: state.password, admin: false, login: true, id: response.data.id });
      }
      else {
        console.log("role");
        setState({ userName: state.userName, password: state.password, admin: true, login: true, id: response.data.id });
      }
      debugger;
      setUserDetails({ userName: state.userName, id: response.data.id, role: response.data.role, firstName: response.data.firstName, lastName: response.data.lastName });
      localStorage.setItem('loginData', JSON.stringify(response.data));
      debugger;
      console.log("userDetails", userDetails);
      console.log(setUserDetails);
      console.log(localStorage["loginData"]);
    } catch (error) {
      debugger;
      alert("כנראה שהפריטים שהוקשו שגויים");
    }

  }
}

export default Login;
