import { Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset any previous success or error messages
    setSuccessMessage("");
    setErrorMessage("");

    axios
      .post("http://localhost:5000/api/v1/user/create", { username })
      .then((response) => {
        // Assuming your API returns a success message
        setSuccessMessage(response.data.message);
        navigate("/login");
      })
      .catch((error) => {
        // Handle errors and display an error message
        setErrorMessage("An error occurred while registering.");
        console.error(error);
      });
  };

  return (
    <div className="d-flex justify-content-center m-5 p-5">
      <div>
        <h2>Register page</h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{
            width: "500px",
            height: "200px",
            backgroundColor: "cornflowerblue",
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

export default RegisterPage;
