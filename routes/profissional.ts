import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()

const router = Router()

const treinadorschema = z.object({
  nome: z.string(),
  especialidade: z.string(),
  dataNasc: z.string(),
  
})

router.get("/", async (req, res) => {
  try {
    const professor = await prisma.profissional.findMany({    
     
    })
    res.status(200).json(professor)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post("/", async (req, res) => {

  const valida = treinadorschema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  try {
    const professor = await prisma.profissional.create({
      data: valida.data
        
    })
    res.status(201).json(professor)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const professor = await prisma.profissional.delete({
      where: { idprof: Number(id) }
    })
    res.status(200).json(professor)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})


export default router
