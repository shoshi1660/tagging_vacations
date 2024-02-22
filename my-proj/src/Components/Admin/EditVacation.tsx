import { useForm } from "react-hook-form";
import { VacationModel } from "../../Models/VacationModel";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import "./AdminPage.css"
import VacationsConnect from "../../Services/VacationsConnect";
import jwtAxios from "../../Services/JwtAxios";
import moment from "moment";

interface state {
    Image: any;
    description: string;
    destination: string;
    startDate: Date | any;
    endDate: Date | any;
    price: any;
}

interface props {
    v: VacationModel;
}
export function EditVacation(props: props): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<VacationModel>();
    let [state, setState] = useState<state>({
                description: props.v?.description, destination: props.v?.destination, Image: props.v?.Image[0].name,
        startDate: props.v?.startDate, endDate: props.v?.endDate, price: props.v?.price
    });
    function ccc() {
        const myFormData = new FormData();
        myFormData.append("description", state.description ? state.description : props.v.description);
        myFormData.append("destination", state.destination ? state.destination : props.v.destination);
        myFormData.append("Image", state.Image ? state.Image : props.v.Image);
        myFormData.append("startDate", state.startDate ? state.startDate : props.v.startDate);
        myFormData.append("endDate", state.endDate ? state.endDate : props.v.endDate);
        myFormData.append("price", state.price ? state.price : props.v.price);
        return myFormData
    }
    async function changeVacation() {
        try {
            debugger;

            await axios.put<FormData>(`http://localhost:4000/admin/vacations/${props.v.vacationId}`, ccc());
            
             setState({
                description: props.v?.description, destination: props.v?.destination, Image: props.v?.Image[0].name,
                startDate: props.v?.startDate, endDate: props.v?.endDate, price: props.v?.price
            })
            const getResponse = await jwtAxios.get<VacationModel[]>("http://localhost:4000/admin/vacations/");
            VacationsConnect.vacationsConnect.send(getResponse.data);
           
        } catch (err) {
            alert("Error: " + err);
            console.log(err);
        }
    }

    function destination(e: ChangeEvent<HTMLInputElement>) {
        setState({ ...state, destination: (e.currentTarget).value })
    }

    function description(e: ChangeEvent<HTMLInputElement>) {
        setState({ ...state, description: (e.currentTarget).value })
    }

    function startDate(e: ChangeEvent<HTMLInputElement>) {
        setState({ ...state, startDate: (e.currentTarget).value })
    }

    function endDate(e: ChangeEvent<HTMLInputElement>) {
        setState({ ...state, endDate: (e.currentTarget).value })
    }

    function price(e: ChangeEvent<HTMLInputElement>) {
        setState({ ...state, price: (e.currentTarget).value })
    }
    function image(e: React.ChangeEvent<HTMLInputElement>) {
        setState({ ...state, Image: (e?.target?.files?.[0].name) })
    }

    return (
        <div className="modal fade" id="editModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            הוספת חופשה
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>

                    <div className="modal-body">
                        <div className="row">
                            <div className="col-9">
                                <input placeholder={props.v?.destination} className="form-control" id="destination" autoFocus onChange={destination} minLength={2} maxLength={40} />
                            </div>
                            {errors.destination?.type === "minLength" && <span> קצר מידי</span>}
                            <label htmlFor="destination" className="form-label col-3 mb-3">: יעד</label>
                        </div><br />

                        < div className="row">
                            <div className="col-9">

                                <input placeholder={props.v?.description} className="form-control" id="onChange" onChange={description} minLength={2} maxLength={50} />
                            </div>
                            {errors.description?.type === "minLength" && <span> קצר מידי</span>}
                            <label htmlFor="description" className="form-label col-3 mb-3">: תאור</label>
                        </div><br />

                        <div className="row">
                            <div className="col-9">
                                <input type="file" id="imageName" className="form-control" placeholder={props.v?.Image} onChange={image} />


                                {errors.Image?.type === "required" && <span> שדה חובה</span >}
                            </div >
                            <label htmlFor="Image" className="form-label col-3 mb-3">: תמונה</label>
                        </div><br />

                        <div className="row">
                            <div className="col-9">
                                <input defaultValue={moment(props.v?.startDate).format('YYYY-MM-DD')}
                                    type="date" onChange={startDate} className="form-control" id="startDate" />
                            </div>
                            <label htmlFor="startDate" className="form-label col-3 mb-3">: תאריך התחלה</label>
                        </div><br />

                        <div className="row">
                            <div className="col-9">
                                <input defaultValue={moment(props.v?.endDate).format('YYYY-MM-DD')} type="date"
                                    onChange={endDate} className="form-control" id="endDate" />
                            </div>
                            <label htmlFor="endDate" className="form-label col-3 mb-3"> : תאריך סיום</label>

                        </div><br />

                        <div className="row">
                            <div className="col-9">
                                <input placeholder={props.v?.price.toString()} onChange={price} className="form-control" id="price" />
                            </div>
                            <label htmlFor="price" className="form-label col-3 mb-3">מחיר: </label>

                        </div><br />

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            סגור
                        </button>
                        <button className="btn btn-primary" onClick={changeVacation} type="reset">
                            שינוי חופשה
                        </button>
                    </div>
                </div>
            </div >
        </div>
    );
}