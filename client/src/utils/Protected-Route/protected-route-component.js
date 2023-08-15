import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Navigate } from 'react-router-dom'
import { Loading } from '../../components/Loading/Loading'

export const ProtectedRoute = ({ children }) => {
    const { user, userLoading } = useContext(AppContext)
    if (userLoading) return <Loading center />
    if (!user) {
        return <Navigate to='/landing' />
    }
    return children
}
