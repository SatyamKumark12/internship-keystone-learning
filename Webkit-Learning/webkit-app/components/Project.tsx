import { useState } from "react";
import Link from "next/link";
import styles from '../src/styles/Backend.module.css';
import Image from "next/image";

const Project = () => {

    const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  
  return (
    <>
    <div className="body">
    <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 drop-shadow">
            <div className="flex flex-wrap justify-between items-center">
                <h5>My Projects</h5>
                <div className="flex flex-wrap justify-between items-center">
                    <div className="relative inline-block text-left">
                    <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-[#F8F7F7] text-base font-medium text-white hover:bg-[#F8F7F7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#F8F7F7]"
                        id="options-menu"
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        onClick={toggleDropdown}
                    >
                    <div className="text-black"><span className="font-bold text-black">Status:</span>In Progress <i className="ri-arrow-down-s-line ml-2 mr-0"></i></div>
                        {/* <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        >
                        <path
                            fillRule="evenodd"
                            d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 0l.707.707a1 1 0 010 1.414L11.414 10l2.293 2.293a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414 0L10 11.414l-2.293 2.293a1 1 0 01-1.414 0l-.707-.707a1 1 0 010-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414l.707-.707z"
                            clipRule="evenodd"
                        />
                        </svg> */}
                    </button>

                    {/* Dropdown menu, show/hide based on menu state */}
                    {isOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                        >
                            <Link
                            href="/"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            >
                            In Progress
                            </Link>
                            <Link
                            href="/"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            >
                            Priority
                            </Link>
                            <Link
                            href="/"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            >
                            Category
                            </Link>
                        </div>
                        </div>
                    )}
                    </div>
  
                    <div className="flex items-center mr-3 space-x-3">
                    <div data-toggle-extra="tab" data-target-extra="#grid" className="active">
                        <div className="grid-icon mr-3">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        </div>
                    </div>
                    </div>

                    <div>
                        <div className="rounded bg-blue-500" data-toggle="modal">New Project</div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div>
        
        <div className="max-w-xl p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 drop-shadow mt-5 ml-5">
           
                <div className="flex justify-between items-center">
                    <div className="flex items-center justify-between mb-4">
                    <div id="circle-progress-05" className="circle-progress-01 circle-progress circle-progress-primary" data-min-value="0" data-max-value="100" data-value="25" data-type="percent"></div>
                    <svg version="1.1" width="100" height="100" viewBox="0 0 100 100" className={styles.circleprogress}><circle className={styles.circleprogresscircle} cx="50" cy="50" r="47" fill="none" stroke="#ddd" stroke-width="8"></circle><path d="M 50 3 A 47 47 0 0 1 97 50" className={styles.circleprogressvalue} fill="none" stroke="#00E699" stroke-width="8"></path><text className={styles.circleprogresstext} x="50" y="50" font="16px Arial, sans-serif" text-anchor="middle" fill="#999" dy="0.4em">25%</text></svg>
                    </div>
                  
                  <div className="ml-5">
                  <h5 className="mb-1 text-3xl">Theme development</h5>
                <p className="mb-3 text-1xl">Preparing framework of block-based WordPress Theme.</p>
                  </div>

                <div className="flex items-center justify-between pt-3 border-gray-400 ml-10">
                <div className={styles.iqmediagroup}>
                                    <a href="#" className={styles.iqmedia}>
                                        <Image className="border border-gray-400 rounded-full"  src="/assets/images/user/05.jpg" height={40} width={40} alt=""/>
                                    </a>
                                    <a href="#" className={styles.iqmedia}>
                                        <Image className="img-fluid avatar-40 rounded-full" src="/assets/images/user/06.jpg" height={40} width={40} alt=""/>
                                    </a>
                                </div>
                    <a href="#" className="bg-white text-blue-500 shadow-md hover:shadow-lg bg-color-[#e6e6e6] border-[#dfdfdf]">High</a>
                    </div>
                </div>

                </div>
     

    </div>

    </>
  )
}

export default Project;