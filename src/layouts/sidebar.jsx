import React from 'react';
import { Link, useLocation } from 'react-router-dom';


// import Dropdown from '@/components/dropdown';

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


const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation()
    return (
        <div
            className={`hidden md:block z-20 fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out`}
        >
            <div className="flex justify-end p-4" onClick={toggleSidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
                </svg>
            </div>
            <ul className="mt-16">
                
                <Link to="/tieng-viet/main"
                >
                    <li className={`p-4 hover:bg-gray-700 flex items-center gap-4 ${location.pathname.includes('categories') ? 'bg-gray-900' : ''}`}>
                    <Home/>
                    Trang chủ
                    </li>
                </Link>
                <Link to="/tieng-viet/account"
                    className={location.pathname.includes('account') ? 'bg-gray-700' : ''}
                >
                    <li className="p-4 hover:bg-gray-700 flex items-center gap-4">
                    <Login/>
                    Đăng nhập / Đăng ký
                    </li>
                </Link>
                <Link to="/tieng-viet/figure">
                    <li className={`p-4 hover:bg-gray-700 flex items-center gap-4 ${location.pathname.includes('categories') ? 'bg-gray-900' : ''}`}>
                    <Category />
                    Danh mục
                    </li>
                </Link>
                <Link to="/tieng-viet/like">
                    <li className={`p-4 hover:bg-gray-700 flex items-center gap-4 ${location.pathname.includes('categories') ? 'bg-gray-900' : ''}`}>
                    <Like/>
                    Yêu thích
                    </li>
                </Link>
                <Link to="/tieng-viet/map">
                    <li className={`p-4 hover:bg-gray-700 flex items-center gap-4 ${location.pathname.includes('categories') ? 'bg-gray-900' : ''}`}>
                    <Map/>
                    Bản đồ
                    </li>
                </Link>
                <Link to="/tieng-viet/chatbot">
                    <li className={`p-4 hover:bg-gray-700 flex items-center gap-4 ${location.pathname.includes('categories') ? 'bg-gray-900' : ''}`}>
                    <Bot/>
                    Chatbot
                    </li>
                </Link>
                <Link to="/tieng-viet/find">
                    <li className={`p-4 hover:bg-gray-700 flex items-center gap-4 ${location.pathname.includes('categories') ? 'bg-gray-900' : ''}`}>
                    <Magnify/>
                    Tìm kiếm
                    </li>
                </Link>
                <Link to="/tieng-viet/hdsd">
                    <li className={`p-4 hover:bg-gray-700 flex items-center gap-4 ${location.pathname.includes('categories') ? 'bg-gray-900' : ''}`}>
                    <Manual/>
                    Hướng dẫn sử dụng
                    </li>
                </Link>
                
                
                {/* <li>
                    <Dropdown title="Danh mục" items={[
                        {
                            label: 'Danh mục 1',
                            href: '/tieng-viet/tin-tuc/1',
                        },
                        {
                            label: 'Danh mục 1',
                            href: '/tieng-viet/tin-tuc/1',
                        },
                        {
                            label: 'Danh mục 1',
                            href: '/tieng-viet/tin-tuc/1',
                        }
                    ]}/>
                </li> */}
            </ul>
        </div>
    );
};

export default Sidebar;
