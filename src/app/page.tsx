import { Button } from "@/components/ui/button"
import Link from "next/link"

function page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-r from-cyan-500 to-blue-500 p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-500 mb-4">there should have been onbording part here but i have followed the instruction provided</h1>
        <h2 className="text-3xl font-bold text-gray-400 mb-4">here are the button for both the user and admin Interface</h2>
        <div className="flex space-x-4">
          <Link href={"/submit"}>
            <Button  className="bg-sky-500 text-white hover:bg-blue-600 hover:scale-102  transition-all duration-200 ease-in-out">
              User Interface
            </Button>
          </Link>
          <Link href={"/admin"}>
            <Button variant={"outline"} className="border-sky-500 text-sky-500  hover:bg-sky-400 hover:border-white hover:text-white hover:scale-102 transition-all duration-300 ease-in-out ">
              Admin Interface
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default page