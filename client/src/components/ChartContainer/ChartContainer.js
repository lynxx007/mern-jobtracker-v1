import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Wrapper from '../../assets/wrappers/ChartsContainer'

import { AreaChartComp } from '../AreaChart/AreaChart'
import { BarChartComp } from '../BarChart/BarChart'

export const ChartContainer = () => {
    const [barChart, setBarChart] = useState(true)
    const { monthlyApplications: data } = useContext(AppContext)
    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button type='button' onClick={() => setBarChart(!barChart)}>
                {barChart ? 'AreaChart' : 'BarChart'}
            </button>
            {barChart ? <BarChartComp data={data} /> : <AreaChartComp data={data} />}
        </Wrapper>
    )
}
