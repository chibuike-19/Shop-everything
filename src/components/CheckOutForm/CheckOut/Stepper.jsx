import React, { useEffect, useRef, useState } from 'react'


const Stepper = ({steps, currentStep}) => {
  const [newStep, setNewStep] = useState([])
  const stepRef = useRef()
  useEffect(() => {
    const stepState = steps.map((step, index) => 
      Object.assign(
        {}, 
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true: false,
          selected: index === 0 ? true: false,
        }
      )
    )
    stepRef.current = stepState;
    const current = updatedStep(currentStep - 1, stepRef.current)
    setNewStep(current)
    console.log(stepState)
  },[steps, currentStep])

  const updatedStep = (stepNumber, steps ) => {
    const newSteps = [...steps];
    let count = 0;
    while(count < newSteps.length){
      if(count === stepNumber){
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true
        }
        count++
      }
      else if(count < stepNumber){
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true
        }
        count++
      }
      else{
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false
        }
        count++
      }
    }
    return newSteps;
  }
  
 

  const displayStepper =newStep.map((step, index) => {
    
    return <div key={index} className={(index !== newStep.length - 1) ? 'flex w-full items-center': 'flex items-center' }>
    <div className='relative flex flex-col items-center text-teal-600'>
          <div className={`flex items-center h-12 w-12 transition duration-500 border-2 border-gray-300 rounded-full ease-in-out justify-center py-3 ${step.selected ? 'bg-green-600 font-bold text-white border-2 border-green-600' : ''}`}>
            {step.completed ? (<span className='text-white  font-bold text-xl '>&#10003;</span>)  : (index + 1)}
          </div>
          <div className={`absolute top-0 text-center mt-16 w-32 text-xs font-meduim uppercase ${step.highlighted ? 'text-gray-900': 'text-gray-400'}`}>
            {step.description}
          </div>
        </div>
        <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step.completed ? 'border-green-600': 'border-gray-400'}`}>

        </div>
  </div>
  }) 

  return (
    <div className='flex justify-between items-center p-4 mx-4'>
        {displayStepper}
    </div>
  )
}

export default Stepper