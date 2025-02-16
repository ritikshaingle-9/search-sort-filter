import { useState,useEffect, use } from "react";
import { USERS } from "./config"
import {Cake,MapPin} from "lucide-react"

function App() {
  const [searchText,setSearchText] = useState("");
  const [filterUsers,setFilterUsers] = useState(USERS);

  useEffect(()=>{
     if(!searchText){
      setFilterUsers(USERS);
      return;
     }

    const tempFilterUsers = USERS.filter((user)=>{
      if(user.userName.toLocaleLowerCase().includes(searchText)){
        return true;
      }
      else if(user.city.toLocaleLowerCase().includes(searchText)){
        return true;
      }
      else if(user.age.toString().includes(searchText)){
        return true;
      }
      else{
        return false;
      }
    })
    setFilterUsers(tempFilterUsers);
  },[searchText]);
 
  return (
    <div>
      <h1 className="text-center text-3xl m-4 bg-slate-200 p-5">Search,Sort, Filter</h1>

      <div className="flex items-center justify-center">

      <input 
      placeholder="Search" 
      className="w-1/2 bg-slate-100 p-3 focus:outline-none my-2 rounded text-2xl" value={searchText}
      onChange={(e) => setSearchText(e.target.value)}/>

      </div>
      <div className="flex flex-wrap justify-around">
        {filterUsers.map((userData,index)=>{
        const {userName, age, city, imgUrl} = userData;

        return (
          <div className="w-1/4 h-[80px] bg-slate-300 my-3 mx-6 p-2 text-xl flex rounded-xl" key={index}>
            <div>
            <img src={imgUrl} className="rounded-full w-14 mr-6 mt-auto"/>
            </div>
            <div>
            <h1 className="font-bold text-xl mb-2" >{userName}</h1>
            <p className="flex"><Cake className="mr-1"/>: {age} <MapPin className=" ml-3" />: {city} </p>     

            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default App;