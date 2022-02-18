import React, { useState, useEffect } from "react";
import axios from "axios"


import "./App.css";

const gitHubUrl = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";
const InitialData = [];
function App() {
  const [userData, setUserData] = useState({});

  useEffect(async () => {
        await axios.get(gitHubUrl)
        .then(response => {
            setUserData(response.data.pokemon)            
        })      
        }, []);

  // const getGitHubDataWithFetch = async () => {
  //   const response = await fetch(gitHubUrl);
  //   const jsonData = await response.json();
  //   setUserData(jsonData);
  //   console.log(jsonData);     
  // };

  if(userData.length > 0){
    let userDataS = [];
   
    for(let a in userData)
    {
      userDataS.push(a, userData[a]);
    }

    userDataS.sort(function(a,b){      
        return a[1] - b[1]
    });
    //userDataS.reverse();

    if(userDataS.length > 0 ){
  return (
    <>
    <div className="App">

      {
      userDataS && userDataS.map((data, idx) => (
                  
          <div className="user-container" key={data.id}>
          <h3>Pokemon : {data.id}</h3>
          <h4 className="info-item" 
          style={{ 
          backgroundImage: `url(${data.img})`, color:"brown"
          }}
          >Name : {data.name} </h4>
          <h5 className="info-item" >Number : {data.num}</h5>
          <h5 className="info-item">{
          data.type && data.type.map(item => item + " ")  
          }</h5>
          <h5 className="info-item">Height : {data.height}</h5>
          <h5 className="info-item">Weight : {data.weight}</h5>
          <h5 className="info-item">{
          data.weaknesses && data.weaknesses.map(witem => witem + " ")  
          }
          </h5>              
          <h5 className="info-item">{
          data.next_evolution && data.next_evolution.map(eitem => eitem.num + " " + eitem.name )  
          }</h5>
          </div> 
      
      ))}
     
    </div>
    </>
  );
}
}
  
return null;
}


function GetSortOrder(prop) {    
  return function(a, b) { 
    if(a.length > 0 && b.length > 0){
       if (a[prop] > b[prop]) {    
          return 1;    
      } else if (a[prop] < b[prop]) {    
          return -1;    
      }    
    }
          return 0;    
  }    
} 




export default App;
