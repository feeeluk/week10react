import express from "express"
import cors from "cors"
import pg from "pg"
import dotenv from "dotenv"


const PORT = 7070
const app = express()

app.use(express.json())
app.use(cors())
dotenv.config()

const db = new pg.Pool({
    connectionString: process.env.DB_CONNECTION
})

// POST ****************************************************************************
app.post('/food', async (request, response) => {
    
    const {first_name, last_name, favorite, comment} = request.body
    console.log('REQUEST BODY:', request.body)

    const result = await db.query(`INSERT INTO food (food_first_name, food_last_name, food_favorite, food_comment) VALUES ($1, $2, $3, $4)`, [first_name, last_name, favorite, comment])
    response.json({recordInserted: result})
})


// GET ****************************************************************************
app.get('/', (request, response) => {
    response.json({message: `Root for Food forms demo`})
})

app. get('/food', async (request, response) => {
    try{
        const data = await db.query(`
                                    SELECT *
                                    FROM food
                                    `)
        
        response.json(data.rows)
    }
     catch (error){
        response.json(error)
     }
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})