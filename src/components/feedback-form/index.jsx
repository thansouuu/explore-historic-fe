/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import axios from 'axios';
import { useForm } from 'react-hook-form';
import InputField from '../form/input-field';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import SelectField from '../form/select-field';

import { uploadToCloudinary } from '@/hooks/use-upload-cloudinary';

const foodList = [
    {
        label: null,
        value: null,
    },
    {
        label: 'Bánh canh Bến Có',
        value: 'Bánh canh Bến Có',
    },
    {
        label: 'Bánh rây',
        value: 'Bánh rây',
    },
    {
        label: 'Bánh tét Trà Cuôn',
        value: 'Bánh tét Trà Cuôn',
    },
    {
        label: 'Bún nước lèo',
        value: 'Bún nước lèo',
    },
    {
        label: 'Bún suông',
        value: 'Bún suông',
    },
    {
        label: 'Cá khoai',
        value: 'Cá khoai',
    },
    {
        label: 'Chả hoa',
        value: 'Chả hoa',
    },
    {
        label: 'Cháo ám',
        value: 'Cháo ám',
    },
    {
        label: 'Chù ụ rang me',
        value: 'Chù ụ rang me',
    },
    {
        label: 'Cốm dẹp',
        value: 'Cốm dẹp',
    },
    {
        label: 'Dừa sáp',
        value: 'Dừa sáp',
    },
    {
        label: 'Mắm bò hóc',
        value: 'Mắm bò hóc',
    },
    {
        label: 'Nước mắm rươi',
        value: 'Nước mắm rươi',
    },
    {
        label: 'Trái quách',
        value: 'Trái quách',
    },
];

const FeedbackForm = forwardRef(({ onFeedbackSubmit }, ref) => {
    const { handleSubmit, reset, control } = useForm({});

    const formRef = useRef();

    const [ images, setImages ] = useState([]);
    const [cloudinaryFiles, setCloudinaryFiles] = useState({});
    const [imageValue, setImagevalue] = useState('');

    useImperativeHandle(ref, () => ({
        reset: () => {
            reset({
                foodName: '',
                comment: '',
                overview: '',
                making: '',
                enjoy: '',
                restaurant: '',
                preserve: '',
            });
        },
        focus: () => {
            formRef.current?.focus();
        },
    }));


    const handleFileChange = (event) => {
        const files = event.target.files;
        setImagevalue(event.target.value);
        const selectedImagesArray = Array.from(files).map((file) => URL.createObjectURL(file));
        setImages(selectedImagesArray);
        setCloudinaryFiles(files);
    };
    

    const onSubmit = async (data) => {
        // console.log(data);
        const result = await uploadToCloudinary(cloudinaryFiles)
        const imageUrlList = result.map((file) => file.secure_url)
        onFeedbackSubmit?.({
            ...data,
            images: imageUrlList,
        });
        setImages([])
        setCloudinaryFiles({})
        setImagevalue('')
    };

    
    return (
        <section className='fixed overflow-y-auto inset-0 z-50'>
            <div className=' max-w-[600px] mx-auto bg-gray-300 p-4 rounded-lg'>
                <h2 className="text-gray-800 font-semibold text-2xl text-center mb-2">Bình luận và đánh giá</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-6">
                    <SelectField
                        label="Món ăn bạn muốn đánh giá"
                        name="foodName"
                        control={control}
                        options={foodList}
                    />
                    <InputField
                        as="textarea"
                        label="Nhận Xét Chung Về Món Ăn"
                        name="comment"
                        placeholder="Ví dụ: Đây là một món ăn đặc biệt mà tôi chưa từng biết. Bài viết hay, nó cho tôi cách nhìn mới về ẩm thực."
                        control={control}
                        ref={formRef}
                    />

                    <InputField
                        as="textarea"
                        label="Khái quát chung"
                        name="overview"
                        placeholder="Ví dụ: Phần khái quát chung này viết hay, khiến cho tôi cảm nhận được đồ ăn như được hiện lên trước mắt mình."
                        control={control}
                    />

                    <InputField
                        as="textarea"
                        label="Cách làm món ăn"
                        name="making"
                        placeholder="Ví dụ: Cách làm này ngon, đồ ăn có hương vị y như trong quán."
                        control={control}
                    />

                    <InputField
                        as="textarea"
                        label="Thưởng thức"
                        name="enjoy"
                        placeholder="Ví dụ: Phần thưởng thức rất hay, làm cho món ăn rất có hồn."
                        control={control}
                    />

                    <InputField
                        as="textarea"
                        label="Quán ăn"
                        name="restaurant"
                        placeholder="Ví dụ: Quán ăn này ngon. Phục vụ tốt. Giá cả hợp lí. Ăn ngon hợp khẩu vị."
                        control={control}
                    />

                    <InputField
                        as="textarea"
                        label="Bảo quản"
                        name="preserve"
                        placeholder="Ví dụ: Cách bảo quản này đúng, không bị hư. Sau 1 khoảng thời gian, đồ ăn vẫn ngon."
                        control={control}
                    />
                    
                   <div className='flex flex-col gap-1'>
                        <label htmlFor="fileInput"> Hình ảnh đính kèm:</label>
                        <input type="file" accept="image/*" multiple id="fileInput"
                            value={imageValue}
                             onChange={handleFileChange}
                        />
                   </div>

                    <div className='grid grid-cols-2 gap-2'>
                        {images?.map((image, index) => (
                            <div className='border border-gray-700'
                                key={index} 
                            >
                                <img alt="image-upload-item" 
                                    className='w-full h-[200px] object-contain'
                                    src={image} 
                                />
                            </div>
                        ))}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="outline-none px-4 py-2 rounded-lg bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                        >
                            Gửi đánh giá
                        </button>
                    </div>
                </div>
            </form>
            </div>

       
        </section>
    );
});

export default FeedbackForm;