import User from "../models/User.js";

// Create a new user
export const createUser = (req, res) => {
  console.log(req.body);
  const newUser = new User(req.body);
  newUser
    .save()
    .then((userDetails) =>
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: userDetails,
      })
    )
    .catch((err) =>
      res.status(500).json({ success: false, message: "User not created" })
    );
};

// Get all users
export const allUser = async (req, res) => {
  await User.find({})
    .then((users) =>
      res.status(200).json({ success: true, message: "success", data: users })
    )
    .catch((error) => console.log(error));
};

// Get a single user by ID
export const singleUser = (req, res) => {
  const { id } = req.params;
  // console.log(id);
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: "Failed to fetch user" })
    );
};

// Update a user by ID
export const updateUser = (req, res) => {
  let { id } = req.params;
  const { username } = req.body;
  // console.log(id);
  // console.log(username);
  User.findByIdAndUpdate(id, {
    username,
  })
    .then((user) =>
      res.status(200).json({ success: true, message: "success", data: user })
    )
    .catch((error) => console.log(error));
};

// Delete a user by ID
export const deleteUser = (req, res) => {
  // Implement the delete logic here
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then((user) =>
      res.status(200).json({ success: true, message: "success", data: user })
    )
    .catch((error) => res.status(400).json({ message: "failure", data: [] }));
};
