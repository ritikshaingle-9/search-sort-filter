import { useState,useEffect, use } from "react";
import { USERS } from "./config"
import {Cake,MapPin} from "lucide-react"

function App() {
  const [searchText,setSearchText] = useState("");
  const [filterUsers,setFilterUsers] = useState(USERS);
  const [filterCity,setFilterCity]= useState("");
  const [filterAge,setFilterAge]= useState("");
  const [sortOrder,setSortOrder]= useState("asc");

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

  useEffect(()=>{
    if(!filterCity && !filterAge){
      setFilterUsers(USERS);
      return;
     }

    const tempFilterUsers=USERS.filter((user)=>{
      if(filterCity && 
        user.city === filterCity &&
        filterAge && 
        user.age === parseInt(filterAge)){
        return true;
      }

      if(filterAge && !filterCity && user.age=== parseInt(filterAge)){
        return true;
      }
      if(filterCity && !filterAge && user.city=== filterCity){
        return true;
      }

      return false;
    }) ;
    setFilterUsers(tempFilterUsers);
  },[filterCity,filterAge]);
 
useEffect(()=>{
  const tempsortedUsers = filterUsers.sort((a,b)=>{
    if (sortOrder === "asc") {
      return a.userName.localeCompare(b.userName)
    }
    else{
      return b.userName.localeCompare(a.userName)
    }
  })

  setFilterUsers([...tempsortedUsers]);
},[sortOrder,filterUsers]);

  return (
    <div>
      <h1 className="text-center text-3xl m-4 bg-slate-200 p-5">Search,Sort, Filter</h1>

      <div className="flex items-center justify-center">

      <input 
      placeholder="Search" 
      className="w-2/4 bg-slate-100 p-2 mr-3 block focus:outline-none my-2 rounded text-2xl" value={searchText}
      onChange={(e) => setSearchText(e.target.value.toLocaleLowerCase())}
      />
</div>      
      {searchText ? (
        <p className="ml-0 text-xl text-center mb-6">
          {filterUsers.length === 0 ? "Oops!! no user found" :
          `Found ${filterUsers.length} users for search result...`}</p>
        ) : null
       }

<div className="flex justify-center mb-5">
  <div>
     <span>Filter By City</span>
     <select value={filterCity}
     onChange={(e)=>{setFilterCity(e.target.value)}}>
      <option>All</option>{
        USERS.map((user)=>{
          return<option key={user.city} value={user.city}>{user.city}</option>
        })
      }
     </select>
  </div>
  <div>
  <span>Filter By Age</span>
     <select value={filterAge}
     onChange={(e)=>{setFilterAge(e.target.value)}}>
      <option>All</option>{
        USERS.map((user)=>{
          return<option key={user.age} value={user.age}>{user.age}</option>
        })
      }
     </select>
  </div>

  <div className="ml-10">
  <span>Sort By Name:</span>
     <select value={sortOrder}
     onChange={(e)=>{setSortOrder(e.target.value)}}>
      <option value="asc">Ascending</option>
      <option value="dsc">Descending</option>
     </select>
  </div>

</div>

      <div className="flex flex-wrap justify-around mt-10">
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