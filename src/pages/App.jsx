import { useState } from "react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className=" bg-blue-400 text-center h-screen overflow-clip">
      <h1 className="pt-10 pb-10 text-4xl text-white font-bold bg-neutral-800">
        Your Personalized Health Portal
      </h1>
      <div className="App flex flex-row mt-10 h-full justify-evenly">
        <a
          href="http://127.0.0.1:5500/public/Instant%20Health%20Portal/me.html"
          target={"_blank"}
          rel={"noreferrer"}
          className="flex flex-col text-center items-center justify-center rounded-2xl border-8 border-blue-900 px-3 py-2 h-3/5 w-2/5 text-white bg-blue-700 hover:bg-blue-500"
        >
          <h1 className="text-4xl font-bold my-3 p-4">Instant</h1>
          <p className="text-2xl">
            Instant feedback on your physical statistics that will provide
            suggestions to progress and improve your health
          </p>
        </a>
        <Link
          to={"/login"}
          state={{ mode: "longterm" }}
          className="flex flex-col text-center items-center justify-center rounded-2xl border-8 border-blue-900 px-3 py-2 h-3/5 w-2/5 text-white bg-blue-700 hover:bg-blue-500"
        >
          <button id="longTermButton">
            <h1 className="text-4xl font-bold my-3 p-4">Long Term Goal</h1>
            <p className="text-2xl">
              A personal hub which will track your fitness and help you reach a
              long-term health goal while displaying data in a
              easy-to-understand interface.
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
}
