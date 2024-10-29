"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patients.actions"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phone_input',
    CHECKBOX = 'checkbox',
    DATEPICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
 }


const PatientForm = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: ""
        },
    })

    // 2. Define a submit handler.
  async  function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
        setIsLoading(true)

        try {
            const userData = { name, email, phone }

            const user = await createUser(userData);
            
            if (user) router.push(`/patients/${user.$id}/register`)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there! 👋</h1>
                    <p className="text-dark-700">Schedule your first appointment.</p>
                </section>
                
                <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="name"
                label="full name"
                placeholder="John Doe"
                icons="/public/assets/icons/user.svg"
                iconsAlt="Full Name"
                 />

                <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="email"
                label="Email"
                placeholder="mave2514@gmail.com"
                icons="/public/assets/icons/email.svg"
                iconsAlt="Email"
                 />

                <CustomFormField
                control={form.control}
                fieldType={FormFieldType.PHONE_INPUT}
                name="phone"
                label="Phone Number"
                placeholder="(+234) 888 9999 222"
                 />

                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm
