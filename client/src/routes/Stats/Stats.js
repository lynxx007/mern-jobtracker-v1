import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { Loading } from '../../components/Loading/Loading'
import { StatsContainer } from '../../components/StatsContainer/StatsContainer'
import { ChartContainer } from '../../components/ChartContainer/ChartContainer'

export const Stats = () => {
    const { showStats, isLoading, monthlyApplications } = useContext(AppContext)
    useEffect(() => {
        showStats()
    }, [])
    if (isLoading) {
        return <Loading center />
    }
    return (
        <>
            <StatsContainer />
            {monthlyApplications.length > 0 && <ChartContainer />}
        </>
    )
}
