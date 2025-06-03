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
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [workouts, setWorkouts] = useState([])
    const [editingWorkout, setEditingWorkout] = useState(null)
    const [editIndex, setEditIndex] = useState(null)

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user_workouts')) || []
        console.log(data);
        setWorkouts(data)
    }, [])

    const handleUpdate = (event) => {
        const { name, value } = event.target
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
        <div className='container'>
            <div className='bg-neutral-800 py-10 px-20 text-amber-50 font-bold text-2xl'>
                <h1>PROFILE</h1>
            </div>

            <div className='text-center'>
                <h2>PROGRAMS I HAVE CREATED</h2>
                <div className='p-5 grid gap-2'>
                    {workouts.map((data, i) => (
                        <div key={i} className='flex justify-between items-center p-3 rounded-md bg-blue-600 w-full text-white'>
                            <div className='text-justify'>
                                <p>{data.name}</p>
                                <p>{data.category}</p>
                                <small>{data.description}</small>
                            </div>

                            <div className='flex gap-3'>
                                <Dialog>
                                    <DialogTrigger onClick={() => handleEditClick(data, i)}>
                                        <SquarePen />
                                    </DialogTrigger>
                                    <DialogContent className='bg-white'>
                                        <DialogHeader>
                                            <DialogTitle>Edit your Workout Plan</DialogTitle>
                                            {editingWorkout && (
                                                <>
                                                    <Input
                                                        name="name"
                                                        onChange={handleUpdate}
                                                        value={editingWorkout.name || ''}
                                                    />
                                                    <Input
                                                        name="description"
                                                        onChange={handleUpdate}
                                                        value={editingWorkout.description || ''}
                                                    />
                                                    <Input
                                                        name="category"
                                                        onChange={handleUpdate}
                                                        value={editingWorkout.category || ''}
                                                    />
                                                    <button className="mt-4" onClick={handleSave}>
                                                        Save Changes
                                                    </button>
                                                </>
                                            )}
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                                <Trash  className="cursor-pointer" onClick={() => handleDelete(i)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page
