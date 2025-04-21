import model from "./model.js";

export const createAttempt = async (attempt) => {
  return await model.create(attempt);
};

export const findAttemptsByUserAndQuiz = async (uid, qid) => {
  return await model.find({ user: uid, quiz: qid }).sort({ attemptNumber: 1 });
};

export const findLastAttempt = async (uid, qid) => {
  return await model.findOne({ user: uid, quiz: qid }).sort({ attemptNumber: -1 });
};

export const countAttemptsByUserAndQuiz = async (uid, qid) => {
  return await model.countDocuments({ user: uid, quiz: qid });
};
