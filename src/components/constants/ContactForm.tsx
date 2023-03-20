import React from 'react'
import { useRef } from 'react';
import { useController, useForm } from "react-hook-form";
import validator from 'validator';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import emailjs from '@emailjs/browser';
import Button from './Button';

const ContactForm = () => {

  const form = useRef<HTMLFormElement>(null);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<{ name: string, email: string, company: string, date: Date, }>({ defaultValues: { /*date: currentDate()*/ } });

  const { field } = useController({
    name: 'date',
    control,
    rules: {required: 'Required'}
  })

  const validateEmail = (email: string) => {
    if (validator.isEmail(email)) {
      return true
    } else {
      return 'Enter valid email'
    } 
  }

  // EmailJS 

  const updateEmailJS = () => {
    emailjs.sendForm('contact_service', 'contact_form', form.current!, 'J_xT9g7xbilo1oKrW')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
  }

  return (
    <div className='flex flex-col justify-between items-start space-y-8 bg-[#0C4B5B] text-white px-8 sm:px-12 py-16 rounded-[60px] w-full'>
        <h1 className='text-2xl font-bold tracking-wide'>Contact with Us</h1>
        <form className='w-full flex flex-col justify-between items-start space-y-8 update-react-hook-form' ref={form} onSubmit={handleSubmit((data) => {
          console.log(data)
          updateEmailJS()
          reset();
        })}>
            <div className='w-full flex flex-col justify-between items-start space-y-2'>
                <div className='flex flex-col justify-between items-start w-full space-y-2'>
                    <label htmlFor='name' className='text-sm font-bold tracking-wide'>Name</label>
                    <input className={`${errors.name ? 'border border-red-600' : '' } w-full p-3 rounded-xl text-xs xs:text-sm text-black tracking-wide outline-none`} {...register('name', { required: 'Required', minLength: {value: 2, message: 'Is this really your name'} })} placeholder='Name' />
                    <p className='text-red-600'>{errors.name?.message}</p>
                </div>
                <div className='flex flex-col justify-between items-start w-full space-y-2'>
                    <label htmlFor='company' className='text-sm font-bold tracking-wide'>Company</label>
                    <input className={`${errors.company ? 'border border-red-600' : '' } w-full p-3 rounded-xl text-xs xs:text-sm text-black tracking-wide outline-none`} {...register('company', {required: 'Required', minLength: {value: 2, message: 'Enter your company name'} })} placeholder='Company name' />
                    <p className='text-red-600'>{errors.company?.message}</p>
                </div>
                <div className='flex flex-col justify-between items-start w-full space-y-2'>
                    <label htmlFor='email' className='text-sm font-bold tracking-wide'>Email</label>
                    <input className={`${errors.email ? 'border border-red-600' : '' } w-full p-3 rounded-xl text-xs xs:text-sm text-black tracking-wide outline-none`} {...register('email', {required: 'Required', validate: validateEmail })} placeholder='example@email.com' />
                    <p className='text-red-600'>{errors.email?.message}</p>
                </div>
                <div className='flex flex-col justify-between items-start w-full space-y-2'>
                    <label htmlFor='date' className='text-sm font-bold tracking-wide'>Date and Time</label>
                    <DatePicker className={`date-input ${errors.date ? 'border border-red-600' : ''} w-full p-3 rounded-xl text-xs xs:text-sm text-black tracking-wide outline-none`} name='date' selected={field.value} onChange={(date) => field.onChange(date)} dateFormat="MM/dd/yyyy" placeholderText='mm/dd/yyyy' />
                    <p className='text-red-600'>{errors.date?.message}</p>
                </div>
            </div>
            <Button text='Submit' type='submit' />
        </form>
    </div>
  )
}

export default ContactForm