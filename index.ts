import express from 'express'
import RALUNO from './routes/aluno'
import RPROF from './routes/profissional'
import RTREINO from './routes/treino'

const app = express()
const port = 3000

app.use(express.json())

app.use("/aluno", RALUNO)
app.use("/profe", RPROF)
app.use("/treino", RTREINO)

app.get('/', (req, res) => {
  res.send('Academia fortões apenas ')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})