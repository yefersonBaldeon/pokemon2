import React, { useEffect, useState } from "react";

import getRandomNumber from "./utils/aleatorio";

import Type from "./Type";

import axios from "axios";

const App = () => {
  const [One, setOne] = useState({});
  const [refresh, setRefresh] = useState(false);
   
  const [id, setid] = useState(null)

  useEffect(() => {
    const api = async () => {
      const url = `https://pokeapi.co/api/v2/pokemon/${getRandomNumber()}`;

      const response2 = await axios.get(url);

      setOne({ ...response2.data });
    };
    api();
  }, [refresh]);

  const api2 = async () => {
    let a = parseInt(One.id) + 1;

    const url = `https://pokeapi.co/api/v2/pokemon/${a}`;
    const response2 = await axios.get(url);
    setOne({ ...response2.data });
  };

  const handleClick = () => {
    api2();

  };

  const api3 = async () => {
  
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response2 = await axios.get(url);
    setOne({ ...response2.data });
  };

  return (
    <div className="bg-black h-screen flex flex-col justify-center p-10">
      <div className="container flex flex-col  justify-center items-center">
        <img
          className="w-1/4"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
          alt=""
        />
        <input type="text" className="p-1 bg-black border border-white text-white" placeholder="Search" value={id} onChange={(e)=>{
            setid(e.target.value)
             
        }} />
        {/* <div className="text-white">{id}</div> */}
        <img
          className="w-30 rounded-xl border-white border-2 m-2"
          src={One.sprites?.front_default}
          alt=""
        />

        <button
          className="bg-yellow-500 w-1/3 py-2 rounded-xl  text-white text-xl font-light mb-4"
          onClick={() => {api3()
            setid("")          
          }}
        >
          Buscar
        </button>
        <button
          className="bg-blue-500 w-1/3 py-2 rounded-xl  text-white text-xl font-light mb-4"
          onClick={() => {
            setRefresh(!refresh);
          }}
        >
          Aleatorio
        </button>
        <button
          className="bg-red-500 w-1/3 py-2 rounded-xl text-white text-xl font-light"
          onClick={handleClick}
        >
          Contador
        </button>
      </div>

      <div className=" w-full flex justify-center flex-col items-center">
        <div className="flex justify-start mt-5">
          <h1 className="font-bold text-white text-3xl">{One.id}</h1>
        </div>

        <div className=" w-1/5">
          <h1 className="text-yellow-400 font-bold text-lg">Name:</h1>
          <h1 className="font-bold text-white text-3xl">{One.name}</h1>
        </div>

        <div className=" w-1/5 mt-5">
          <h1 className="text-yellow-400 font-bold text-lg">Types:</h1>
          <ul className="">
            {One.types?.map((item, index) => {
              return <Type key={index} item={item}></Type>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
