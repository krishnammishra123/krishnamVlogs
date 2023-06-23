const Blog = require("../model/BlogModel");
const User = require("../model/UserModel");


//verify user for  user
const validuser = async (req, res) => {
  try {
    return res.status(200).json({ ValidUserOne: req.rootuser });
  } catch (err) {
    return res.status(500).json({ message: "Something is Wrong" });
  }
};

//upload Blog
const uploadBlogs = async (req, res) => {
  const { title, desc, content, userid } = req.body;
   if (!title || !desc || !content) {
    return res.status(400).json({ message: "Title, desc, and content are required" });
  }
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }
  const { filename } = req.file;
  try {
    const insertData = new Blog({ title, desc, image: filename, content,userid});
   const data= await insertData.save();
    res.status(200).json({ message: "Added Blog Successfully",details:data });
  } catch (err) {
    res.status(500).json({ message: "Something is wrong" });
  }
};

// fetch data
const fetchBlog = async (req, res) => {
  try {
    const blogdata = await Blog.find();
    return res.status(200).json({ details: blogdata });
  } catch (err) {
    return res.status(500).json({ message: "Something is Wrong" });
  }
};

// fetch data
const fetchBlogAll = async (req, res) => {
  try {
    const blogdata = await Blog.find();
    return res.status(200).json({ details: blogdata });
  } catch (err) {
    return res.status(500).json({ message: "Something is Wrong" });
  }
};



const BlogDetails = async (req, res) => { 
   try {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (!blog) {
    return {
      error: "Blog not found",
    };
  }
  const userId = blog.userid;
  // Fetch user details
  const user = await User.findById(userId);
  if (!user) {
    return {
      error: "User not found....",
    };
  }
  const data = {
    blog: blog,
    user: user,
  };
     return res.status(200).json({ details: data });
     } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//BlogDelete
const BlogDelete = async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndDelete(id);
    return res.status(200).json({ details: "Blog delete successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};


module.exports = { validuser, uploadBlogs, fetchBlog, fetchBlogAll,BlogDetails,BlogDelete };
// fetch BlogDetails 
// const BlogDetails = async (req,res) => {
 
//   try {
//     const id =  req.params.id;
   
//     // Fetch blog data with user details using $lookup
//    const blogs = await Blog.aggregate([
//      {
//        $match: {
//          _id:id,
//        },
//      },
//      {
//        $lookup: {
//          from: "users",
//          localField: "userid",
//          foreignField: "_id",
//          as: "userDetails",
//        },
//      },
//    ]);


//     if (blogs.length === 0) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     // Retrieve only necessary user fields
//     const userIds = blogs.map((blog) => blog.userid);

//     // Fetch user data based on the retrieved user IDs
//     const users = await User.find(
//       {
//         _id: { $in: userIds },
//       },
//       { name: 1, email: 1 }
//     );

//     // Map userDetails to the corresponding blogs
//     blogs.forEach((blog) => {
//       const user = users.find(
//         (user) => user._id.toString() === blog.userid.toString()
//       );
//       blog.userDetails = user;
//     });

//     return res.status(200).json({ details: blogs });
//   } catch (err) {
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };


