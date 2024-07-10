import { useState, useEffect } from 'react'
import './App.css'
//import NavBar from './components/NavBar'

export default function App() {

  let [food, setFood] = useState([])
  let [form, setForm] = useState({
    first_name : '',
    last_name : '',
    favorite : '',
    comment : ''
  })

  useEffect( () => {

    fetchFood()

    async function fetchFood(){
      const response = await fetch("http://localhost:7070/food")
      const foodData = await response.json(response.rows)
      setFood(foodData)
    }
  },[])

  function handleSubmit(submit){
    
    submit.preventDefault()
    fetch('http://localhost:7070/food', {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
            "Content-Type": "application/json"
        }
    })
  }

  function handleChange(event){
    setForm({
        ...form,
        [event.target.name] : event.target.value
    })
}

  return (
    <>
      {/* <NavBar /> */}
      <h1>READ</h1>
      {/* {console.log(food)} */}
      {food.map( (item) => {
        return(
            <a href="" key={item.food_id}>
              <p key={item.food_id}>
                {item.food_first_name}, &nbsp; 
                {item.food_last_name}, &nbsp;
                {item.food_favorite}, &nbsp;
                {item.food_comment}, &nbsp;
              </p>
            </a>
        )
      })}

      <h1>CREATE</h1>

      <form onSubmit={handleSubmit}>
        <label id="" htmlFor="first_name">First name</label>
        <input id="first_name" name="first_name" placeholder="First name.." className='' onChange={handleChange}></input>

        <label id="" htmlFor="last_name">Last name</label>
        <input id="last_name" name="last_name" placeholder="Last name.." className='' onChange={handleChange}></input>

        <label id="" htmlFor="favorite">Favorite food</label>
        <input id="favorite" name="favorite" placeholder="What is your favorite food..?" className='' onChange={handleChange}></input>

        <label id="" htmlFor="comment">Comment</label>
        <input id="comment" name="comment" placeholder="What is your comment..?" className='' onChange={handleChange}></input>

        <button type="submit">create</button>
      </form>
      
    </>
  )
}
