import React from 'react';

const NoWorkout: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-10 text-gray-500 col-span-full text-center leading-8" >
        <img src='images/Illustration.png'/>
      <p className='font-bold text-[#303240]'>No workouts available</p>
      <p>It looks like there are no available slots. Please try refining your search.</p>
    </div>
  );
};

export default NoWorkout;
