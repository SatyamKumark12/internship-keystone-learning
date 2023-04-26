import Link from "next/link";
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {

    
    // const token = localStorage.getItem("token")
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    const router = useRouter();

    
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/" className="text-white font-semibold text-xl tracking-tight">
        My Website
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-gray-300 border-gray-400 hover:text-white hover:border-white"
          type="button"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path
              d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
            />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        {
            token ? 
            <>
             <div className="text-sm lg:flex-grow">
          <Link href="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">
          Home
          </Link>
          <Link href="/about" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">
          About
          </Link>
          <Link href="/contact" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white">
          Contact
          </Link>
          <button className="bg-blue-500" onClick={()=>
        {localStorage.removeItem("token")
        router.push('/login');
        }}>Logout</button>
        </div>
            </>
            :
            <>
             <div className="text-sm lg:flex-grow">
          <Link href="/login" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">
          Login
          </Link>
          <Link href="/signup" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white">
          SignUp
          </Link>
        </div>
            </>
        }
       
      </div>
    </nav>
  );
};

export default Navbar;
