'use client'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Page = () => {

  const [workouts, setWorkouts] = useState([])
  const [workoutInput, setWorkoutInput] = useState({
    name: '',
    description: '',
    category_upper_body: '',
    category_lower_body: '',
    cardio: '',
    core: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setWorkoutInput((prev) => ({ ...prev, [name]: value }))
  }

  // const handleCategoryChange = (value) => {
  //   setWorkoutInput((prev) => ({ ...prev, category: value }))
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedWorkouts = [...workouts, workoutInput]
    setWorkouts(updatedWorkouts);
    localStorage.setItem('user_workouts', JSON.stringify(updatedWorkouts));
    setWorkoutInput({ name: '', description: '', category_upper_body: '', category_lower_body: '', cardio: '', core: '' });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 p-5">
        <div>
          <label className="block text-sm font-medium mb-1">Workout Name</label>
          <Input
            name="name"
            value={workoutInput.name}
            onChange={handleChange}
            placeholder="Enter workout name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            name="description"
            value={workoutInput.description}
            onChange={handleChange}
            placeholder="Enter workout description"
          />
        </div>

        <p>Category</p>
        <div className='flex flex-wrap gap-3'>
          <div>
            <label className="block text-sm font-medium mb-1">Upper-Body</label>
            <Select name='category_upper_body' onChange={handleChange} defaultValue={workoutInput.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className='bg-blue-600 w-full text-white text-center'>
                <SelectItem value="Push-ups">Push-ups</SelectItem>
                <SelectItem value="Bench-Press">Bench-Press</SelectItem>
                <SelectItem value="Pull-ups">Pull-ups</SelectItem>
                <SelectItem value="Deadlifts">Deadlifts</SelectItem>
                <SelectItem value="Lateral Raises">Lateral Raises</SelectItem>

              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Lower-Body</label>
            <Select name='category_lower_body' onChange={handleChange} defaultValue={workoutInput.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className='bg-blue-600 w-full text-white text-center'>
                <SelectItem value="Squats">Squats</SelectItem>
                <SelectItem value="Lunges">Lunges</SelectItem>
                <SelectItem value="Hip Thrusts">Hip Thrusts</SelectItem>
                <SelectItem value="Leg Press">Leg Press</SelectItem>
                <SelectItem value="Hamstring Curls">Hamstring Curls</SelectItem>

              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cardio</label>
            <Select name='cardio' onChange={handleChange} defaultValue={workoutInput.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className='bg-blue-600 w-full text-white text-center'>
                <SelectItem value="Running">Running</SelectItem>
                <SelectItem value="Mountain Climbers">Mountain Climbers</SelectItem>
                <SelectItem value="High Knees">High Knees</SelectItem>
                <SelectItem value="Burpees">Burpees</SelectItem>
               <SelectItem value="Jumping Jacks">Jumping Jacks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Core/Abs</label>
            <Select name='core' onChange={handleChange} defaultValue={workoutInput.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className='bg-blue-600 w-full text-white text-center'>
                <SelectItem value="Planks">Planks</SelectItem>
                <SelectItem value="Sit-ups">Sit-ups</SelectItem>
                <SelectItem value="Flutter-Kicks">Flutter-Kicks"</SelectItem>
                <SelectItem value="V-ups">V-ups</SelectItem>
                <SelectItem value="Russian Twists">Russian Twists</SelectItem>

              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="w-full">Add Workout</Button>
        <Link href='/workout-list' className="w-full">Get Workout Plan</Link>
      </form>
    </>
  )
}

export default Page
