import React from 'react'
import { useFormContext, Controller} from 'react-hook-form'

const CustomTextField = ({name, label}) => {
    const {control} = useFormContext()
  return (
    <div>
        <Controller
        as='text'
        control={control}
        fullWidth
        name={name}
        label={label}
        />
    </div>
  )
}

export default CustomTextField