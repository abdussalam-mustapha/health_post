"use client"

import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormFieldType } from './forms/PatientForm'
import Image from 'next/image'

import "react-phone-number-input/style.css"
import PhoneInput from 'react-phone-number-input'

interface CustomProps {
  control: Control<any>,
  fieldType: FormFieldType,
  name: string,
  label?: string,
  placeholder?: string,
  icons?: string,
  iconsAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect?: string,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode
}


const RenderField = ({ field, props }: {field: any; props: CustomProps;}) => {

  const { fieldType, placeholder, icons, iconsAlt } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {
            icons && (
              <Image
                src={icons}
                alt={iconsAlt || "icon"}
                height={24}
                width={24}
                className='ml-2'
              />
            )
          }

          <FormControl>
            <Input 
              placeholder={placeholder}
              {...field}
              className='shad-input border-0'
            />
          </FormControl>
        </div>
      )
      
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='US'
            placeholder={placeholder}
            international
            withCoutryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      )
  }
}

const CustomFormField = (props: CustomProps) => {
  const {control, fieldType, name, label, placeholder, icons} = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {
            fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel>{label}</FormLabel>
            )
          }

          <RenderField field={field} props={props} />

          <FormMessage className='shad-error border-0' />

        </FormItem>
      )}
    />
  )
}

export default CustomFormField
