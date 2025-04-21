import model from "./model.js";
import questionModel from "../Questions/model.js";
import { v4 as uuidv4 } from "uuid";

export const createQuiz = async (courseId, quiz) => {
  const newQuiz = {
    ...quiz,
    _id: uuidv4(),
    course: courseId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return await model.create(newQuiz);
};

export const findQuizzesForCourse = async (courseId) => {
  const quizzes = await model.find({ course: courseId });

  const quizzesWithCounts = await Promise.all(
    quizzes.map(async (quiz) => {
      const count = await questionModel.countDocuments({ quiz: quiz._id });
      return {
        ...quiz.toObject(),
        questionCount: count,
      };
    })
  );

  return quizzesWithCounts;
};

export const findQuizById = async (quizId) => {
  return await model.findById(quizId);
};

export const updateQuiz = async (quizId, updatedQuiz) => {
  updatedQuiz.updatedAt = new Date();
  return await model.updateOne({ _id: quizId }, { $set: updatedQuiz });
};

export const deleteQuiz = async (quizId) => {
  return await model.deleteOne({ _id: quizId });
};
