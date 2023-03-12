import Nav from "./Nav";
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default function SymptomSolver() {
  function showNav() {
    document.getElementById("Nav").style.display = "flex";
  }

  async function onSearch() {
    document.getElementById("loading").style.display = "block";
    let response = await getResponse();
    let newResponse = response;
    if (response.trim().charAt(0) !== "1") {
      let index = response.indexOf("\n");
      newResponse = "\n" + response.substring(index + 1);
    }
    document.getElementById("output").innerText =
      "Possible conditions are " + newResponse;
    document.getElementById("symptomsInput").value = "";
    document.getElementById("loading").style.display = "none";
  }

  async function getResponse() {
    console.log("Requested");
    let input = document.getElementById("symptomsInput");
    if (input.value === "") {
      alert("Please enter symptoms in the search box");
      document.getElementById("loading").style.display = "none";
      return;
    }
    let symptoms = input.value.split(",");
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Give descriptions of possible diseases for symptoms of ${symptoms.toString()}`,
      temperature: 0,
      max_tokens: 700,
    });
    console.log(response);
    console.log("Repsonse: " + response.data.choices[0].text);
    console.log("Returned");
    return response.data.choices[0].text;
  }

  return (
    <>
      <Nav></Nav>
      <div className="SymptomSolver flex space-y-20 flex-col">
        <div className="flex flex-row">
          <div className="absolute top-10 left-12">
            <button onClick={showNav}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
          <div className="grow flex flex-row items-center mt-8 justify-center">
            <h1 className="font-bold text-4xl">Sick? Let's find out why.</h1>
          </div>
        </div>
        <div className="flex flex-col text-center">
          <h1 className="relative right-12 mb-2">Powered by OpenAI</h1>
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col w-1/3 justify-start items-center">
              <div className="flex flex-row border-4 w-full border-gray-600 justify-center rounded-full">
                <input
                  type="text"
                  id="symptomsInput"
                  name="symptomsInput"
                  className="bg-transparent p-3 rounded-full w-full"
                  placeholder="Type in your symptoms spaced by commas. Ex. cough,cold"
                />
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <div className="flex flex-row hover:bg-red-500 ml-2 justify-center items-center w-28 rounded-full active:scale-90 border-red-600 bg-red-400 border-4 px-2 py-1">
                <i
                  id="loading"
                  className="animate-spin mr-2 hidden fa-solid fa-spinner"
                ></i>
                <button onClick={onSearch} className="text-lg">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-center justify-center items-center overflow-scroll">
          <h1 id="output" className="text-xl px-20 font-bold">
            Possible symtpoms are
          </h1>
          <h1 className="text-xl my-10 px-20 text-red-500 font-bold">
            These responses ARE NOT a replacement for a doctor's diagonsis. If
            you are genuinely concerned about the state of your health, visit a
            doctor ASAP.
          </h1>
        </div>
      </div>
    </>
  );
}
