
import ImageViewer from '@/components/modal/image-viewer';
import { withHighlighter } from '@/hocs/with-highlighter';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';

import cn from '@/helper/cn';

import Category from '@/components/utils/Category';
import Map from '@/components/utils/Map';
import Login from '@/components/utils/Login';
import Magnify from '@/components/utils/Magnify';
import Burger from '@/components/utils/Burger';
import Logo from '@/components/utils/Logo';
import Like from '@/components/utils/Like';
import Home from '@/components/utils/Home';
import Bot from '@/components/utils/Bot';
import Manual from '@/components/utils/Manual';

const Hdsd = () => {
    const hdsd = [
        // khai quat chung
        {
            text: 'tìm hiểu',
            image: 'https://buhkhkt.github.io/CHINH/b%C3%A1nh%20canh%20tphcm.jpg',
        },
    ];
    
    const sampleList = [...hdsd];
    const [openImage, setOpenImage] = useState(false);
    const showImageFromText = (text) => () => {
            const getImageIdx = sampleList.findIndex((x) => x.text.toLowerCase() === text.toLowerCase());
    
            if (getImageIdx > -1) {
                setOpenImage(sampleList[getImageIdx].image);
            }
    };
    
    const highlightText = (text) => {
            return (
                <strong className="inline relative text-[#be9f76] cursor-pointer" onClick={showImageFromText(text)}>
                    {text}
                </strong>
            );
    };
    return (
        <div className="flex flex-col gap-4 pb-4 max-w-[992px] mx-auto">
            
            <h2 className="text-3xl text-center pb-4 border-b border-slate-800 flex justify-center items-center gap-2">Hướng dẫn sử dụng</h2>
            <div className="bg-white shadow rounded-xl p-4 text-justify">
                <ul className="list-[disclosure-closed] pl-5">
                    <li>
                        <div>
                            <p className={cn('flex items-center gap-2 py-2 px-3 ')}>
                                Ở mục{' '}
                                <Home/>
                                <b>Trang chủ</b>{' '}:
                            </p>
                            <ul >
                                <li>Bạn có thể {highlightText('')} tìm hiểu những thông tin khái quát về phần mềm, bản đồ tỉnh trà vinh và những đối tượng cụ thể trong từng huyện, thị, thành phố</li>
                                <li>Cung cấp cho bạn những bài viết nổi bật nhất và những bài viết vừa được phần mềm cập nhật</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div >
                           Để có trải nghiệm tốt hơn, bạn có thể tạo tài khoản và đăng nhập vào phần mềm ở mục
                          <Login />  Đăng ký/ đăng nhập để có thể viết bình luận, bổ sung thông tin, chơi trò chơi, thích bài viết,...
                        </div>
                    </li>
                    <li>
                        <div>
                            <b>Danh mục</b> và <b>yêu thích</b> là nơi lưu trữ những bài viết của phần mềm cũng như những bài viết bạn đã yêu thích.
                        </div>
                    </li>
                    <li>
                        <div>
                            Chức năng <b>bản đồ</b> sẽ cung cấp cho bạn vị trí của từng đối tượng cụ thể theo từng huyện, thị, thành phố, bạn có thể xem nội dung khái quát, thuyết minh cũng như 3d vr tour.
                        </div>
                    </li>
                    <li>
                        <div>
                            <b>Chatbot</b> sẽ cho bạn tương tác trực tiếp với ai của phần mềm nhận được những câu trả lời lý thú.
                        </div>
                    </li>
                    <li>
                        <div>
                            <b>Tìm kiếm</b> sẽ cho bạn tìm kiếm theo tiêu đề của bài viết.
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>Nơi có hình ảnh bạn có thể chọn chia sẽ sang phần mềm thứ 3 cũng như tải về máy.</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>Những chữ in đậm màu vàng, sẽ cung cấp cho bạn hình ảnh, nội dung, liên kết đến các trang liên quan. </p>
                        </div>
                    </li>
                </ul>
                
            </div>
            <ImageViewer isOpen={!!openImage} image={openImage} onClose={() => setOpenImage(null)} />
        </div>
    );
};

export default Hdsd;
