import React, { useEffect, useState } from 'react'
import { commerce } from '../../../../lib/commerce';
import { UseGlobalContext } from '../../../../context';

const Account = ({next}) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);

  const {checkoutToken, setFullname,email, city, zipCode, address, fullname, setEmail, setCity,shippingOption, setShippingOption, setZipCode, shippingCountry, shippingSubdivision, setShippingCountry, setShippingSubdivision, setAddress} = UseGlobalContext()
  

  const countries =  Object.entries(shippingCountries).map(([code, name]) => (
    {id: code,label: name}
  ))
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => (
    {id: code,label: name}
  ))
  const options = shippingOptions.map((opts) => (
    {id: opts.id, label: `${opts.description} - ${opts.price.formatted_with_symbol}`}
  ))


  
  const fetchShippingCountries = async (checkoutTokenId) => {
    const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])
    // console.log(shippingCountry)
  }

  const fetchSubdivions = async (countryCode) => {
    const {subdivisions} = await commerce.services.localeListShippingSubdivisions(checkoutToken.id, countryCode);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const fetchShippingOptions = async (checkoutTokenId, country, region=null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region})

    setShippingOptions(options)
    setShippingOption(options[0].id)
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
    // console.log(shippingCountry)
  }, [])

  useEffect(() => {
    if(shippingCountry)fetchSubdivions(shippingCountry);
    console.log(shippingSubdivisions)
  }, [shippingCountry])

  useEffect(() => {
    if(shippingSubdivision)fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    // console.log(shippingSubdivisions)
  }, [shippingSubdivision])

  

  return (
    <div>
      <p className='text-xl mb-4 text-center'>Shipping Address</p>
      
        <form onSubmit={(e) => e.preventDefault()} >
          <div className='container grid grid-cols-2 gap-4'>
            <div className='flex flex-col '>
              <label>Full Name</label>
              <input name='full name' value={fullname} onChange={(e) => setFullname(e.target.value)}  required className='border-b-2 outline-none' type='text'/>
            </div>
            <div className='flex flex-col '>
              <label>Address</label>
              <input name='address' value={address} onChange={(e) => setAddress(e.target.value)}  required className='border-b-2 outline-none' type='text'/>
            </div>
            <div className='flex flex-col '>
              <label>Email</label>
              <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} required  className='border-b-2 outline-none' type='email'/>
            </div>
            <div className='flex flex-col '> 
              <label>City</label>
              <input name='city' value={city} onChange={(e) => setCity(e.target.value)} required  className='border-b-2 outline-none' type='text'/>
            </div>
            <div className='flex flex-col '>
              <label>Zip/ postal code</label>
              <input name='zip' value={zipCode} onChange={(e) => setZipCode(e.target.value)} required className='border-b-2 outline-none' type='number'/>
            </div>
            <div className='flex flex-col gap-2'>
              <label>
                Shipping country
              </label>
              <select value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)} className='text-lg outline-blue-500'>
                {countries.map(country => (
                  <option key={country.id} value={country.id}>
                  {country.label}
                </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <label>
                Shipping subdivision
              </label>
              <select value={shippingSubdivision} onChange={(e) => setShippingSubdivision(e.target.value)} className='text-lg outline-blue-500'>
                {subdivisions.map(subdivision => (
                  <option key={subdivision.id} value={subdivision.id}>
                  {subdivision.label}
                </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <label>
                Shipping option
              </label>
              <select className='text-lg outline-blue-500' value={shippingOption} onChange={(e) => setShippingOption(e.target.value)}>
                {options.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
                ))}
              </select>
            </div>
          </div>
        </form>
    </div>
  )
}

export default Account