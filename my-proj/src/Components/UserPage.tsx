import { useContext, useEffect, useState } from "react";
import { UserContext, UserDetailsType } from "../Context/UserContext";
import Logout from "./Logout";
import axios from "axios";
import globals from "../Services/Globals";
import '../App.css';
import FollowModel from "../Models/follow-model";
import { VacationModel } from "../Models/VacationModel";
import VacationsConnect from "../Services/VacationsConnect";
import moment from "moment";

interface VacationsState {
    vacations: any[];
    vacationId: number;
    description: string;
    destination: string;
    startDate: Date | null;
    endDate: Date | null;
    price: number;
    amountFollowers: number | null;
    Image: any;
    id: number;
    followingId: number | null
    allVacations: VacationModel[];
}

function UserPage(): JSX.Element {
    let [state, setState] = useState<VacationsState>({
        vacations: [],
        vacationId: 0, description: "", destination: "", startDate: null, endDate: null,
        price: 0, amountFollowers: null, Image: "", id: 0, followingId: null, allVacations: []
    });
    const { userDetails, setUserDetails } = useContext<UserDetailsType>(UserContext);
    debugger;
    console.log("userDetails.id", userDetails.id);
    useEffect((): any => {

        VacationsConnect.vacationsConnect.socket?.on("vacation-from-server", async (vacations) => {   
            
            if (Array.isArray(vacations))
                setState({ ...state, vacations: [...state.vacations, ...vacations] })
            else
                setState({ ...state, vacations: [...state.vacations, vacations] })
        })

        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/medium/vacations/${userDetails.id}`);
                console.log("data", response.data);
                debugger
                setState({ ...state, vacations: response.data })
                console.log(state.vacations);
                            }
            catch (error) {
                console.log("server error");
                console.log(error);
            }
        }
        getData();


    }, [])
    useEffect(() => { }, [state.vacations])
    // useEffect(() => {
    //     VacationsConnect.vacationsConnect.socket?.on("vacation-from-server", async vacation => {
    //         const allVacations = [...state.vacations];
    //         allVacations.push(vacation);

    //         setState({ vacations: allVacations })
    //     });

    // }, []);
    console.log("userDetails.id", userDetails.id);

    debugger
    async function doFollow(vacation: any) {
        debugger
        if (vacation.id !== userDetails.id) {
            console.log("vacation", vacation);
            try {
                const addFollowToFollowing = await axios.post<FollowModel>("http://localhost:4000/medium/vacations/follow/", { vacationId: vacation.vacationId, id: userDetails.id });
                console.log("addFollowToFollowing", addFollowToFollowing.data);
                try {
                    const addFollowToVacation = await axios.put(`http://localhost:4000/medium/vacations/follow/${vacation.vacationId}`);
                    console.log(addFollowToVacation.data);
                    // setState({...state,vacations:addFollowToVacation.data.id});

                } catch (error) {
                    alert(error)
                }
            } catch (error) {
                alert(error)
            }
        }
        else {
            console.log("is not null");
            try {
                const deleteFollowToFollowing = await axios.delete(`http://localhost:4000/medium/vacations/follow/${vacation.followingId}`);
                console.log("deleteFollowToFollowing", deleteFollowToFollowing.data);
                try {
                    const subtractFollowToVacation = await axios.put(`http://localhost:4000/medium/vacations/follow/subtract/${vacation.vacationId}`);
                    console.log(subtractFollowToVacation.data);
                    alert("succes!")
                } catch (error) {
                    alert(error)
                }
            } catch (error) {
                alert(error)
            }
        }
    }

    return (
        <>
            <header><Logout /></header>
            <div className="p-5 m-5" >
                <div className="row ">
                    {state.vacations && state.vacations.map(v =>
                        <div className="card col-3 m-4 " key={v.vacationId}>
                            <div>{v.vacationId}</div>
                            <div className="col-12  ">
                                <input className="btn btnFollow col-2 m-2 d-flex" value={"F"} style={{ backgroundColor: v.id === userDetails.id ? "yellow" : " " }} onClick={() => { doFollow(v) }} />
                            </div>
                            <div className="card-header">{v.destination}</div>
                            <img className="card-img-top img" src={globals.imageUrl + v.Image} />
                            <div className="card-title">{v.description}</div>
                            <div className="card-body">{v.price}$</div>
                            <div style={{ backgroundColor: "black", color: "white" }}>{v.amountFollowers} -  עקבו אחרי </div>
                            <div className="card-footer" >
                                : בין התאריכים <br />
                                {moment(v.endDate).format('DD.MM.YYYY')} - {moment(v.startDate).format('DD.MM.YYYY')}
                            </div>

                        </div>
                    )}
                </div>
            </div >
        </>
    )
}

export default UserPage;