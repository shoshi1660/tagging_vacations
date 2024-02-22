import { useContext, useState } from "react";
import VacationsConnect from "../Services/VacationsConnect";
import { useNavigate } from "react-router-dom";
import { UserContext, UserDetailsType } from "../Context/UserContext";
import '../App.css';

interface IsLoggedin {
    isLoggedin: boolean;
}

function Logout(): JSX.Element {
    const { userDetails, setUserDetails } = useContext<UserDetailsType>(UserContext)
    const navigate = useNavigate();
    let [state, setState] = useState<IsLoggedin>();

    return (
        <div className="header">
            <div className="col-12 row p-2">
                <div className="col-4 pt-1">Obser vacation</div>
                <div className="col-4 pt-1">שלום {userDetails.firstName} {userDetails.lastName}</div>
                <div className="col-4"><button className="btn btn-primary" onClick={isLogout}>יציאה מהמשתמש</button>  </div>
            </div>
        </div>
    )
    
    function isLogout(): void {
        localStorage.removeItem('loginData');
        VacationsConnect.vacationsConnect.disconnect();
        setState({ isLoggedin: false });
        setUserDetails({ userName: "", id: 0 ,role:null});
        navigate('/login');
    }
}
export default Logout;