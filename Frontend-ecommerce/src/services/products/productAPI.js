import axios from "axios";

const API_URL_PROD = "http://localhost:8080/products";

const getToken = () =>{
  return sessionStorage.getItem('access_token');
}

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL_PROD}`);
    return response.data.products;
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

export const updateProduct = async (productId,formData) =>{
  try{
    const token = getToken()
    const response = await axios.patch(`${API_URL_PROD}/${productId}`, formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      })
      return response
  }catch(error){
    console.error("Error updating products:", error);
    throw error;
  }
}

export const deleteProduct = async (productId)=>{
  try{
    const token = getToken()
    const response= await axios.delete(`${API_URL_PROD}/${productId}`, {headers:
      {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    return response
  }catch(error){
    console.error("Error deleting products:", error);
    throw error;
  }
}

export const createProduct = async (formData)=>{
  try{
    const token = getToken()
    const response = await axios.post(`${API_URL_PROD}/create`, formData,

      {
        headers: {
          "Content-type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      })
      return response
  }
  catch(error){
    console.error("Error creating product:", error);
    throw error;
  }
}