import { Link, useLocation } from "react-router-dom";

export default function Login(props) {
  const location = useLocation();

  const mode = location.state?.mode;

  function login(e) {
    let form = document.getElementById("loginForm");
    let username = form.username.value;
    let password = form.password.value;
    let users = JSON.parse(localStorage.getItem("users"));
    let success = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username && users[i].password === password) {
        success = true;
        break;
      }
    }
    if (!success) {
      e.preventDefault();
      document.getElementById("incorrectMessage").style.display = "block";
    } else {
      document.getElementById("incorrectMessage").style.display = "hidden";
    }
  }

  return (
    <div className="Login h-screen border-8 border-blue-600 bg-blue-400">
      <div className="flex flex-col h-full text-center items-center justify-center space-y-10">
        <h1 className="text-3xl font-bold">Login</h1>
        <p id="incorrectMessage" className="text-red-600 hidden">
          Incorrect username or password
        </p>
        <div className="flex flex-col">
          <form id="loginForm" action="" className="flex flex-col space-y-5">
            <div className="flex flex-row space-x-3 items-center justify-around">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-blue-300 border-4 rounded-md border-blue-600"
              />
            </div>
            <div className="flex flex-row space-x-3 items-center justify-around">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-blue-300 border-4 rounded-md border-blue-600"
              />
            </div>
            <div className="flex self-center w-full">
              <Link
                to={"/" + mode}
                onClick={login}
                className="border-2 text-center rounded-lg w-full py-1 bg-blue-600 border-black"
              >
                Submit
              </Link>
            </div>
          </form>
          <Link to={"/signup"} state={{mode: mode}} className="self-start mt-3">
            No account? Sign up!
          </Link>
        </div>
      </div>
    </div>
  );
}
