import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: { type: String, ref: "QuizModel", required: true },
    title: String,
    points: Number,
    questionType: {
      type: String,
      enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "SHORT_ANSWER", "FILL_BLANK"],
    },
    choices: [String],
    correctAnswer: String,
  },
  { collection: "questions" }
);

const questionModel = mongoose.model("QuestionModel", questionSchema);
export default questionModel;