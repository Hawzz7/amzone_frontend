import axios from "axios";

//For new user registration
export const sendUserAuthReq = async (data) => {
  try {
    const res = await axios.post("/users/register", {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    return res.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      return { error: err.response.data.message }; // Return the error message from the backend
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};


//Login request for already registered user
export const sendUserLoginRequest = async (data) => {
  try {
    const res = await axios.post("/users/login", {
      email: data.email,
      password: data.password,
    });

    return res.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
        return { error: err.response.data.message }; // Return the error message from the backend
      } else {
        return { error: "Invalid Credentials" };
      }
  }
};


//To logout
export const sendUserLogOutRequest = async ({accessToken, userId}) => {
    try {
      const res = await axios.post("/users/logout", {
        accessToken:accessToken,
        _id:userId._id
      });
  
      return res.data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
          return { error: err.response.data.message }; // Return the error message from the backend
        } else {
          return { error: "An unexpected error occurred" };
        }
    }
  };

  //To send cart data and save it to database inside user data
  export const sendCartData = async ({ userId, product, address, phoneNumber }) => {
    console.log({userId, product});
    
    try {
      const items = product.map(item => ({
        image: item.image,
        title: item.title,
        productId: item.id, // or item._id depending on how your data is structured
        quantity: item.quantity,
        price: item.price,
      }));
  
      const res = await axios.post("/cart/add", {
        userId,
        items,
        address,
        phoneNumber 
      });
  
      return res.data;
    } catch (error) {
      console.error("Error sending cart data", error);
      throw error;
    }
  }
