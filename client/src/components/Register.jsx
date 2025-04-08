import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const Register = () => {
  const [formData, setformData] = useState({email: "", password: ""})

  const handleChange = (e) => {
    setformData({...formData, [e.target.name]: e.target.value})
  }
  console.log(formData)
  return (
    <div className='h-screen flex justify-center items-center transform -translate-y-16'>
      <form action="" className='flex flex-col gap-6 max-w-xl w-full px-8'>
        <div className='flex flex-col gap-2'>
          <Label>Email</Label>
          <Input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange}/>
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Password</Label>
          <Input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange}/>
        </div>
        <Button>Register</Button>
        <span className='text-[#63657b] text-center'>
          Already have an account?{" "}
          <Link to="/login" className='iconHover'>Login</Link>
        </span>
      </form>
    </div>
  )
}

export default Register