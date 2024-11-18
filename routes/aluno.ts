import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import {  z } from 'zod'

const prisma = new PrismaClient()

const router = Router()

const alunoSchema = z.object({
nome: z.string(),
fone: z.string(),
objectivo: z.string().optional(),
idade: z.number().min(12, {message: "A academia aceita apenas maiores de 12 anos."}),
email: z.string(),


})

router.get("/", async (req, res) => {
  try {
    const clientes = await prisma.aluno.findMany({
      
    })
    res.status(200).json(clientes)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post("/", async (req, res) => {

  const valida = alunoSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  try {
    const cliente = await prisma.aluno.create({
      data: valida.data
        
    })
    res.status(201).json(cliente)
  } catch (error) {
    res.status(400).json({ error })
  }
})


router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const cliente = await prisma.aluno.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(cliente)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const clientes = await prisma.aluno.findMany({
      include: { 
        Treinos:true
        
        
      }
    })
    res.status(200).json(clientes)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

export default router
