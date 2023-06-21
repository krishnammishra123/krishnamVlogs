   
//Registration Validation
export const RegistrationValidate = (name, email, password) => {
     let errors = {};

     if (!name?.trim()) {
       errors.name = "*Name is required";
     }

     if (!email?.trim()) {
       errors.email = "*Email is required";
     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
       errors.email = "*You have entered an invalid email address!";
     }

     if (!password?.trim()) {
       errors.password = "*Password is required";
     } else if (password?.trim().length < 8) {
       errors.password = "*Password must be at least 8 characters long";
     }

    //  if (!mobile?.trim()) {
    //    errors.mobile = "*Mobile number is required";
    //  } else if (!/^\d{10}$/.test(mobile)) {
    //    errors.mobile = "*Mobile Number is invalid";
    //  } else if (mobile?.trim().length < 10) {
    //    errors.mobile = "*Number must be at least 10 to 12 characters long";
    //  }
  
       return errors;
   };

//Login Validation
  export const LoginValidate = (email,password) => {
      let errors = {};
      if (!email?.trim()) {
        errors.email = "*Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = "*You have entered an invalid email address!";
      }

      if (!password?.trim()) {
        errors.password = "*Password is required";
      }
      return errors;
  };
    
//post validation
  export const  postBlogValidate = (title,desc,image,content) => {
    let errors = {};
    if (!title?.trim()) {
      errors.title = "*Title is required";
    }
    if (!desc?.trim()) {
      errors.desc = "*Desc is required";
    }
    if (!image || image.length === 0) {
      errors.image = "*Image is required";
    }
     if (!content?.trim()) {
       errors.content = "*Content is required";
     }
    return errors;
  };

//contactValidate;
export const contactValidate = (name, email, addMessage) => {
  let errors = {};

  if (!name?.trim()) {
    errors.name = "*Name is required";
  }
  if (!email?.trim()) {
    errors.email = "*Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "*You have entered an invalid email address!";
  }
  if (!addMessage?.trim()) {
    errors.addMessage = "*Message is required";
  }

  return errors;
};



//password reset validation
  export  const PasswordResetValidate = (email) => {
         let errors = {};
         if (!email?.trim()) {
           errors.email = "*Email is required";
         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
           errors.email = "*You have entered an invalid email address!";
         }
         return errors;
  };
    
//ForgotPassword reset validation

export const ForgotPasswordValidate = (password) => {
      let errors = {};
      if (!password?.trim()) {
        errors.password = "*Password is required";
      }
      return  errors;
}

 