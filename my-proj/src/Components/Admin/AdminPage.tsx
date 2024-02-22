import axios from "axios";
import { Component } from "react";
import { VacationModel } from "../../Models/VacationModel";
import VacationsConnect from "../../Services/VacationsConnect";
import globals from "../../Services/Globals";
import "./AdminPage.css"
import { AddVacation } from "./AddVacation";
import { EditVacation } from "./EditVacation";
import Logout from "../Logout";
import { Navigate, useNavigate } from "react-router-dom";
import jwtAxios from "../../Services/JwtAxios";
import moment from 'moment';

interface Vacations {
    vacations: VacationModel[];
    vacationId: number;
    description: string;
    destination: string;
    startDate: Date | null;
    endDate: Date | null;
    price: number;
    amountFollowers: number | null;
    Image: string;
    select: boolean;
    id: any;
    v: VacationModel;
    reporting: boolean;
    vacation: any;
}

class AdminPage extends Component<{}, Vacations> {

    constructor(props: {}) {
        super(props);
        this.state = { ...this.state, vacations: [], vacationId: 0, description: "", destination: "", startDate: null, endDate: null, price: 0, amountFollowers: null, Image: "", select: false, id: null, reporting: false };
    }

    componentDidMount = async () => {
        debugger;
        VacationsConnect.vacationsConnect.socket?.on("vacation-from-server", async (vacations) => {
            this.setState({ vacations: vacations })
        })
        const response = await jwtAxios.get<VacationModel[]>("http://localhost:4000/admin/vacations/");
        this.setState({ vacations: response.data })
        console.log(this.state.vacations);
    }
    public render(): JSX.Element {
        return (
            <div>
                <header><Logout /></header>
                {this.state.reporting && <Navigate to="/admin/report" replace={true} />}
                <div className="container " >
                    <button className="btn btn-outline-primary m-4" data-bs-toggle="modal" data-bs-target="#exampleModal">  הוספת חופשה  </button>
                    <AddVacation />
                    <button className="btn btn-outline-primary m-4" onClick={() => this.setState({ reporting: true })}>  אדמין דוחות </button>
                    <div className="row col-12">
                        {this.state.vacations && this.state.vacations.map(v =>
                            <div className="card col-3 m-1" key={v.vacationId}>
                                <div className="col-12 d-flex">
                                    <button onClick={() => this.deleteVacation(v.vacationId)} className="btn-close pb-3 col-2" aria-label="Close" ></button>
                                    <button type="button" onClick={() => this.setState({ v })} className="btn col-2  me-md-2 btn-focus-shadow" data-bs-toggle="modal" data-bs-target="#editModal" >
                                        <svg className="bi bi-pencil edit" width="16" height="16" >
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="card-header" >{v.destination}</div>
                                <img className="card-img-top img" src={globals.imageUrl + v.Image} />
                                <div className="card-title">{v.description}</div>
                                <div className="card-body">{v.price}$</div>

                                <div className="card-footer">
                                    : בין התאריכים <br />
                                    {moment(v.endDate).format('DD.MM.YYYY')} - {moment(v.startDate).format('DD.MM.YYYY')}
                                </div>
                            </div>
                        )}
                        <div>
                            <EditVacation v={this.state.v} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    deleteVacation = async (vacation: any) => {
        try {
            const response = await axios.delete(`http://localhost:4000/admin/vacation/${vacation}`);
                      this.setState(prevState => ({
                vacations: prevState.vacations.filter(v => v.vacationId !== vacation)
            }), () => {
                VacationsConnect.vacationsConnect.send(this.state.vacations);
            });
        }
        catch (err: any) {
            console.log(err.response.data);
        }
    }
}
export default AdminPage;
