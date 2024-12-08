import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-900 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-3rxl">
                    <a href="/">
                    <span className="text-blue-500">Roxiler</span>
                    <span className="text-white ml-1">Systems</span>
                    </a>
                </div>
                <div>
                    <a href='/api/initialize' className='text-white bg-blue-600 px-5 py-2'>Initalize Database</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
