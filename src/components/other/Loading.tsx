import React from 'react'
import CircularText from '../reactbits/CircularText'

const Loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <CircularText 
            text='UNITA*UNITA*YÜKLENİYOR*'
            spinDuration={5}
            onHover='speedUp'
            className='text-xl'
        />
    </div>
  )
}

export default Loading