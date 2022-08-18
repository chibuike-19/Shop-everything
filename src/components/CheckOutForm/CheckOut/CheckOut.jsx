import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { commerce } from '../../../lib/commerce'
import Stepper from './Stepper'
import StepperControl from './StepperControl'
import Account from './Steps/Account'
import Details from './Steps/Details'
import Final from './Steps/Final'
import {UseGlobalContext} from '../../../context'

const CheckOut = () => {
  const {cart, checkoutToken, payWithPaystack, setCheckoutToken, setShippingData, setSuccess} = UseGlobalContext()
  let navigate = useNavigate()
  

  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    'shipping Details',
    'Payment',
    'message'
  ];

  const displaySteps = (steps) => {
    switch(steps){
      case 1:
        return checkoutToken &&<Account next={next}/>
      case 2:
        return <Details/>
      case 3:
        return <Final/>
      default:
    }
  }

  const next = (data) => {
    setShippingData(data)
  }

  useEffect(() => {
    const generateToken = async () => {
      try {
       const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
       console.log(token)
       setCheckoutToken(token)
      } catch (error) {
        navigate('/')
      }
    }
    generateToken()
  }, [cart])

  const handleClick = (direction) => {
    let newStep = currentStep;
    currentStep === steps.length -1 && direction === 'next' && payWithPaystack() && newStep++ && setSuccess(true)
    direction === 'next' ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  }

  return (
    // <div className='w-full bg-slate-100'>
      <div className='sm:w-1/2 mx-auto rounded-lg shadow-2xl pb-2'>
        <div className='container mt-5'><Stepper steps={steps} currentStep={currentStep}/></div>
        <div className='my-4 p-10'>
          {displaySteps(currentStep)}
        </div>
        { currentStep !== steps.length && <StepperControl handleClick={handleClick} steps={steps} currentStep={currentStep}/>}
      </div>
    // </div>
  )
}

export default CheckOut