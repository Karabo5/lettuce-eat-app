import React from 'react'
import AppNavigator from '@/navigation/AppNavigator'
import { AuthProvider } from '@/context/AuthContext'

export default function index() {
  // return <AppNavigator/>  
  return(
    <AuthProvider>
      <AppNavigator/>
    </AuthProvider>
  )
  
}
