import express from "express";
import * as dao from "./dao.js";
import quizModel from "../model.js";

export default function QuizAttemptRoutes(app) {
  const createAttempt = async (req, res) => {
    const { qid, uid } = req.params;
    const { answers, score } = req.body;

    const quiz = await quizModel.findById(qid);
    const previous = await dao.findAttemptsByUserAndQuiz(uid, qid);

    if (previous.length >= quiz.maxAttempts) {
      return res.status(403).send("No attempts remaining");
    }

    const attempt = await dao.createAttempt({
      quiz: qid,
      user: uid,
      score,
      answers,
      attemptNumber: previous.length + 1,
      submittedAt: new Date(),
    });

    res.json(attempt);
  };

  const findLastAttempt = async (req, res) => {
    const { qid, uid } = req.params;
    const last = await dao.findLastAttempt(uid, qid);
    if (!last) return res.status(404).send("No attempts yet");
    res.json(last);
  };

  const countAttempts = async (req, res) => {
    const { qid, uid } = req.params;
    const count = await dao.countAttemptsByUserAndQuiz(uid, qid);
    res.json({ count });
  };

  const findAllAttempts = async (req, res) => {
    const { qid, uid } = req.params;
    const attempts = await dao.findAttemptsByUserAndQuiz(uid, qid);
    res.json(attempts);
  };
  app.get("/api/attempts/:qid/:uid", findAllAttempts);
  app.post("/api/attempts/:qid/:uid", createAttempt);
  app.get("/api/attempts/:qid/:uid/last", findLastAttempt);
  app.get("/api/attempts/:qid/:uid/count", countAttempts);
}
