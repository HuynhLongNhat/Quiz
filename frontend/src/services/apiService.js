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