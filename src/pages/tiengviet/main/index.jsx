import React, { useEffect, useState } from 'react';
import productData from '@/data/product';
import { Link } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';
  import { Carousel } from 'react-bootstrap';
const Main = () => {
    const [topViewedProducts, setTopViewedProducts] = useState([]);
    const navigate = useNavigate()
    const images = [
        'https://raw.githubusercontent.com/thansouuu/data-image/main/nh%C3%A2n%20v%E1%BA%ADt/%C3%9At%20T%E1%BB%8Bch/1-1.jpg',
        'https://raw.githubusercontent.com/thansouuu/data-image/main/%C4%91%E1%BB%8Ba%20%C4%91i%E1%BB%83m/%C4%91%E1%BA%A1i%20di%E1%BB%87n.jpg',
        'https://raw.githubusercontent.com/thansouuu/data-image/main/D%C3%A2n%20t%E1%BB%99c/Ng%C6%B0%E1%BB%9Di%20Kinh/dai-dien.jpg',
        'https://raw.githubusercontent.com/thansouuu/data-image/main/D%C3%A2n%20t%E1%BB%99c/Ng%C6%B0%E1%BB%9Di%20Kinh/dai-dien.jpg',
    ];

    const paths=[
        `/tieng-viet/figure/1`,
        `/tieng-viet/figure/2`,
        `/tieng-viet/figure/10`,
        `/tieng-viet/figure/8`,
    ]

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

        
    }, []);


    const  handleClick=(index)=>{
        navigate(paths[index])
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:max-w-[900px] mx-auto">
            {/* <div className="flex flex-1"> */}
                <main className="flex-1 p-4 transition-margin duration-300">
                    <div>
                        <Carousel  style={{ width: '100%', height: '300px' }}>
                            {images.map((image, idx) => (
                                
                                <Carousel.Item key={idx}  style={{ height: '300px' }}>
                                    <img
                                        className="d-block w-full h-full object-contain"
                                        onClick={() => handleClick(idx)}
                                        src={image}
                                        alt={`Slide ${idx}`}
                                    />
                                    
                                </Carousel.Item>
                                
                            ))}
                        </Carousel>
                    </div>
                </main>
            {/* </div> */}

            <div className="flex flex-col p-4">
                <h2 className="mb-4 text-xl font-semibold">Top 3 bài viết nổi bật nhất:</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {topViewedProducts.map((product, index) => (
                        <div  key={index} className="w-full lg:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <Link key={index}
                             to={`/tieng-viet/figure/${product.figureId}/product/${product.id}`}>
                                <img  className="rounded-t-lg"
                                    src={product.imageCover}
                                    alt={product.title}
                                />
                            </Link>
                            <div className="p-5">
                                <Link key={index}
                                to={`/tieng-viet/figure/${product.figureId}/product/${product.id}`}>
                                    <p className="text-lg font-semibold mb-2">{product.title}</p>
                                        {/* <p className="text-gray-600">Số lượt xem: {product.view}</p> */}
                                    <p className="text-gray-600">{product.description}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>  
        </div>
    );
};

export default Main;

