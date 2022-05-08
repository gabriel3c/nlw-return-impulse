import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodeMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router()



routes.post('/feedbacks', async (req, res) => {

  const { type, comment, screenshot } = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodeMailAdapter = new NodeMailAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodeMailAdapter)

  try {
    await submitFeedbackUseCase.execute({
      type, comment, screenshot
    })
    await console.log(screenshot)
  } catch (error) {
    console.log('deu xabu: ', error)
  }

  return res.status(201).send()
})