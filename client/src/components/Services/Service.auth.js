import axios from "axios";

export const registerService = async (userDetails) => {
    const res = await axios.post("http://localhost:3001/register", userDetails);
    return res;
};

export const loginService = async (userDetails) => {
  const res = await axios.post("http://localhost:3001/login", userDetails);
  return res;
};


export const UserHomeAuth = async (token) => {
  try {
    const res = await axios.get("http://localhost:3001/user/verifyuser", {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

//post blog
export const blogAuth = async (formData, config) => {
  const res =await axios.post("http://localhost:3001/user/uploadblogs",formData,config);
  return res;
};
 
//fetch data
export const fetchBlogService = async (token) => {
  const res = await axios.get("http://localhost:3001/user/fetchblog",{
    headers: {
      Authorization: token,
    },
  });
  return res;
};

//fetch blog for all
export const fetchService = async () => {
  const res = await axios.get("http://localhost:3001/user/blog");
  return res;
};

export const getBlogService = async (id) => {
  const res = await axios.get(`http://localhost:3001/user/blogpost/${id}`);
  return res;
};

export const deleteBlog = async (id) => {
  const res = await axios.delete(`http://localhost:3001/user/deleteblog/${id}`);
  return res;
};

//sendMassageService for contact
export const sendMassageService = async (userDetails) => {
  const res = await axios.post("http://localhost:3001/addcontact",userDetails);
  return res;
};

//password reset
export const PasswordResetAuth = async (userdetails) => {
 const res = await axios.post("http://localhost:3001/sendpasswordlink",userdetails);
  return res;
};

// ForgotAuth validation
export const ForgotAuth = async (id,token) => {
  const res = await axios.get(`http://localhost:3001/forgotpassword/${id}/${token}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

//ForgotPasswordAuth 
export const ForgotPasswordAuth = async (userdetails,id,token) => {
  const res = await axios.post(`http://localhost:3001/changepassword/${id}/${token}`,userdetails,{
    headers: {
      Authorization: token,
    },
  });
  return res;
};