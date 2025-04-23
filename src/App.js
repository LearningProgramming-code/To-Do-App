import logo from './Assets/tick.png';
import './App.css';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import * as React from 'react';
import { getDatabase, ref,get,push,set } from "firebase/database";
import { useState } from 'react';
// import Main from './Main';
import { Route, Routes } from 'react-router-dom';
import firebaseConfig from './firebase';
// import './main.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import OtherPage from './Main';
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
// c  onst analytics = getAnalytics(app);
function App()
{
  return(
  <Routes>
  <Route path = '/' element = {<Home/>}/>
  <Route path ='/books' element = {<Main/>}/>
  {/* <Route /> */}
</Routes>
  )
}

function Home() {

  const [isDisabled,setDisabled] = useState(false);
  const [input,setInput] = useState('');
  // const[userID,setUserId] = useState(null);
//   useEffect(()=>{
//   setTimeout(()=>{

// },1000)},[]);
  // setUserId(userID)
   const handleKeydown = async (e) => {
    if(e.key === 'Enter'){
      if(input.toLowerCase() === 'query'){
        const query = prompt("What's your name?");
        const dataRef = ref(database,"users/"+query+'/tasks');
        const answer = await get(dataRef);
        const data = answer.val()
        // const proper = await answer.json();
        if(data){
          let result = "";
          // let temp = "";
          for(let key in data){
              result += ' -' + data[key].task +   '\n';
          }
          alert("Your tasks:\n" + result)
        }else{
          alert("No tasks found for the name provided.")
        }
      }
      else if(input.toLowerCase() === 'store'){
      try {
        const userID = prompt("What's your name?");
        const task = prompt("What do you want to store?");
        // setUserId(id);
        const userData = {
          task,
          // Email: 'John@gmail.com',
          // Gender: 'Male'
        };
        // alert(userID);
        const userRef = ref(database, 'users/' + userID + '/tasks');
        if(userID !== "" && input !== ""){
        // alert(userID);
        await push(userRef, userData);
        }
        
        setInput('');
        setDisabled(true);
        

        setTimeout(() => setDisabled(false), 2000);
      } catch (error) {
        alert("Couldn't register your data");
      };
    }
    else if(input.toLowerCase() === 'delete'){
      const query = prompt("What's your name?");
      const toDel = prompt('Enter the task to delete');
      const dataRef = ref(database,"users/"+query+'/tasks');
      const answer = await get(dataRef);
      const data = answer.val();
      let wasFound = 0;
      for(let key in data){
        if(data[key].task === toDel){
          const taskRef = ref(database, "users/" + query + "/tasks/" + key);
          await set(taskRef, null);
          alert("Task deleted succesfully");
          wasFound = 1;
        }
      }
      if(!wasFound){
        alert("Couldn't find task");
      }
    }
      // setDisabled(true);
    }
  }
    // console.log(input)
  // class MainPage extends React.Component{
  return (
    
    <div className="App">
      <title>To-do Webapp</title>
      <head>
      <link rel="icon" type="image/png" href="tick.png">
      </link>
      </head>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className = "App-title">
            Welcome to the Task app
        </h1>
 
        

      </header>

      <div className='App-body'>  
        {/* <label className='label'>
          Data:
        </label> */}
      <div className='help'>
        Please enter either "store", "query" or "delete".
      </div>
        <input
          type='text'
          id = "data"
          placeholder='What would you like to get done, dear user?'
          className='querybox'
          value ={input}
          onChange={(e)=>{
            setInput(e.target.value);
          }}
          onKeyDown={handleKeydown}
          disabled = {isDisabled}
            />
          <a
          className="App-link"
          href="/books"
        >
          Go to the other page
        </a>      
    </div>
    </div>
  );
//  }
}
function Main(){
  return(
      <div className= "OtherApp-body">
          <div>    
          <h1 className='Main-header'> Other Page</h1>
          <a
          className="App-link"
          href="/"
        >
          Go back to the main page
        </a> 
          </div>
          
      </div>
  )
}
export default App;
