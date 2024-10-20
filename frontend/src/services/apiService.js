import axiosCutomize from "../utils/axiosCutomize";
export const postCreateNewUser = ( email , password , username , role , image) => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
       return  axiosCutomize.post(
      "/participant",
      data
    );
}
export const putUpdateUser = (id , username , role , image) => {
    const data = new FormData();
    data.append("id", id);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
       return  axiosCutomize.put(
      "/participant",
      data
    );
}
 export const deleteUser = (userId ) =>{ 
      return  axiosCutomize.delete(
      "/participant",
    {data: {id: userId} }
    );
 }


export const getListUser = () =>{
     return  axiosCutomize.get(
      "/participant/all"
    );
}