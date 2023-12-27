import Image from "next/image";
import logo from '../../../images/logo.png'

import React from 'react'

const Logo = () => {
  return (
    <div>
        <Image src={logo} height={130} width={130} alt="log"/>
    </div>
  )
}

export default Logo