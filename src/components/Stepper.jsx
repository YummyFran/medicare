

const Stepper = ({ step = 1 }) => {
  return (
    <div className='px-[2rem] lg:px-[10rem] py-10 flex justify-center'>
        <div className='flex justify-between gap-[5rem] lg:gap-[10rem] relative'>
            <div className='absolute w-[93%] top-3 left-2 bg-gray-200 h-[2px]'></div>
            <div className='flex flex-col gap-2 items-center relative'>
                <div className={`w-7 h-7 aspect-square ${step == 1 ? 'bg-gray-800 text-white' : 'bg-white border-3 text-gray-600'} font-bold text-xs rounded-full grid place-items-center`}>1</div>
                <p className='text-sm'>Cart</p>
            </div>
            <div className='flex flex-col gap-2 items-center relative'>
                <div className={`w-7 h-7 aspect-square ${step == 2 ? 'bg-gray-800 text-white' : 'bg-white border-3 text-gray-600'} font-bold text-xs rounded-full grid place-items-center`}>2</div>
                <p className='text-sm'>Address</p>
            </div>
            <div className='flex flex-col gap-2 items-center relative'>
                <div className={`w-7 h-7 aspect-square ${step == 3 ? 'bg-gray-800 text-white' : 'bg-white border-3 text-gray-600'} font-bold text-xs rounded-full grid place-items-center`}>3</div>
                <p className='text-sm'>Payment</p>
            </div>
        </div>
    </div>
  )
}

export default Stepper