"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'

const RegisterForm = () => {
  return (
    <form className='space-y-4'>
      <Card className='p-5 space-y-4'>
        <Input name='name' type='text' placeholder='Enter your full name' required />
        <Input name='email' type='email' placeholder='Enter your email' required />
        <Input name='password' type='password' placeholder='Create a password' required />
        <Input name='confirmPassword' type='password' placeholder='Confirm your password' required />
        
        <Button type='submit' className='w-full'>
          Register
        </Button>
      </Card>
    </form>
  )
}

export default RegisterForm