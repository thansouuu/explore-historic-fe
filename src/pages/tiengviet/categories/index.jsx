import { Link, useParams } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import productData from '@/data/product';

const Categories = memo(() => {
    // {window.location.reload()}
    const [products, setProducts] = useState([])
    const [types, setTypes] = useState(0);
    const [tmp, setTmp] = useState(0);
    const param = useParams()
    useEffect(() => {
        const filterProduct = productData.find(product => product.figureId == param.id)
        if(!filterProduct) return
        setProducts(filterProduct?.data); 
        setTypes(filterProduct?.type);
    },[])
    if(!products) return 'Loading...'
    
    const handleButtonClick = (buttonId) => {
        setTmp(buttonId)
    };
    const filteredProducts = products?.filter(product => product.type === tmp);
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:max-w-[900px] mx-auto">
            {types===1 &&
                <>
                    <div className="col-span-full bg-white p-6 rounded shadow-md flex justify-center items-center flex-wrap mb-6">
                        <button 
                            onClick={() => handleButtonClick(1)}
                            className="px-4 py-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
                        >
                            Giai đoạn 1
                        </button>
                        <button 
                            onClick={() => handleButtonClick(2)}
                            className="px-4 py-2 my-2 bg-green-500 text-white rounded hover:bg-green-600 mr-4"
                        >
                            Giai đoạn 2
                        </button>
                        <button 
                            onClick={() => handleButtonClick(3)}
                            className="px-4 py-2 my-2 bg-red-500 text-white rounded hover:bg-red-600 mr-4"
                        >
                            Giai đoạn 3
                        </button>
                        <button 
                            onClick={() => handleButtonClick(4)}
                            className="px-4 py-2 my-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-4"
                        >
                            Giai đoạn 4
                        </button>
                    </div>
                </>
            }
            
            {filteredProducts?.map((product, index) => (          
                <div  key={index} className="w-full lg:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/tieng-viet/figure/${param.id}/product/${product.id}`}>
                        <img className="rounded-t-lg" src={product.imageCover} alt={product.title} />
                    </Link>
                    <div className="p-5">
                    <Link to={`/tieng-viet/figure/${param.id}/product/${product.id}`}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                    </Link>
                    <Link to={`/tieng-viet/figure/${param.id}/product/${product.id}`}>
                        <p className=" text-justify mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
                    </Link>
                    <Link to={`/tieng-viet/figure/${param.id}/product/${product.id}`} className="inline-flex items-center px-3 py-2 text-sm         font-medium     text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none         focus:ring-blue-300     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Xem thêm
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"viewBox="0        0     14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9" />
                        </svg>
                    </Link>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default Categories;

Categories.displayName = 'Categories';
