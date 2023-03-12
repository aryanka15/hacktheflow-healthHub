import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Login() {
  const location = useLocation();

  const mode = location.state?.mode;

  function signup(e) {
    let form = document.getElementById("signupForm");
    console.log(form.username.value);
    if (
      form.username.value === "" ||
      form.password.value === "" ||
      form.name.value === ""
    ) {
      document.getElementById("incorrectMessage").style.display = "block";
      return;
    }
    document.getElementById("incorrectMessage").style.display = "hidden";
    let data = {
      username: form.username.value,
      password: form.password.value,
      name: form.name.value,
    };
    if (localStorage.getItem("users") == null) {
      localStorage.setItem("users", JSON.stringify([data]));
    } else {
      let currentData = JSON.parse(localStorage.getItem("users"));
      currentData.push(data);
      localStorage.setItem("users", JSON.stringify(currentData));
    }
  }

  return (
    <div className="Signup h-screen border-8 border-blue-600 bg-blue-400">
      <div className="flex flex-col h-full text-center items-center justify-center space-y-10">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p id="incorrectMessage" className="text-red-600 hidden">
          Please fill out all fields
        </p>
        <div className="flex flex-col">
          <form
            id="signupForm"
            action=""
            className="flex flex-col items-center"
          >
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col h-full items-start mr-4 space-y-3 justify-evenly">
                <label htmlFor="Name">Name</label>
                <label htmlFor="username">Username</label>
                <label htmlFor="password">Password</label>
              </div>
              <div className="flex flex-col h-full space-y-3 items-center">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-blue-300 border-4 rounded-md border-blue-600"
                />
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-blue-300 border-4 rounded-md border-blue-600"
                />
                <input
                  type="password"
                  name="password"
                  className="bg-blue-300 border-4 rounded-md border-blue-600"
                />
              </div>
            </div>
            <div className="flex self-center mt-4 w-full">
              <Link
                to={"/" + mode}
                onClick={signup}
                className="border-2 text-center rounded-lg w-full py-1 bg-blue-600 border-black"
              >
                Submit
              </Link>
            </div>
          </form>
          <Link
            to={"/login"}
            state={{ mode: mode }}
            className="self-start mt-3"
          >
            No account? Log in!
          </Link>
        </div>
      </div>
    </div>
  );
}
