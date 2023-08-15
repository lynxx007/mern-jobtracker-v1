import React from 'react'

export const Loading = ({ center }) => {
    return (
        <div className={center ? 'loading loading-center' : 'loading'}></div>
    )
}
