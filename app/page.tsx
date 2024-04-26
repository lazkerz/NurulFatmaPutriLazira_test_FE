import Link from 'next/link'
const Home = () => {
    return (
        <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-gray-900 sm:text-5xl mb-6">Welcome</h1>
          <Link href={'/employee'} className='inline-block rounded-lg bg-sky-500 px-8 py-3 mb-5 text-xs font-medium text-white hover:bg-sky-400  transition-all'>Get Started</Link>
        </div>
      </div>
    )
}
  
export default Home