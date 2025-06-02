'use client';
import React from 'react'
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
const Workoutform = () => {
    
  const [workout, setWorkout] = useState({
    name: '',
    description: '',
    category: 'Upper Body',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setWorkout((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value) => {
    setWorkout((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Workout submitted:", workout)
    setWorkout({ name: '', description: '', category: 'Upper Body' })
  }
  return (
    <>
       <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Workout Name</label>
        <Input
          name="name"
          value={workout.name}
          onChange={handleChange}
          placeholder="Enter workout name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          name="description"
          value={workout.description}
          onChange={handleChange}
          placeholder="Enter workout description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <Select onValueChange={handleCategoryChange} defaultValue={workout.category}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Upper Body">Upper Body</SelectItem>
            <SelectItem value="Lower Body">Lower Body</SelectItem>
            <SelectItem value="Full Body">Full Body</SelectItem>
            <SelectItem value="Cardio">Cardio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">Add Workout</Button>
    </form>
  )
    </>
  )
}

export default Workoutform
