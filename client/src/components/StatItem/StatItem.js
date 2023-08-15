import React from 'react'
import Wrapper from '../../assets/wrappers/StatItem'

export const StatItem = ({ count, color, icon, title, bcg }) => {
    return (
        <Wrapper color={color} bcg={bcg}>
            <header>
                <span className='count'>{count}</span>
                <div className='icon'>{icon}</div>
            </header>
            <h5 className='title'>{title}</h5>
        </Wrapper>
    )
}
