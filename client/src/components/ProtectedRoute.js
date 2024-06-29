import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
  const token = localStorage.getItem('user');
  if(!token){
    return <Navigate to="/login" replace />
  }
  return children;
}

export default ProtectedRoute
