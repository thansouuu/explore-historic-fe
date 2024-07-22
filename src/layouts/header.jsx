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


const HeaderRoot = ({ toggleSidebar }) => {
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { isLoggedIn, mutate, data } = useAuth();
    const [zoomEnabled, setZoomEnabled] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

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
        setSearchOpen(false);
        setSearchTerm('');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const products = Object.values(productData).flatMap((figure) => (
            figure.data.map((product) => ({
                ...product,
                figureId: figure.figureId, // Thêm thông tin figureId vào từng sản phẩm
            }))
        ));
        const searchResult = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log('Search term:', searchResult);
        setSearchResult(searchResult);

    };

    const handleZoomToggle = () => {
        setZoomEnabled(!zoomEnabled);
        document.body.style.touchAction = zoomEnabled ? 'auto' : 'none';
    };

    // useEffect(() => {
    //     const addGoogleTranslateScript = () => {
    //         if (!document.querySelector('script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]')) {
    //             const script = document.createElement('script');
    //             script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    //             script.async = true;
    //             document.body.appendChild(script);
    //             window.googleTranslateElementInit = () => {
    //                 new window.google.translate.TranslateElement(
    //                     {
    //                         pageLanguage: 'vi',
    //                         includedLanguages: 'en,ja,vi',
    //                         layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    //                     },
    //                     'google_translate_element',
    //                 );
    //             };
    //         }
    //     };

    //     const hideGoogleTranslateBar = () => {
    //         const observer = new MutationObserver(() => {
    //             const translateBar = document.querySelector('.goog-te-banner-frame');
    //             if (translateBar) {
    //                 translateBar.style.display = 'none';
    //             }
    //         });
    //         observer.observe(document.body, { childList: true, subtree: true });
    //     };

    //     const handleTranslateStart = () => {
    //         document.body.classList.add('translate-active');
    //         document.querySelector('body > .skiptranslate').style.display = 'normal';
    //     };

    //     const handleTranslateEnd = () => {
    //         document.body.classList.remove('translate-active');
    //         document.querySelector('body > .skiptranslate').style.display = 'none';
    //     };

    //     document.addEventListener('click', (event) => {
    //         const translateElement = document.getElementById('google_translate_element');
    //         if (translateElement?.contains(event.target)) {
    //             handleTranslateStart();
    //         } else {
    //             handleTranslateEnd();
    //         }
    //     });

    //     if (!window.google || !window.google.translate) {
    //         addGoogleTranslateScript();
    //         hideGoogleTranslateBar();
    //     } else {
    //         window.googleTranslateElementInit();
    //     }
    // }, []);

    const handleSelectProduct = (product) => {
        setSearchTerm(product.title);
        setSearchResult([]);
    };

    return (
        <nav className="bg-[#FDCC80] px-4 border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-10">
            <div className="flex items-center mx-auto py-4 max-w-[992px] z-214783646">
                {!searchOpen && (
                    <>
                        <button onClick={toggleSidebar} className="focus:outline-none hidden md:block">
                            <Burger />
                        </button>
                        <div className="relative flex items-center justify-end">
                            <button
                                data-collapse-toggle="navbar-user"
                                type="button"
                                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="navbar-user"
                                aria-expanded={navbarOpen}
                                onClick={handleNavbarToggle}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Logo />
                            </button>
                        </div>
                        <div className="flex items-center gap-1 mx-auto">
                            <div className="w-[35px] h-[35px] ">
                                <img
                                    src="https://raw.githubusercontent.com/thansouuu/data-image/main/%E1%BA%A3nh%20app/logo.jpg"
                                    alt="logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h5 className="text-nowrap text-[20px] font-medium">LỊCH SỬ TỈNH TRÀ VINH</h5>
                        </div>
                        {/* <button onClick={handleSearchOpen}>
                            <Magnify />
                        </button> */}
                    </>
                )}
                {/* {searchOpen && (
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
                            <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-md shadow-lg z-10">
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
                )} */}
            </div>
            {!searchOpen && (
                <div
                    className={classNames(
                        'items-center justify-between w-[75%] md:flex md:w-auto md:order-1 absolute top-full left-0 transition-transform duration-300 ease-in-out',
                        {
                            'translate-x-0': navbarOpen,
                            '-translate-x-full': !navbarOpen,
                        },
                    )}
                    id="navbar-user"
                >
                    <ul className="flex h-screen flex-col font-medium p-4 md:p-0 border border-gray-100 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link
                                to="/tieng-viet/main"
                                className={cn('flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-200 md:hidden')}
                                aria-current="page"
                                onClick={() => setNavbarOpen(false)}
                            >
                                {/* <Login /> */}
                                <Home/>
                                <div>Trang chủ</div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/tieng-viet/account"
                                className={cn('flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-200 md:hidden')}
                                aria-current="page"
                                onClick={() => setNavbarOpen(false)}
                            >
                                <Login />
                                <div>Đăng ký / Đăng nhập</div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/tieng-viet/figure"
                                className={cn('flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-200 md:hidden')}
                                aria-current="page"
                                onClick={() => setNavbarOpen(false)}
                            >
                                <Category />
                                <div>Danh mục</div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/tieng-viet/like"
                                className={cn('flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-200 md:hidden')}
                                aria-current="page"
                                onClick={() => setNavbarOpen(false)}
                            >
                                <Like />
                                <div>Yêu thích</div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/tieng-viet/map"
                                className={cn('flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-200 md:hidden')}
                                aria-current="page"
                                onClick={() => setNavbarOpen(false)}
                            >
                                <Map />
                                <div>Bản đồ</div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/tieng-viet/chatbot"
                                className={cn('flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-200 md:hidden')}
                                aria-current="page"
                                onClick={() => setNavbarOpen(false)}
                            >
                                <Bot />
                                <div>Chatbot</div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/tieng-viet/find"
                                className={cn('flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-200 md:hidden')}
                                aria-current="page"
                                onClick={() => setNavbarOpen(false)}
                            >
                                <Magnify />
                                <div>Tìm kiếm</div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/tieng-viet/hdsd"
                                className={cn('flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-200 md:hidden')}
                                aria-current="page"
                                onClick={() => setNavbarOpen(false)}
                            >
                                <Manual />
                                <div>Hướng dẫn sử dụng</div>
                            </Link>
                        </li>
                        {/* <li>
                            <div
                                id="google_translate_element"
                                className="flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-200 cursor-pointer"
                            ></div>
                        </li> */}
                        <li>
                            <button
                                onClick={handleZoomToggle}
                                className="flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-200 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            >
                                {zoomEnabled ? 'Disable Zoom' : 'Enable Zoom'}
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default HeaderRoot;
