import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import cn from '@/helper/cn';
import { useAuth } from '@/hooks/use-auth';
import Category from '@/components/utils/Category';
import Map from '@/components/utils/Map';
import Login from '@/components/utils/Login';
import Magnify from '@/components/utils/Magnify';
import Burger from '@/components/utils/Burger';
import Logo from '@/components/utils/Logo';
import productData from '@/data/product';
import Like from '@/components/utils/Like';
import Home from '@/components/utils/Home';
import Bot from '@/components/utils/Bot';
import Manual from '@/components/utils/Manual';



const Find = () => {


    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { isLoggedIn, mutate, data } = useAuth();
    const [zoomEnabled, setZoomEnabled] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const handleNavbarToggle = () => {
        setNavbarOpen(!navbarOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        mutate();
        localStorage.removeItem('user');
        setDropdownOpen(false);
    };
    const handleSearchOpen = () => {
        setSearchOpen(true);
    };

    const handleSearchClose = () => {
        setSearchResult([]);
        setSearchOpen(false);
        setSearchTerm('');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm=='') {
            setSearchResult([]);
            return;
        }
        const products = Object.values(productData).flatMap((figure) => (
            figure.data.map((product) => ({
                ...product,
                figureId: figure.figureId, // Thêm thông tin figureId vào từng sản phẩm
            }))
        ));
        const tmp = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log('Search term:', tmp);
        console.log(productData);
        setSearchResult(tmp);
    };

    return (
        <>
            <form onSubmit={handleSearchSubmit} className="flex w-full items-center space-x-2">
                            <input
                                type="text"
                                className="w-full px-4 py-2 text-black rounded-md"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">
                                Search
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 text-white bg-red-500 rounded-full"
                                onClick={handleSearchClose}
                            >
                                x
                            </button>
                        </form>
                        {searchResult.length > 0 && (
                            <ul className='bg-white rounded-lg'>
                                {searchResult.map((product) => (
                                    <li
                                        key={product.id}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={handleSearchClose}
                                    >
                                        <Link
                                            to={`/tieng-viet/figure/${product.figureId}/product/${product.id}`}
                                            className="block"
                                            onClick={() => setSearchResult([])} 
                                        >
                                            {product.title}
                                        </Link>
                                    </li>
                                ))}
                                
                            </ul>
                           
                        )}
                </>
    );
};

export default Find;