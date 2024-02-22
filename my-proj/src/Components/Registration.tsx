import axios from "axios";
import UserModel from "../Models/UserModel";
import { useForm } from "react-hook-form";
import globals from "../Services/Globals";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import VacationsConnect from "../Services/VacationsConnect";
import { UserContext, UserDetailsType } from "../Context/UserContext";


function Registration(): JSX.Element {
    const vacationsConnect = new VacationsConnect();
    const { userDetails, setUserDetails } = useContext<UserDetailsType>(UserContext)

    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();
    let [state, setState] = useState({ userName: "", password: "", login: false, id: 0 });
    const navigate = useNavigate();

    async function addUser(user: UserModel) {
        try {
            const response = await axios.post<UserModel>(globals.publicUrl, user);
            const addedUser = response.data as any; // The added user in the backend.
            setState({ userName: addedUser.userName, password: addedUser.password, login: state.login, id: addedUser.id });
            try {
                const response = await axios.post(globals.loginUrl, { userName: addedUser.userName, password: addedUser.password })
                console.log(response.data);
                setUserDetails({ userName: addedUser.userName, id: addedUser.id, role: addedUser.role, firstName: addedUser.firstName, lastName: addedUser.lastName });
                localStorage.setItem('loginData', JSON.stringify(response.data));
                setState({ userName: addedUser.userName, password: addedUser.password, login: true, id: addedUser.id });
                vacationsConnect.connect();
                navigate('/user');
            } catch (error) {
                alert("שגיאה במערכת נסה מאוחר יותר");
            }
        }
        catch (error) {
            alert("שם המשתמש קיים במערכת, נא להליף שם משתמש");
        }
    }
    return (
        <div className="view p-5 border">
            <div>
                <h2>הרשמה מהירה</h2>
                <form className="mb-3 mt-3" onSubmit={handleSubmit(addUser)}>

                    <label htmlFor="firstName" className="form-label"> שם</label> <br />
                    <input className="form-control" id="firstName" autoFocus {...register("firstName", { required: true, minLength: 2, maxLength: 20 })} />
                    <span className="col-12 text-danger">
                        {errors.firstName?.type === "required" && <span> שדה חובה</span>}
                        {errors.firstName?.type === "minLength" && <span> קצר מידי</span>}
                        {errors.firstName?.type === "maxLength" && <span> ארוך מידי</span>}
                    </span>

                    <br />

                    <label htmlFor="lastName" className="form-label">  שם משפחה </label> <br />
                    <input className="form-control" id="lastName" type="text" {...register("lastName", { required: true, minLength: 2, maxLength: 20 })} />
                    <span className="col-12 text-danger">
                        {errors.lastName?.type === "required" && <span> שדה חובה</span>}
                        {errors.lastName?.type === "minLength" && <span> קצר מידי</span>}
                        {errors.lastName?.type === "maxLength" && <span> ארוך מידי</span>}
                    </span>
                    <br />

                    <label htmlFor="userName" className="form-label">שם משתמש </label> <br />
                    <input className="form-control" id="userName" type="text"  {...register("userName", { required: true, minLength: 6, maxLength: 30 })} />
                    <span className="col-12 text-danger">
                        {errors.userName?.type === "maxLength" && <span> ארוך מידי</span>}
                        {errors.userName?.type === "required" && <span> שדה חובה</span>}
                        {errors.userName?.type === "minLength" && <span> קצר מידי</span>}
                    </span>
                    <br />

                    <label htmlFor="password" className="form-label">סיסמה</label> <br />
                    <input className="form-control" id="password" type="text"  {...register("password", { required: true, minLength: 6, maxLength: 30 })} />
                    <span className="col-12 text-danger">
                        {errors.password?.type === "required" && <span> שדה חובה</span>}
                        {errors.password?.type === "minLength" && <span> קצר מידי</span>}
                        {errors.password?.type === "maxLength" && <span> ארוך מידי</span>}
                    </span>
                    <br />

                    <button className="btn btn-primary" > (: הוסף אותי </button>
                </form>
            </div>
        </div>
    );
}

export default Registration;