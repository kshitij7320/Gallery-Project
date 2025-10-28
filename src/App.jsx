import axios from "axios"
import { useEffect, useState } from "react"
const App = () => {

  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(1);

  const getData= async ()=>{
    const response= await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=100`)
    setUserData(response.data)
  }

  useEffect(() => {
    getData()
  
  },[index])
  

  let printUserData=<h3 className="text-gray-400 text-xs absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2">Loading</h3>

  if(userData.length>0){
    printUserData= userData.map((elem,idx)=>{

      return (<div key={idx}>
        <a href={elem.url}>
        <div className="h-40 w-44 bg-white rounded-xl">
          <img className="h-full w-full overflow-hidden object-cover rounded-xl" src={elem.download_url} alt="" />
        </div>
        <h2 className="font-bold text-lg">{elem.author}</h2>
        </a>
        </div>
      )
    })
  }

  return (
    <div className='bg-black h-screen p-4 overflow-auto text-white'>    
        <h1 className="fixed text-6xl">{index}</h1>
        <div className="flex flex-wrap gap-4 p-2">
          {printUserData}
        </div>
        <div className="flex justify-center items-center p-4 gap-6">
          <button onClick={()=>{if(index>1){setIndex(index - 1)
            setUserData([])
          }}} className="bg-amber-400 text-black text-sm cursor-pointer active:scale-95 rounded px-4 py-2 font-semibold">Prev</button>
          <h4>Page-{index}</h4>
          <button onClick={()=>{setIndex(index + 1)
            setUserData([])
          }} className="bg-amber-400 text-black text-sm cursor-pointer active:scale-95 rounded px-4 py-2 font-semibold">Next</button>
        </div>
    </div>
  )
}

export default App