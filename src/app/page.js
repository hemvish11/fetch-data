"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { RingLoader } from 'react-spinners';

function Home() {

  const [peopleData, setPeopleData] = useState([]);
  const [currUserData, setCurrUserData] = useState();
  const [clicked, setClicked] = useState(false);
  const [noDataFetched, setNoDataFetched] = useState(false);
  const [loading, setLoading] = useState(true);

  const doFetching = async () => {
    try {
      let data = await fetch("https://602e7c2c4410730017c50b9d.mockapi.io/users");
      data = await data.json();
      console.log(data);
      setPeopleData(data);
      setLoading(false);
    } catch (error) {
      setNoDataFetched(true);
      throw (error);
    }
  }
  //#1. call back function of useEffect hook cannot be async function
  // but we can call that function inside the CB function of useEffect hook
  useEffect(() => {
    doFetching();
  }, []);

  return (
    <main>
      {
        noDataFetched ?

          <div className='flex justify-center items-center'>
            <h1 className='font-semibold text-3xl mt-4'>No Data to Show</h1>
          </div>

          :
          
          (loading ?
          
            <div className='flex items-center justify-center w-full h-screen'>
            {/* #2. We can use react-spinners library to use spinners while fetching data */}
              <RingLoader
                color="#36d7b7"
                size={150}
              />
            </div>
            :
            <div>
              <h1 className='text-2xl font-semibold mt-8 ml-8 text-white'>Users</h1>
              <div className='flex'>
                <div className={`${clicked ? "md:w-1/2 w-full" : "w-full"} `}>

                  {peopleData.map((item, index) => {
                    return (
                      <div key={index} className='m-4 border p-4 hover:bg-green-300 cursor-pointer rounded-lg bg-gray-200'
                        onClick={() => {
                          setCurrUserData(item);
                          setClicked(true);
                        }}
                      >
                        <div className='flex gap-2 '>
                          <Image height={75} width={75} src={item.avatar} alt={`${item.profile.firstName}-pic`} className='rounded-full' />
                          <div>
                            <h1 className='font-semibold'>{item.profile.firstName}</h1>
                            <p className='text-xs text-gray-600 font-semibold'>{item.jobTitle}</p>
                            <p className='text-xs text-gray-600 font-semibold mt-5'>Click for more info</p>
                          </div>
                        </div>

                      </div>
                    )
                  })}
                </div>

                <div className={`${clicked ? "md:w-1/2 fixed w-full top-2 left-2 right-2 md:left-auto md:right-2 md:top-10 border p-4 rounded-lg" : "w-0"} bg-white`}>

                  {clicked &&
                    <div >
                      <div className='flex flex-col justify-center items-center'>
                        <Image height={100} width={100} src={currUserData.avatar} alt={`${currUserData.profile.firstName}-pic`} className='rounded-full' />
                        <h1 className='font-semibold'>{currUserData.profile.firstName}</h1>

                      </div>
                      <div className='flex flex-col justify-start items-start'>
                        <p className='text-gray-900 font-semibold'>First Name: <span className='text-gray-700'>{currUserData.profile.firstName} </span></p>
                        <p className='text-gray-900 font-semibold'>Last Name: <span className='text-gray-700'>{currUserData.profile.lastName}</span></p>
                        <p className='text-gray-900 font-semibold'>Job Title: <span className='text-gray-700'>{currUserData.jobTitle}</span></p>
                        <p className='text-gray-900 font-semibold'>Username: <span className='text-gray-700'>{currUserData.profile.username}</span></p>
                        <p className='text-gray-900 font-semibold'>Email: <span className='text-gray-700'>{currUserData.profile.email}</span></p>
                        <p className='text-gray-900 font-semibold'>Bio: <span className='text-gray-700'>{currUserData.Bio}</span></p>
                      </div>

                    </div>
                  }
                </div>

              </div>

            </div>)
      }

    </main>

  )
}

export default Home