import axiosCutomize from "../utils/axiosCutomize";
export const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axiosCutomize.post("/participant", data);
};
export const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axiosCutomize.put("/participant", data);
};
export const deleteUser = (userId) => {
  return axiosCutomize.delete("/participant", { data: { id: userId } });
};

export const getListUser = () => {
  return axiosCutomize.get("/participant/all");
};

export const getUserWithPaginate = (page, limit) => {
  return axiosCutomize.get(`/participant?page=${page}&limit=${limit}`);
};

export const postLogin = (email, password) => {
  return axiosCutomize.post("/login", {
    email: email,
    password: password,
    delay: 5000,
  });
};

export const postSignUp = (email, username, password) => {
  return axiosCutomize.post("/register", {
    email: email,
    username: username,
    password: password,
  });
};

export const getQuizByUser = () => {
  return axiosCutomize.get("/quiz-by-participant");
};

export const getDataQuiz = (quizId) => {
  return axiosCutomize.get(`/questions-by-quiz?quizId=${quizId}`);
};

export const postSubmitQuiz = (data) => {
  return axiosCutomize.post("/quiz-submit", { ...data });
};

export const postCreateNewQuiz = (name, description, level, image) => {
  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("difficulty", level);
  data.append("quizImage", image);
  return axiosCutomize.post("/quiz", data);
};

export const getAllQuiz = () => {
  return axiosCutomize.get("/quiz/all");
};

export const postCreateNewQuestionForQuiz = (
  quiz_id,
  description,
  questionImage
) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return axiosCutomize.post("/question", data);
};

export const postCreateNewAnswerForQuestion = (
  question_id,
  correct_answer,
  description
) => {
  const data = new FormData();
  data.append("question_id", question_id);
  data.append("correct_answer", correct_answer);
  data.append("description", description);
  return axiosCutomize.post("/answer", data);
};

export const deleteQuiz = (quizId) => {
  return axiosCutomize.delete(`/quiz/${quizId}`);
};

export const postUpdateQuiz = (quizId) => {};

export const postAssignQuiz = (quizId, userId) => {
  return axiosCutomize.post(`/quiz-assign-to-user`, { quizId, userId });
};

export const getQuizWithQA = (quizId) => {
  return axiosCutomize.get(`/quiz-with-qa/${quizId}`);
};

export const postUpsertQA = (data) => {
  return axiosCutomize.post(`/quiz-upsert-qa`, { ...data });
};
