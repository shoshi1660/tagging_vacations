import axios from "axios";
import { Component, useEffect, useState } from "react";
import { VacationModel } from "../../Models/VacationModel";
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Logout from "../Logout";
import { Navigate } from "react-router-dom";



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  // Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'עמוד דוחות',
    },
  },
};

interface Vacations {
  vacations: any[];
  vacationId: number;
  amountFollowers: number | null;
  destination: string;
  reporting: Boolean
}

function AdminReport(): JSX.Element {
  let [state, setState] = useState<Vacations>({ vacations: [], vacationId: 0, amountFollowers: 0, destination: "", reporting: true });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/admin/vacations/amount/Followers");
        setState({ vacations: response.data, vacationId: response.data.vacationId, amountFollowers: response.data.amountFollowers, destination: response.data.destination, reporting: state.reporting })
      }
      catch (error) {
        console.log("server error");
        console.log(error);
      }
    }
    getData();

  }, []);
  const labels = state.vacations.map(v => [v.destination, `vacation ${v.vacationId}`]);

  const data = {
    labels,
    datasets: [{
      data: state.vacations.map(v => v.amountFollowers),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }],
  };
  return (
    <div>
      <header><Logout /></header>
      <div className="m-5 mt-0">
      {!state.reporting && <Navigate to="/admin" replace={true} />}
      <button onClick={() => setState({ ...state, reporting: false })} className="btn btn-outline-primary m-4">חזור לדף הבית</button>
      <Bar options={options} data={data} />
      </div>
    </div>
  )
}
export default AdminReport;