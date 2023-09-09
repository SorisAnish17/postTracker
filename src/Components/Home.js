import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Home = () => {
  const [existingUser, setExistingUser] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [posts, setPost] = useState([]);
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/user/${id}`)
      .then((response) => {
        const data = response.data.data.username;
        setExistingUser(data);
        if (!existingUser) {
          navigate("/");
        } else {
        }
      })
      .catch((error) => console.log(error));
  }, [id, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/posts/all")
      .then((response) => setPost(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  const handleEdit = () => {
    axios
      .put(`http://localhost:5000/api/v1/user/${id}`, {
        username: newUserName,
      })
      .then((response) => {
        console.log("User updated successfully:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  const handleDeleteUser = () => {
    axios
      .delete(`http://localhost:5000/api/v1/user/${id}`)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const handleSave = () => {
    axios
      .post("http://localhost:5000/api/v1/posts/create", {
        username: existingUser,
        description,
        duration,
        date,
      })
      .then((response) => {
        console.log("Post created successfully:", response.data);

        setDescription(""); // Empty the description
        setDuration(""); // Empty the duration
        setDate(""); // Empty the date
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/v1/posts/${id}`)
      .then((response) => {
        console.log("successfully deleted");
        window.location.reload();
      })
      .catch((error) => console.log("error"));
  };

  const [updateDuration, setUpdateDuration] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [updatedescription, setUpdateDescription] = useState("");

  const handleUpdate = (id) => {
    axios
      .put(`http://localhost:5000/api/v1/posts/${id}`, {
        username: existingUser,
        description:
          updatedescription === "" ? id.description : updatedescription,
        duration: updateDuration === "" ? id.duration : updateDuration,
        date: updateDate === "" ? id.date : updateDate,
      })
      .then((response) => {
        console.log("successfully updated");
        window.location.reload();
      })
      .catch((error) => console.log("error"));
  };
  return (
    <>
      <div className="d-flex justify-content-center m-1 p-5 gap-5">
        <div>
          <h2>Home Page</h2>
          <form
            style={{
              width: "400px",
              height: "150px",
              backgroundColor: "blueviolet",
              borderRadius: "25px",
            }}
          >
            <div>
              <p>User-Name</p>
              <input
                type="text"
                defaultValue={existingUser}
                onChange={(e) => setNewUserName(e.target.value)}
              />
              <br />
              <Button className="my-2" onClick={handleEdit}>
                Edit
              </Button>
              <Button
                className="my-2 mx-3"
                onClick={handleDeleteUser}
                variant="danger"
              >
                Delete
              </Button>
            </div>
          </form>
        </div>
        <div>
          <h2>Create Post</h2>
          <form
            style={{
              width: "400px",
              height: "350px",
              backgroundColor: "antiquewhite",
              borderRadius: "25px",
            }}
          >
            <div>
              <p>User-Name</p>
              <input
                type="text"
                defaultValue={existingUser}
                onChange={(e) => setNewUserName(e.target.value)}
              />
              <br />
              <p>description</p>
              <input
                type="text"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <p>duration</p>
              <input
                type="number"
                defaultValue={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <br />
              <p>date</p>
              <input
                type="date"
                defaultValue={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <br />
              <Button className="my-2" onClick={handleSave}>
                save
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div className="d-flex align-items-center flex-column mb-5">
          <h2>Posts</h2>
          <table border={"2px"} width={"500px"}>
            <tr>
              <th>Username</th>
              <th>description</th>
              <th>duration</th>
              <th>date</th>
              <th>other options</th>
            </tr>
            {posts.map((post) => {
              return (
                <tr key={post._id}>
                  <td>
                    <label>{post.username}</label>
                  </td>
                  <td>
                    <label>
                      <input
                        type="text"
                        defaultValue={post.description}
                        style={{ border: "none" }}
                        onChange={(e) => setUpdateDescription(e.target.value)}
                      />
                    </label>
                  </td>
                  <td>
                    <label>
                      <input
                        defaultValue={post.duration}
                        type="text"
                        style={{ border: "none" }}
                        onChange={(e) => setUpdateDuration(e.target.value)}
                      />
                    </label>
                  </td>
                  <td>
                    <label>
                      <input
                        type="text"
                        value={post.date.slice(0, 10)}
                        style={{ border: "none" }}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </label>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      className="m-1"
                      onClick={() => handleUpdate(post._id)}
                    >
                      update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(post._id)}
                    >
                      delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
