import React from "react";
import { FiBook, FiEdit, FiTag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Home = () => {
  const { isLoggedIn } = useUser();
  return (
    <main>
      <section className='py-20 px-8 max-w-4xl mx-auto text-center'>
        <h1 className='text-4xl font-bold text-primary-dark mb-4'>
          Simple Note-Taking for Organized Minds
        </h1>
        <p className='text-xl text-gray-600 my-8'>
          Capture ideas quickly, organize effortlessly, and access them
          anywhere.
        </p>
        <div className='my-12'>
          <Link
            to={`${isLoggedIn ? "/dashboard" : "/signup"}`}
            className='input-btn px-6 '
          >
            Get Started - It's Free
          </Link>
        </div>
      </section>
      <section className='py-6 px-8 bg-light'>
        <div className='max-w-4xl mx-auto'>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-lg shadow-sm text-center text-primary-dark'>
              <div className='flex justify-center mb-4'>
                <FiEdit size={28} className='text-primary' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>Simple Editing</h3>
              <p className='text-gray-600'>
                Clean, distraction-free interface for capturing your thoughts.
              </p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-sm text-center text-primary-dark'>
              <div className='flex justify-center mb-4'>
                <FiTag size={28} className='text-primary' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>Easy Organization</h3>
              <p className='text-gray-600'>
                Sort and categorize your notes with intuitive tools.
              </p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-sm text-center text-primary-dark'>
              <div className='flex justify-center mb-4'>
                <FiBook size={28} className='text-primary' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>Web-Based</h3>
              <p className='text-gray-600'>
                Access your notes from any browser, no installation needed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
