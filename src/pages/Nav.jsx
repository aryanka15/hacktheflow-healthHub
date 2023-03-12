import { Link } from "react-router-dom";

export default function Nav() {
  function hideNav() {
    document.getElementById("Nav").style.display = "none";
    console.log("Hide");
  }

  return (
    <div
      id="Nav"
      className="Nav absolute hidden flex-col w-1/4 h-screen bg-gray-300 border-4 border-gray-600 rounded-r-md z-10"
    >
      <div className="flex flex-row items-center mt-8 pl-8">
        <div className="grow flex justify-start">
          <h1 className="font-bold text-2xl">Welcome</h1>
        </div>
        <div className="flex pr-8 justify-end">
          <button onClick={hideNav}>
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <Link to={"/"}>
          <h1 className="mt-10 pl-8 py-2 text-lg border-t-2 bg-gray-400 border-gray-600">
            Home
          </h1>
        </Link>
        <Link to={"/results"}>
          <h1 className="pl-8 py-2 text-lg border-y-2 bg-gray-400 border-gray-600">
            Personal Plan
          </h1>
        </Link>
        <Link to={"/symptoms"}>
          <h1 className="pl-8 py-2 text-lg border-b-2 bg-gray-400 border-gray-600">
            Symptom Solver
          </h1>
        </Link>
      </div>
    </div>
  );
}
