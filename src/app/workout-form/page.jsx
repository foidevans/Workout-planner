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

  const handleSelectChange = (name, value) => {
    setWorkoutInput((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedWorkouts = [...workouts, workoutInput]
    setWorkouts(updatedWorkouts);
    localStorage.setItem('user_workouts', JSON.stringify(updatedWorkouts));
    setWorkoutInput({ 
      name: '', 
      description: '', 
      category_upper_body: '', 
      category_lower_body: '', 
      cardio: '', 
      core: '' 
    });
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Workout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Workout Name</label>
          <Input
            name="name"
            value={workoutInput.name}
            onChange={handleChange}
            placeholder="Enter workout name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            name="description"
            value={workoutInput.description}
            onChange={handleChange}
            placeholder="Enter workout description"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <p className="font-medium">Categories</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Upper Body</label>
              <Select 
                name="category_upper_body"
                onValueChange={(value) => handleSelectChange('category_upper_body', value)}
                value={workoutInput.category_upper_body}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select upper body" />
                </SelectTrigger>
                <SelectContent  className="bg-blue-200">
                  <SelectItem value="Push-ups">Push-ups</SelectItem>
                  <SelectItem value="Bench-Press">Bench Press</SelectItem>
                  <SelectItem value="Pull-ups">Pull-ups</SelectItem>
                  <SelectItem value="Deadlifts">Deadlifts</SelectItem>
                  <SelectItem value="Lateral Raises">Lateral Raises</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Lower Body</label>
              <Select 
                name="category_lower_body"
                onValueChange={(value) => handleSelectChange('category_lower_body', value)}
                value={workoutInput.category_lower_body}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select lower body" />
                </SelectTrigger>
                <SelectContent  className="bg-green-200">
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
              <Select 
                name="cardio"
                onValueChange={(value) => handleSelectChange('cardio', value)}
                value={workoutInput.cardio}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cardio" />
                </SelectTrigger>
                <SelectContent  className="bg-red-200">
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
              <Select 
                name="core"
                onValueChange={(value) => handleSelectChange('core', value)}
                value={workoutInput.core}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select core" />
                </SelectTrigger>
                <SelectContent  className="bg-yellow-200">
                  <SelectItem value="Planks">Planks</SelectItem>
                  <SelectItem value="Sit-ups">Sit-ups</SelectItem>
                  <SelectItem value="Flutter-Kicks">Flutter Kicks</SelectItem>
                  <SelectItem value="V-ups">V-ups</SelectItem>
                  <SelectItem value="Russian Twists">Russian Twists</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">Add Workout</Button>
          <Button variant="outline" className="w-full"><Link href='/workout-list' className="flex-1">View Workouts</Link></Button>
     
        </div>
      </form>
    </div>
  )
}

export default Page
