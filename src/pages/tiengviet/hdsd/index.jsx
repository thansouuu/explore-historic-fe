
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
                            Ở mục{' '}
                            <span className="inline-block align-middle">
                                <img src="/src/assets/skill/home.png" className="w-5 h-5" />
                            </span>
                            <b>Trang chủ</b>{' '}: bạn có thể tìm hiểu thông tin khái quát về phần mềm, cung cấp cho bạn những bài viết nổi bật nhất và những bài viết vừa được phần mềm cập nhật.    
                        </div>
                    </li>
                    <li>
                        <div >
                           Để có trải nghiệm tốt hơn, bạn có thể tạo tài khoản và đăng nhập vào phần mềm ở mục
                           {' '}
                            <span className="inline-block align-middle">
                                <img src="/src/assets/skill/account.png" className="w-5 h-5" />
                            </span>
                            {' '}
                            <b>Đăng ký/ đăng nhập</b>  để có thể viết bình luận, bổ sung thông tin, chơi trò chơi, thích bài viết,...
                        </div>
                    </li>
                    <li>
                        <div>
                            {' '}
                            <span className="inline-block align-middle">
                                <img src="/src/assets/skill/list.png" className="w-4 h-4" />
                            </span>
                            {' '}
                            <b>Danh mục</b> và 
                            {' '}
                            <span className="inline-block align-middle">
                                <img src="/src/assets/skill/like.png" className="w-4 h-4" />
                            </span>
                            {' '}
                            <b>yêu thích</b> là nơi lưu trữ những bài viết của phần mềm cũng như những bài viết bạn đã yêu thích.
                        </div>
                    </li>
                    <li>
                        <div>
                            Chức năng 
                            {' '}
                            <span className="inline-block align-middle">
                                <img src="/src/assets/skill/map.png" className="w-5 h-5" />
                            </span>
                            {' '}
                            <b>bản đồ</b> sẽ cung cấp cho bạn vị trí của từng đối tượng cụ thể theo từng huyện, thị, thành phố, bạn có thể xem nội dung khái quát, thuyết minh cũng như 3D - VR Tour.
                        </div>
                    </li>
                    <li>
                        <div>
                            {' '}
                            <span className="inline-block align-middle">
                                <img src="/src/assets/skill/bot.png" className="w-5 h-5" />
                            </span>
                            {' '}
                            <b>Chatbot</b> sẽ cho bạn tương tác trực tiếp với ai của phần mềm nhận được những câu trả lời lý thú.
                        </div>
                    </li>
                    <li>
                        <div>
                            {' '}
                            <span className="inline-block align-middle">
                                <img src="/src/assets/skill/find.png" className="w-5 h-5" />
                            </span>
                            {' '}
                            <b>Tìm kiếm</b> sẽ cho bạn tìm kiếm nội dung của từng huyện, thị, thành phố hay tìm kiếm theo tiêu đề bài viết.
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>Nơi có hình ảnh bạn có thể chọn chia sẽ sang phần mềm thứ 3 cũng như tải về máy.</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>Những chữ in đậm <b><span className={'text-amber-700'}>màu</span></b> : sẽ cung cấp cho bạn hình ảnh, nội dung liên quan. </p>
                            <p>Những chữ in đậm <b><span className={'text-green-400'}>màu</span></b> : sẽ liên kết tới những bài viết liên quan. </p>
                        </div>
                    </li>
                </ul>
                
            </div>
            <ImageViewer isOpen={!!openImage} image={openImage} onClose={() => setOpenImage(null)} />
        </div>
    );
};

export default Hdsd;
