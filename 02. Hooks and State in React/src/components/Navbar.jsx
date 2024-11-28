import React from 'react'
import {  useEffect } from 'react'




function Navbar({number,color}) {

    useEffect(() => {
        alert('Changed Navbar ' + number)
      }, [number])

  return (
    <div style={{color: color}}> This is navbar with {number} </div>
  )
}

export default Navbar