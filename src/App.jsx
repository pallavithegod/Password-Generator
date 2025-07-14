import { useState, useEffect, useCallback, useRef } from 'react'

import './App.css'

function App() {

  const [length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed ) str+= "0123456789"
    if(charAllowed) str +=  "!@#$%^&*-_+=[]{}~`"

    for (let i = 0; i < length; i++) {
      let char = Math.floor( Math.random() * str.length)
      pass += str.charAt(char);
      
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPswd = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 101)
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])



  return (
    <>
      <div className="w-full max-w-700 mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='my-3 font-bold'>PASSWORD GENERATOR</h1>

        
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" placeholder='Password' readOnly
          value = {password}
          ref = {passwordRef}
          className="outline-none w-full py-1 px-3"
          />

          <button 
          onClick={copyPswd}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >
            Copy
          </button>
        </div>

        <div className='flex text-sm gap-x-6'>
          <div className='flex items-center gap-x-2'>
            <input type="range" min = {6} max = {30} 
            value = {length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label >Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" id = "numberInput"
            defaultChecked = {numAllowed}
            onChange={() => { setnumAllowed((prev) => !prev)}}
            />
            <label>Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" id = "numberInput"
            defaultChecked = {charAllowed}
            onChange={() => { setcharAllowed((prev) => !prev)}}
            />
            <label>Character</label>
          </div>


        </div>
      </div>
      <footer className='fixed bottom-3 text-sm w-full left-0'>© Made By Pallavi</footer>
    </>
  )
}

export default App
