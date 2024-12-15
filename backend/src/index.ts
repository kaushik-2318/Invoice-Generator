import express, { Request, Response } from 'express'

const app = express()
const port = process.env.PORT || 7000

app.get('/', (req: Request, res: Response) => {
    res.send('Express Typescript on Vercel')
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('pong 🏓')
})

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`)
})