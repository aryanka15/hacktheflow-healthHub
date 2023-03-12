import { Link } from "react-router-dom";

export default function Instant() {
  function submitData(e) {
    // Add data to localStorage
    let form = document.getElementById("healthDataForm");
    let weight = isNaN(parseInt(form.weightInput.value))
      ? 0
      : parseInt(form.weightInput.value);
    let height = isNaN(parseInt(form.heightInput.value))
      ? 0
      : parseInt(form.heightInput.value);
    let exercise = isNaN(parseInt(form.exerciseInput.value))
      ? 0
      : parseInt(form.exerciseInput.value);
    let water = isNaN(parseInt(form.waterInput.value))
      ? 0
      : parseInt(form.waterInput.value);
    let goal = isNaN(parseInt(form.goalInput.value))
      ? 0
      : parseInt(form.goalInput.value);
    console.log(weight);
    if (
      weight <= 0 ||
      exercise <= 0 ||
      water <= 0 ||
      height <= 0 ||
      goal <= 0
    ) {
      e.preventDefault();
      alert("Please fill out all fields");
      return;
    }

    if (goal >= weight) {
      e.preventDefault();
      alert("Your weight loss cannot be greater than your weight");
      return;
    }

    let data = {
      weight: weight,
      exercise: exercise,
      water: water,
      height: height,
      goal: goal,
    };

    localStorage.setItem("data", JSON.stringify(data));
  }

  return (
    <div className="Longterm flex flex-col h-screen bg-yellow-200 border-8 border-yellow-400">
      <div className="grow flex flex-col my-3 justify-center self-center space-y-10">
        <div className="flex flex-col text-center mx-5 my-3 items-center text-xl min-[350px]:text-2xl md:text-4xl space-y-3">
          <h1>Let's get you started on your journey to be fit and fabulous!</h1>
          <h1>We just need some data from you first.</h1>
        </div>
        <form
          id="healthDataForm"
          action=""
          className="flex flex-col space-y-5 w-60 md:w-80 self-center"
        >
          <div className="flex flex-col rounded-lg px-3 py-2 border-2 border-red-400 bg-red-200">
            <label htmlFor="weightInput">Weight:</label>
            <input
              type="number"
              id="weightInput"
              name="weightInput"
              placeholder="Weight (lb)"
              className="bg-transparent"
            />
          </div>
          <div className="flex flex-col rounded-lg px-3 py-2 border-2 border-gray-400 bg-gray-200">
            <label htmlFor="heightInput">Height:</label>
            <input
              type="number"
              id="heightInput"
              name="heightInput"
              placeholder="Height (in)"
              className="bg-transparent"
            />
          </div>
          <div className="flex flex-col rounded-lg px-3 py-2 border-2 border-green-400 bg-green-200">
            <label htmlFor="exerciseInput">Exercise:</label>
            <input
              type="number"
              id="exerciseInput"
              name="exerciseInput"
              placeholder="Exercise (min/day)"
              className="bg-transparent"
            />
          </div>
          <div className="flex flex-col rounded-lg px-3 py-2 border-2 border-blue-400 bg-blue-200">
            <label htmlFor="waterInput">Water:</label>
            <input
              type="number"
              id="waterInput"
              name="waterInput"
              placeholder="Water (glasses/day)"
              className="bg-transparent"
            />
          </div>
          <div className="flex flex-col rounded-lg px-3 py-2 border-4 border-yellow-400 bg-yellow-200">
            <label className="font-bold" htmlFor="goalInput">
              Goal:
            </label>
            <input
              type="number"
              id="goalInput"
              name="goalInput"
              placeholder="Weight Loss Amount"
              className="bg-transparent"
            />
          </div>
          <div className="flex self-center">
            <Link
              to={"/results"}
              onClick={submitData}
              className="border-2 text-center rounded-lg w-60 py-3 bg-yellow-400 border-black"
            >
              Submit
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
