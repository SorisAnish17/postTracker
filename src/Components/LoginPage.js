import { Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    axios
      .get("http://localhost:5000/api/v1/user/all")
      .then((response) => {
        let allUser = response.data.data;
        let singleUser = allUser.filter((user) => user.username === username);
        if (singleUser.length === 0) {
          setErrorMessage("User Not Found");
        } else {
          setSuccessMessage("User Successfully Login");
          let userId = singleUser.map((user) => user._id).join("");
          navigate(`/home/${userId}`);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="d-flex justify-content-center m-5 p-5">
      <div>
        <h2>Login Page</h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{
            width: "500px",
            height: "200px",
            backgroundColor: "blueviolet",
            borderRadius: "25px",
          }}
        >
          <div className="py-5">
            <p>Enter your Name</p>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
            <br />
            <Button type="submit" className="my-2">
              Submit
            </Button>
            {successMessage && (
              <Alert variant="success" className="mt-2">
                {successMessage}
              </Alert>
            )}
            {errorMessage && (
              <Alert variant="danger" className="mt-2">
                {errorMessage}
              </Alert>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
