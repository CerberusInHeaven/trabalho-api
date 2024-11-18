import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'
import nodemailer from "nodemailer";

const prisma = new PrismaClient()

const router = Router()

const transporter = nodemailer.createTransport({
  host: "sandbox.api.mailtrap.io",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "b66ac2eb496dc0",
    pass: "8011e6f499d0dc",
  },
})

const treinoSchema = z.object({
  alunoID: z.number(),
  ProfissionalID: z.number(),
  descricao: z.string().optional()
  
})

async function enviaEmail(email: string, nome: string, candidata: string) {
  let mensagem = "<h3>Concurso Rainha da Fenadoce</h3>"
  mensagem += `<h4>Estimado(a): ${nome}</h4>`
  mensagem += "<h4>Obrigado por participar de nosso concurso...</h4>"
  mensagem += `<h4>Você votou na Candidata: ${candidata}</h4>`
  
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Concurso Rainha da Fenadoce" <concursofenadoce@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Confirmação Voto Rainha da Fenadoce", // Subject line
    text: "Obrigado pelo voto...", // plain text body
    html: mensagem
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

router.get("/", async (req, res) => {
  try {
    const treinos = await prisma.treino.findMany({
      include: {
        aluno: true, 
        profissional: true, 
      },
    });
    res.status(200).json(treinos);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});


router.post("/", async (req, res) => {

  const valida = treinoSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  try {
    const [voto, candidata] = await prisma.$transaction([
      prisma.treino.create({ data: valida.data }),
      prisma.aluno.update({
        where: { id: valida.data.alunoID },
        data: { NumTreinos: { increment: 1 } }
      }),
      prisma.profissional.update({
        where: {idprof: valida.data.ProfissionalID},
        data: {Licoes: {increment: 1}}
      })
    ])

    
    const dadoaluno = await prisma.aluno.findUnique(
      { where: { id: valida.data.alunoID } })
    const dadoprof = await prisma.profissional.findUnique(
      { where: { idprof: valida.data.ProfissionalID } })

    enviaEmail(dadoaluno?.email as string, 
               dadoaluno?.nome as string, 
               dadoprof?.nome as string)  

    res.status(201).json({ voto, candidata })
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {

    
    const valida = await prisma.treino.findUnique({ where: { id: Number(id) } })

    const [treinador, aluno] = await prisma.$transaction([
      prisma.treino.delete({ where: { id: Number(id) } }),
      prisma.aluno.update({
        where: { id: valida?.alunoID },
        data: { NumTreinos: { decrement: 1 } }
      }),
      prisma.profissional.update({
        where: { idprof: valida?.alunoID },
        data: { Licoes: { decrement: 1 } }
      })
      
    ])

    res.status(201).json({ treinador, aluno })
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

export default router
