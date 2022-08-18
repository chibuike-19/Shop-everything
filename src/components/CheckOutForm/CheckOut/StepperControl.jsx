import React from 'react'

const StepperControl = ({handleClick, steps, currentStep }) => {
  return (
    <div className='container flex justify-around  mb-4'>
        <div><button onClick={() => handleClick()} className={`container bg-white uppercase text-slate-400 py-2 px-5 rounded-lg font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-300 ease-in-out ${currentStep === 1 ? 'opacity-50 cursor-not-allowed': ''}`}>
            Back
        </button></div>
        <div><button onClick={() => handleClick('next')} type='submit' className='container bg-green-500 uppercase text-white py-2 px-5 rounded-lg font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-300 ease-in-out'>
            {currentStep === steps.length - 1 ? 'pay' : 'Next'}
        </button></div>
    </div>
  )
}

export default StepperControl