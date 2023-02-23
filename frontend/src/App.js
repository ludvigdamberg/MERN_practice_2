import axios from "axios"
import {useState,useEffect} from 'react'




function App() {

  const [listOfUsers,setListOfUsers] = useState([])
  const[name,setName] = useState("")
  const[age,setAge] = useState(0)
  const[username,setUserName] = useState("")

  
  const getAllToDos = (setListOfUsers) => {
    
    axios.get("http://localhost:5000/users")
    .then(res => {
        setListOfUsers(res.data)
    })
}

  useEffect(() => {
    getAllToDos(setListOfUsers)

  },[])

  const createUser = () => {
    axios.post("http://localhost:5000/save", {name: name, age: age, username: username })
    .then((res) => {
      alert("User Created")
      getAllToDos(setListOfUsers)
    })
    
  }


  return (
    <div className="App">

      <div className="usersDisplay">
        {}
      </div>
      {listOfUsers.map((user) => {
        return(
          <div key={user._id}><h1>{user.name}</h1>
               <h1>{user.age}</h1>
               <h1>{user.username}</h1>
          </div>
        )
      })}
      <div>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
        <input type="number"  placeholder="Age" onChange={(e) => setAge(e.target.value)}/>
        <input type="text"  placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
        <button onClick={createUser}>CREATE USER</button>
      </div>
    </div>
  );
}

export default App;
