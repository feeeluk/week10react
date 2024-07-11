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


// POST ****************************************************************************
app.post('/food', async (request, response) => {
    
    const {first_name, last_name, favorite, comment} = request.body
    console.log('REQUEST BODY:', request.body)

    const result = await db.query(`INSERT INTO food (food_first_name, food_last_name, food_favorite, food_comment) VALUES ($1, $2, $3, $4)`, [first_name, last_name, favorite, comment])
    response.json({recordInserted: result})
})


// PUT ****************************************************************************
app.put('/update/:id', async(request, response) =>{
    const food_id = request.params.id
    const {first_name, last_name, favorite, comment} = request.body
    const result = db.query(`UPDATE food SET food_first_name = $1, food_last_name = $2, food_favorite = $3, food_comments = $4 WHERE food_id = $5`, [first_name, last_name, favorite, comment])
    response.json(result.rows)
})


// DELETE ****************************************************************************
app.delete('/delete/:id', async(request, response) =>{
    const id = request.params.id
    const result = db.query(`DELETE FROM food WHERE food_id = $1`, [id])
    response.status(200).json({recordDeleted: result})

})


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})