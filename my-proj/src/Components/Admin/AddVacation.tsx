import { useForm } from "react-hook-form";
import { VacationModel } from "../../Models/VacationModel";
import { useState } from "react";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";
import VacationsConnect from "../../Services/VacationsConnect";
import "./AdminPage.css"
import jwtAxios from "../../Services/JwtAxios";

interface state {
    vacation: any;
    Image: any;
    description: string;
    destination: string;
    startDate: Date | any;
    endDate: Date | any;
    price: number
}
export function AddVacation(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<VacationModel>();
    let [state, setState] = useState<state>({ description: "", destination: "", Image: "", startDate: null, endDate: null, price: 0, vacation: "" });
    const navigate = useNavigate()

    async function insertVacation(vacation: VacationModel) {

        try {
            console.log("vacation", vacation);
            const response = await axios.post<VacationModel>("http://localhost:4000/admin/vacations/", VacationModel.convertToFormData(vacation));

            const getResponse = await jwtAxios.get<VacationModel[]>("http://localhost:4000/admin/vacations/");
            VacationsConnect.vacationsConnect.send(getResponse.data);
            setState({ ...state, vacation: response.data });
        } catch (err) {
            alert("Error: " + err);
            console.log(err);
        }
    }

    return (

        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            הוספת חופשה
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form className="mb-3 mt-3" id="form" onSubmit={handleSubmit(insertVacation)}>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-9">
                                    <input className="form-control" id="destination" autoFocus {...register("destination", { required: true, minLength: 2, maxLength: 40 })} />
                                    {errors.destination?.type === "required" && <span> שדה חובה</span>}
                                    {errors.destination?.type === "minLength" && <span> קצר מידי</span>}
                                </div>
                                <label htmlFor="destination" className="form-label col-3 mb-3">: יעד</label>
                            </div><br />

                            <div className="row">
                                <div className="col-9">
                                    <textarea className="form-control" id="description" {...register("description", { required: true, minLength: 2, maxLength: 50 })} />
                                    {errors.description?.type === "required" && <span> שדה חובה</span>}
                                    {errors.description?.type === "minLength" && <span> קצר מידי</span>}
                                </div>
                                <label htmlFor="description" className="form-label col-3 mb-3">: תאור</label>
                            </div><br />

                            <div className="row">
                                <div className="col-9">
                                    <input type="file" id="Image" className="form-control" multiple {...register("Image", { required: true })} />
                                    {errors.Image?.type === "required" && <span> שדה חובה</span>}
                                </div>
                                <label htmlFor="Image" className="form-label col-3 mb-3">: תמונה</label>
                            </div><br />

                            <div className="row">
                                <div className="col-9">
                                    <input type="date" className="form-control" id="startDate" {...register("startDate", { required: true })} />
                                    {errors.startDate?.type === "required" && <span> שדה חובה</span>}
                                </div>

                                <label htmlFor="startDate" className="form-label col-3 mb-3">: תאריך התחלה</label>
                            </div><br />

                            <div className="row">
                                <div className="col-9">
                                    <input type="date" className="form-control" id="endDate" {...register("endDate", { required: true })} />
                                    {errors.endDate?.type === "required" && <span> שדה חובה</span>}
                                </div>
                                <label htmlFor="endDate" className="form-label col-3 mb-3"> : תאריך סיום</label>

                            </div><br />

                            <div className="row">
                                <div className="col-9">
                                    <input className="form-control" id="price" {...register("price", { required: true, maxLength: 11 })} />
                                    {errors.price?.type === "required" && <span> שדה חובה</span>}
                                </div>
                                <label htmlFor="price" className="form-label col-3 mb-3">מחיר: </label>

                            </div><br />

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                סגור
                            </button>
                            {/* {(state.price == 0 || state.description == "" || state.destination == "" || state.startDate == "") ?
                                <button className="btn btn-primary">שמירת הוספה </button> : */}
                                <button className="btn btn-primary" data-bs-dismiss="modal">שמירת הוספה </button>
                            {/* } */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}