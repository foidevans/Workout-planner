'use client'
import { SquarePen, Trash } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Page = () => {
  const [workouts, setWorkouts] = useState([])
  const [editingWorkout, setEditingWorkout] = useState(null)
  const [editIndex, setEditIndex] = useState(null)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user_workouts')) || []
    setWorkouts(data)
  }, [])

  const handleUpdate = (event) => {
    const { name, value } = event.target
    setEditingWorkout((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setEditingWorkout((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditClick = (workout, index) => {
    setEditingWorkout(workout)
    setEditIndex(index)
  }

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...workouts]
      updated[editIndex] = editingWorkout
      setWorkouts(updated)
      localStorage.setItem('user_workouts', JSON.stringify(updated))
    }
  }

  const handleDelete = (index) => {
    const updated = workouts.filter((_, i) => i !== index);
    setWorkouts(updated);
    localStorage.setItem('user_workouts', JSON.stringify(updated));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Workouts</h1>
        <Link href="/workout-form">
          <Button>Create New Workout</Button>
        </Link>
      </div>

      {workouts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No workouts created yet</p>
          <Link href="/workout-form">
            <Button className="mt-4">Create Your First Workout</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {workouts.map((data, i) => (
            <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{data.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{data.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {data.category_upper_body && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        Upper: {data.category_upper_body}
                      </span>
                    )}
                    {data.category_lower_body && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Lower: {data.category_lower_body}
                      </span>
                    )}
                    {data.cardio && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                        Cardio: {data.cardio}
                      </span>
                    )}
                    {data.core && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        Core: {data.core}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Dialog className="bg-white">
                    <DialogTrigger onClick={() => handleEditClick(data, i)}>
                      <SquarePen className="h-5 w-5 text-gray-500 hover:text-blue-500" />
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Edit Workout</DialogTitle>
                      </DialogHeader>
                      {editingWorkout && (
                        <div className="space-y-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <Input
                              name="name"
                              onChange={handleUpdate}
                              value={editingWorkout.name || ''}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <Input
                              name="description"
                              onChange={handleUpdate}
                              value={editingWorkout.description || ''}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Upper Body</label>
                              <Select 
                                name="category_upper_body"
                                onValueChange={(value) => handleSelectChange('category_upper_body', value)}
                                value={editingWorkout.category_upper_body || ''}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select upper body" />
                                </SelectTrigger>
                                <SelectContent className="bg-blue-200">
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
                                value={editingWorkout.category_lower_body || ''}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select lower body" />
                                </SelectTrigger>
                                <SelectContent className="bg-green-200">
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
                                value={editingWorkout.cardio || ''}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select cardio" />
                                </SelectTrigger>
                                <SelectContent className="bg-red-200">
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
                                value={editingWorkout.core || ''}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select core" />
                                </SelectTrigger>
                                <SelectContent className="bg-yellow-200">
                                  <SelectItem value="Planks">Planks</SelectItem>
                                  <SelectItem value="Sit-ups">Sit-ups</SelectItem>
                                  <SelectItem value="Flutter-Kicks">Flutter Kicks</SelectItem>
                                  <SelectItem value="V-ups">V-ups</SelectItem>
                                  <SelectItem value="Russian Twists">Russian Twists</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <Button onClick={handleSave} className="w-full mt-4">
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Trash 
                    className="h-5 w-5 text-gray-500 hover:text-red-500 cursor-pointer" 
                    onClick={() => handleDelete(i)} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
