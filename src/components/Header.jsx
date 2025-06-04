"use client"
import { Button } from "./ui/button";
import Link from 'next/link'

const Header = () => {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-600 mb-2">
          Build Workouts That Match Your Grind.
        </h1>
        <p className="text-gray-500">
          Customize every rep, rest, and rhythm, then share your fitness flow
          with the world.
        </p>              
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow-md mt-6">
          <Link href='/workout-form' className="flex-1">Get Started</Link>
        </Button>
      </div>
    </>
  );
};

export default Header;
