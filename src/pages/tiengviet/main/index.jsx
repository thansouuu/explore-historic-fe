import React, { useEffect, useState } from 'react';
import productData from '@/data/product';
import { Link } from 'react-router-dom';

const Main = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [topViewedProducts, setTopViewedProducts] = useState([]);

    const images = [
        'https://via.placeholder.com/1200x300?text=Slide+1',
        '/public/images/food-0.jpg',
        'https://via.placeholder.com/1200x300?text=Slide+3',
        'https://via.placeholder.com/1200x300?text=Slide+1',
        '/public/images/food-0.jpg',
        'https://via.placeholder.com/1200x300?text=Slide+3',
        'https://via.placeholder.com/1200x300?text=Slide+1',
        '/public/images/food-0.jpg',
        'https://via.placeholder.com/1200x300?text=Slide+3',
        'https://via.placeholder.com/1200x300?text=Slide+1',
        '/public/images/food-0.jpg',
        'https://via.placeholder.com/1200x300?text=Slide+3',
    ];

    useEffect(() => {
        const products = Object.values(productData).flatMap((figure) => {
            const figureId = figure.figureId;
            return figure.data.map((product) => ({
                ...product,
                figureId: figureId
            }));
        });
        // Lọc các sản phẩm có số lượt xem (view) lớn hơn 0 (hoặc giá trị mình cần)
        const filteredProducts = products.filter((product) => product.view > 0);

        // Sắp xếp các sản phẩm theo số lượt xem (view) từ cao đến thấp
        filteredProducts.sort((a, b) => b.view - a.view);

        // Lấy top 3 sản phẩm có số lượt xem (view) cao nhất
        const topProducts = filteredProducts.slice(0, 3);
        console.log(topProducts);

        setTopViewedProducts(topProducts);

        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Interval time in milliseconds
        return () => clearInterval(intervalId);
    }, [images.length]);

    const goToPreviousSlide = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNextSlide = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentImageIndex(0); // Reset current slide index when category changes
    };

    const filteredImages = selectedCategory === 'all' ? images : images.filter((image, index) => index % 3 === 0);

    const goToSlide = (index) => {
        setCurrentImageIndex(index);
    };


    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1">
                <main className="flex-1 p-4 transition-margin duration-300">
                    <div className="mb-4">
                        <label htmlFor="category" className="mr-2">
                            Chọn danh mục:
                        </label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="mt-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                        >
                            <option value="all">Tất cả</option>
                            <option value="category1">Danh mục 1</option>
                            <option value="category2">Danh mục 2</option>
                        </select>
                    </div>
                    {/* <div className="mb-4">
                        <iframe width="960" height="640" data-original-width="1920" data-original-height="1280" src="https://www.thinglink.com/view/scene/1807320750831436453" type="text/html" style="border: none;" webkitallowfullscreen mozallowfullscreen allowfullscreen scrolling="no"></iframe><script async src="//cdn.thinglink.me/jse/responsive.js"></script>
                    </div> */}
                    <div className="slider-container mb-4 w-full h-48 md:h-64 lg:h-80 xl:h-96 overflow-hidden relative">
                        <div
                            className="slider-wrapper absolute top-0 w-full h-full flex transition-transform duration-1000 ease-in-out"
                            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                        >
                            {filteredImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            ))}
                        </div>
                        <button
                            onClick={goToPreviousSlide}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={goToNextSlide}
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-3 h-3 rounded-full cursor-pointer ${
                                        currentImageIndex === index ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}
                                    onClick={() => goToSlide(index)}
                                ></div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            <div className="flex flex-col p-4">
                <h2 className="mb-4 text-xl font-semibold">Top 3 bài viết nổi bật nhất:</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {topViewedProducts.map((product, index) => (
                       
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                            <Link
                            key={index}
                            to={`/tieng-viet/figure/${product.figureId}/product/${product.id}`}
                            className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
                            >
                               
                                <img  className="rounded-t-lg"
                                    src={product.imageCover}
                                    alt={product.title}
                                />   
                            </Link>
                                <div className="p-4">
                                    <p className="text-lg font-semibold mb-2">{product.title}</p>
                                    {/* <p className="text-gray-600">Số lượt xem: {product.view}</p> */}
                                    <p className="text-gray-600">{product.description}</p>
                                </div>
                            </div>

                    ))}
                </div>
            </div>
            
                
        </div>
    );
};

export default Main;
