import Nav from "./Nav";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Your Weight Loss Journey",
    },
  },
};

const labels = ["Day 1", "Day 7", "Day 13", "Day 19", "Day 25"];

if (localStorage.getItem("chartData") == null) {
  if (localStorage.getItem("data") !== null) {
    let weight = parseInt(JSON.parse(localStorage.getItem("data")).weight);
    let newData = [weight];
    localStorage.setItem("chartData", JSON.stringify(newData));
  }
}

let chartData = {
  labels,
  datasets: [
    {
      label: "Weight",
      data: JSON.parse(localStorage.getItem("chartData")),
      borderColor: "rgb(219, 94, 11)",
      backgroundColor: "rgb(219, 94, 11, 0.5)",
    },
  ],
};

export default function Results() {
  let calendarDivs = [];
  let data = JSON.parse(localStorage.getItem("data"));
  const chartRef = useRef();
  let metrics = calculateMetrics(data);
  let weightInputDay = 7;
  let disabledLogBoxes = [];
  let disabledForms = JSON.parse(localStorage.getItem("logsDisabled"));
  for (let i = 1; i < 31; i++) {
    let form = "";
    let checked = false;
    let disabled = false;
    let style = {};
    if (disabledForms != null) {
      for (let j = 0; j < disabledForms.length; j++) {
        if (disabledForms[j] === "trackWeightDay" + i.toString()) {
          disabled = true;
          style = {
            backgroundColor: "gray",
          };
          break;
        }
      }
    }
    if (i === weightInputDay) {
      form = (
        <div>
          <label className="font-bold" htmlFor="trackWeightInput">
            Log weight
          </label>
          <input
            type="text"
            name="trackWeightInput"
            id={"trackWeightDay" + i.toString()}
            className="w-8 my-3"
            disabled={disabled}
            style={style}
          />
          <button
            onClick={() => {
              submitWeightLog(i);
            }}
            className="border-2 bg-blue-500 border-blue-600 p-1"
          >
            Submit
          </button>
        </div>
      );
      weightInputDay += 6;
    }
    if (i <= parseInt(localStorage.getItem("progress"))) {
      checked = true;
    }
    let html = (
      <div id={"day" + i} className="border-blue-400 rounded-xl border-[6px]">
        <div className="flex flex-row justify-center items-center mt-2 space-x-2">
          <h1 className="font-bold">Day {i}</h1>
          <input
            type="checkbox"
            defaultChecked={checked}
            onClick={() => recordProgress(i)}
            name={"day" + i.toString() + "Done"}
            id={"day" + i.toString() + "Done"}
          />
        </div>
        <div className="flex flex-row">
          <div className="shrink-0 flex flex-col items-start ml-2 mt-2">
            <div>
              <h1>
                <i className="fa-solid fa-burger"></i> x {metrics.intake} cals
              </h1>
            </div>
            <div>
              <h1>
                <i className="fa-solid fa-glass-water"></i> x{" "}
                {metrics.waterIntake} glasses
              </h1>
            </div>
            <div>
              <h1>
                <i className="fa-solid fa-person-running"></i> x{" "}
                {metrics.cardio} mins
              </h1>
            </div>
            <div>
              <h1>
                <i className="fa-solid fa-dumbbell"></i> x {metrics.strength}{" "}
                mins
              </h1>
            </div>
          </div>
          <div className="grow flex flex-col m-2 items-center">{form}</div>
        </div>
      </div>
    );
    calendarDivs.push(html);
  }

  function submitWeightLog(day) {
    let weightInput = document.getElementById(
      "trackWeightDay" + day.toString()
    ).value;
    if (
      weightInput !== "" &&
      !isNaN(parseInt(weightInput)) &&
      parseInt(weightInput) > 0
    ) {
      chartData.datasets[0].data.push(parseInt(weightInput));
      document.getElementById("trackWeightDay" + day.toString()).value = "";
      document.getElementById(
        "trackWeightDay" + day.toString()
      ).readOnly = true;
      document.getElementById(
        "trackWeightDay" + day.toString()
      ).style.backgroundColor = "gray";
      chartRef.current.update();
      localStorage.setItem(
        "chartData",
        JSON.stringify(chartData.datasets[0].data)
      );
      disabledLogBoxes.push("trackWeightDay" + day.toString());
      localStorage.setItem("logsDisabled", JSON.stringify(disabledLogBoxes));
    } else {
      alert("invalid log input");
    }
  }

  function calculateMetrics(data) {
    let weight = data.weight;
    let waterIntake = (weight * (2 / 3)) / 8;
    let cardio = 0;
    let strength = 0;
    let intake = 0;
    if (weight < 100) {
      cardio = 25;
      strength = 20;
      intake = 1800;
    } else if (weight < 120) {
      cardio = 28;
      strength = 23;
      intake = 2000;
    } else if (weight < 150) {
      cardio = 31;
      strength = 25;
      intake = 2200;
    } else if (weight < 180) {
      cardio = 35;
      strength = 33;
      intake = 2300;
    } else if (weight < 200) {
      cardio = 43;
      strength = 37;
      intake = 2410;
    } else if (weight < 230) {
      cardio = 60;
      strength = 41;
      intake = 2430;
    } else if (weight < 250) {
      cardio = 80;
      strength = 47;
      intake = 2500;
    } else if (weight < 280) {
      cardio = 100;
      strength = 51;
      intake = 2700;
    } else {
      cardio = 120;
      strength = 53;
      intake = 3000;
    }

    waterIntake += ((cardio + strength) / 30) * 1.5;

    return {
      waterIntake: waterIntake,
      cardio: cardio,
      strength: strength,
      intake: intake,
    };
  }

  function recordProgress(i) {
    if (
      document.getElementById("day" + i.toString() + "Done").checked === false
    ) {
      localStorage.setItem("progress", Math.max(i - 1, 1));
    }
    localStorage.setItem("progress", i);
  }

  function showNav() {
    document.getElementById("Nav").style.display = "flex";
    console.log("Show");
  }

  return (
    <>
      <Nav></Nav>
      <div className="flex flex-col h-fit text-center  bg-blue-200">
        <div className="flex flex-row text-center border-blue-400 items-center justify-center">
          <div className="absolute left-12">
            <button onClick={showNav}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
          <div className="justify-self-center basis-11/12 text-center">
            <h1 className="mt-4 pb-4 text-4xl font-bold">Your Personal Plan</h1>
          </div>
        </div>
        <div className="grow grid grid-rows-5 grid-cols-6 gap-y-5 gap-x-3 p-3">
          {calendarDivs}
        </div>
        <div className="flex flex-row border-blue-400 items-center space-x-5 pl-3">
          <h1 className="text-2xl">Key:</h1>
          <h1>
            <i className="fa-solid fa-burger"></i> - Calorie Intake
          </h1>
          <h1>
            <i className="fa-solid fa-glass-water"></i> - Glasses of Water
          </h1>
          <h1>
            <i className="fa-solid fa-person-running"></i> - Cardio
          </h1>
          <h1>
            <i className="fa-solid fa-dumbbell"></i> - Muscle Training
          </h1>
        </div>
        <div className="flex flex-col">
          <Line
            options={options}
            data={chartData}
            ref={chartRef}
            redraw={true}
          ></Line>
        </div>
        <div className="flex flex-row">
          <table class="tracker w-full">
            <tr>
              <th className="pl-24">Date</th>
              <th>Workout</th>
              <th>Duration</th>
              <th></th>
            </tr>
            <tbody class="tracker__entries">
              <tr class="tracker__row">
                <td>
                  <input type="date" class="tracker__date" />
                </td>
                <td>
                  <select class="tracker__workout">
                    <option value="walking">Walking</option>
                    <option value="running">Running</option>
                    <option value="outdoor-cycling">Outdoor Cycling</option>
                    <option value="indoor-cycling">Indoor Cycling</option>
                    <option value="swimming">Swimming</option>
                    <option value="yoga">Yoga</option>
                  </select>
                </td>
                <td>
                  <input type="number" class="tracker__duration" />
                  <span class="tracker__text">minutes</span>
                </td>
                <td>
                  <button type="button" class="tracker__button">
                    &times;
                  </button>
                </td>
              </tr>
              <tr class="tracker__row">
                <td>
                  <input type="date" class="tracker__date" />
                </td>
                <td>
                  <select class="tracker__workout">
                    <option value="walking">Walking</option>
                    <option value="running">Running</option>
                    <option value="outdoor-cycling">Outdoor Cycling</option>
                    <option value="indoor-cycling">Indoor Cycling</option>
                    <option value="swimming">Swimming</option>
                    <option value="yoga">Yoga</option>
                  </select>
                </td>
                <td>
                  <input type="number" class="tracker__duration" />
                  <span class="tracker__text">minutes</span>
                </td>
                <td>
                  <button type="button" class="tracker__button">
                    &times;
                  </button>
                </td>
              </tr>
              <tr class="tracker__row">
                <td>
                  <input type="date" class="tracker__date" />
                </td>
                <td>
                  <select class="tracker__workout">
                    <option value="walking">Walking</option>
                    <option value="running">Running</option>
                    <option value="outdoor-cycling">Outdoor Cycling</option>
                    <option value="indoor-cycling">Indoor Cycling</option>
                    <option value="swimming">Swimming</option>
                    <option value="yoga">Yoga</option>
                  </select>
                </td>
                <td>
                  <input type="number" class="tracker__duration" />
                  <span class="tracker__text">minutes</span>
                </td>
                <td>
                  <button type="button" class="tracker__button">
                    &times;
                  </button>
                </td>
              </tr>
              <tr class="tracker__row">
                <td>
                  <input type="date" class="tracker__date" />
                </td>
                <td>
                  <select class="tracker__workout">
                    <option value="walking">Walking</option>
                    <option value="running">Running</option>
                    <option value="outdoor-cycling">Outdoor Cycling</option>
                    <option value="indoor-cycling">Indoor Cycling</option>
                    <option value="swimming">Swimming</option>
                    <option value="yoga">Yoga</option>
                  </select>
                </td>
                <td>
                  <input type="number" class="tracker__duration" />
                  <span class="tracker__text">minutes</span>
                </td>
                <td>
                  <button type="button" class="tracker__button">
                    &times;
                  </button>
                </td>
              </tr>
              <tr class="tracker__row">
                <td>
                  <input type="date" class="tracker__date" />
                </td>
                <td>
                  <select class="tracker__workout">
                    <option value="walking">Walking</option>
                    <option value="running">Running</option>
                    <option value="outdoor-cycling">Outdoor Cycling</option>
                    <option value="indoor-cycling">Indoor Cycling</option>
                    <option value="swimming">Swimming</option>
                    <option value="yoga">Yoga</option>
                  </select>
                </td>
                <td>
                  <input type="number" class="tracker__duration" />
                  <span class="tracker__text">minutes</span>
                </td>
                <td>
                  <button type="button" class="tracker__button">
                    &times;
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr class="tracker__row tracker__row--add">
                <td colspan="4">
                  <span class="tracker__add">Add Entry +</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
