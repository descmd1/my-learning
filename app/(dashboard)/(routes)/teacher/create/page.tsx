'use client'
import React from 'react'
import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { 
    FormControl,
    Form,
    FormLabel,
    FormField,
    FormMessage,
    FormDescription, 
    FormItem

} from '@/components/ui/form'


const formSchema = z.object({
    title: z.string(). min(1,{
        message: "Title is required",
    }),
});

const CreateCoursepage = () => {
const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues: {
            title:''
        },
    });

    const {isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const response = await axios.post('/api/courses', values);
            router.push(`/teacher/courses/${response.data.id}`)
            console.log(response.data)
            toast.success('Course created');
        }catch {
            toast.error('Something went wrong!');
        }
    }

  return (
    <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
        <div>       
            <h1 className='text-2xl'>Name your course</h1>
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} 
        className='space-y-8 mt-6'>
<FormField control={form.control} name='title' render={({field})=>(
    <FormItem>
        <FormLabel>
            Course title
        </FormLabel>
        <FormControl>
            <Input
            disabled={isSubmitting}
            placeholder='e.g. Food chemistry'
            {...field}
            />
        </FormControl>
        <FormDescription>
            What would you teach in this course
        </FormDescription>
        <FormMessage/>
    </FormItem>
)} 
/>
<div className='flex items-center gap-x-2'>
<Link href='/'>
<Button variant='ghost' type='button'>
    Cancel
</Button>
</Link>
<Button type='submit' disabled={!isValid || isSubmitting}>
    Continue
</Button>
</div>
        </form>
       </Form>
        </div>
        </div>

  )
}

export default CreateCoursepage