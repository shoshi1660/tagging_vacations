import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import AdminPage from "../Components/Admin/AdminPage";
import UserPage from "../Components/UserPage";
import Registration from "../Components/Registration";
import { UserContext } from "../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import Logout from "../Components/Logout";
import AdminReport from "../Components/Admin/AdminReport";



export function Routing(): JSX.Element {
    const { userDetails, setUserDetails } = useContext(UserContext);

    return (
        <Routes>
            <Route path="/" element={< Login />} />
            < Route path="/login" element={< Login />} />
           
            < Route path="/admin" element={userDetails?.role ? < AdminPage /> : <Navigate to="/login" replace={true} />} />
            < Route path="/user" element={userDetails ? < UserPage /> : <Navigate to="/login" replace={true} />} />
            < Route path="/registration" element={< Registration />} />
            < Route path="/admin/report" element={userDetails?.role ? <AdminReport /> : <Navigate to="/login" replace={true} />} />
            < Route path="/logout" element={<Logout />} />
        </Routes>
    )
}
