import Post from "../models/Post.js";
export const createPost = (req, res) => {
  new Post(req.body)
    .save()
    .then((postDetails) =>
      res
        .status(201)
        .json({ success: true, message: "success", data: postDetails })
    )
    .catch((err) => res.status(200).json({ message: "failure", data: [] }));
};
export const allPosts = (req, res) => {
  Post.find({})
    .then((users) =>
      res.status(200).json({ success: true, message: "success", data: users })
    )
    .catch((error) => res.status(200).json({ message: "failure", data: [] }));
};
export const singlePost = (req, res) => {
  let { id } = req.params;
  console.log(id);
  Post.findById(id)
    .then((user) =>
      res.status(200).json({ success: true, message: "success", data: user })
    )
    .catch((error) => res.status(400).json({ message: "failure", data: [] }));
};
export const updatePost = (req, res) => {
  let { username, description, duration, date } = req.body;
  let { id } = req.params;
  Post.findByIdAndUpdate(id, {
    username,
    description,
    duration,
    date,
  })
    .then((user) => res.status(200).json({ success: true, data: user }))
    .catch((error) =>
      res.status(400).json({ success: false, message: "failure", data: error })
    );
};
export const deletePost = (req, res) => {
  let { id } = req.params;
  Post.findByIdAndDelete(id)
    .then((user) =>
      res
        .status(200)
        .json({ success: true, message: `success delete user:${id}` })
    )
    .catch((error) =>
      res.status(400).json({ success: false, message: "user not found" })
    );
};
