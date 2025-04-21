import model from "./model.js";

export const createQuestion = async (quizId, question) => {
  const newQuestion = { ...question, quiz: quizId };
  return await model.create(newQuestion);
};

export const findQuestionsForQuiz = async (quizId) => {
  return await model.find({ quiz: quizId });
};

export const findQuestionById = async (questionId) => {
  return await model.findById(questionId);
};

export const updateQuestion = async (questionId, question) => {
  return await model.updateOne({ _id: questionId }, { $set: question });
};

export const deleteQuestion = async (questionId) => {
  return await model.deleteOne({ _id: questionId });
};