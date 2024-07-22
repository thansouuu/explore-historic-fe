import 'react-vertical-timeline-component/style.min.css';
import { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { GiThink } from 'react-icons/gi';
import { FaFileImage } from "react-icons/fa";
import { SlInfo } from 'react-icons/sl';
import { PiCookingPot } from 'react-icons/pi';
import { FaRegFaceGrinBeamSweat } from 'react-icons/fa6';
import { MdManageHistory, MdOutlineRestaurant} from 'react-icons/md';

import EmptyUser from '@/assets/empty-user.svg';
import BorderRank from '../border-rank/border-rank';

const FeedbackCard = ({ feedback }) => {
    const [isViewMore, setIsViewMore] = useState(false);

    const renderTimeLineElement = (title, content, icon) => {
        
        return (
            <VerticalTimelineElement
                className="vertical-timeline-element--work [&_.vertical-timeline-element-content]:!rounded-2xl [&_.vertical-timeline-element-content]:bg-gradient-to-tr [&_.vertical-timeline-element-content]:from-[#e2ba81] [&_.vertical-timeline-element-content]:to-[#e8d8c3]"
                iconStyle={{ background: '#bf8b44', color: '#fff' }}
                icon={icon}
            >
                <h3 className="vertical-timeline-element-title">{title}</h3>
                {/* <h4 className="vertical-timeline-element-subtitle font-semibold text-sm">{subtitle}</h4> */}
                <p className='break-words whitespace-pre-wrap'>{content ?? 'Không có dữ liệu'}</p>
            </VerticalTimelineElement>
        );
    };

    const Images = ({ images }) => {
        if (!images || images?.length === 0) {
            return 'Không có hình ảnh';
        }
        return (
            <div className="grid grid-cols-2 gap-2">
                {
                    images.map((image, index) => (
                        <div className='w-full border-2 border-gray-300' key={index}>
                            <img src={image} className="w-full h-[250px] object-contain" />
                        </div>
                    ))
                }
            </div>
        )
    }

    const viewMoreHandler = () => {
        setIsViewMore(!isViewMore)
    }

    const avatar = feedback?.createdBy?.avatar ?? EmptyUser;
    const fullname = feedback?.createdBy?.fullname ?? 'Người đánh giá ẩn danh';

    return (
        <div className="bg-white/60 backdrop-blur-md shadow rounded-2xl p-4 min-h-[200px] flex flex-col gap-4 w-full">
            <div className="flex flex-row items-center  gap-4">
                    <BorderRank role={feedback?.createdBy?.role} size={150}>
                        <div className='w-[60px] h-[60px] rounded-full border-[4px] border-gray-700 overflow-hidden mx-auto flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                            <img src={avatar} alt="user-avatar" className='w-full h-full object-cover'/>
                        </div>
                    </BorderRank>

                <div className="flex-1">
                    <h2 className="text-lg">
                        <span className="font-semibold">{fullname}</span> đã đăng một đánh giá với món{' '}
                        <span className="font-semibold">{feedback.foodName}</span>
                    </h2>
                    <span>
                        <span>Vào: </span>

                        <time className="font-semibold">{new Date(feedback.createdAt).toLocaleDateString()}</time>
                    </span>
                </div>
            </div>

            <div>
                {isViewMore &&
                   
                        <VerticalTimeline>
                            {renderTimeLineElement('Nhận Xét Chung Về Món Ăn', feedback?.comment, <GiThink />)}

                            {renderTimeLineElement('Khái quát chung', feedback?.overview, <SlInfo />)}

                            {renderTimeLineElement('Cách làm món ăn', feedback?.making, <PiCookingPot />)}

                            {renderTimeLineElement('Thưởng thức', feedback?.enjoy, <FaRegFaceGrinBeamSweat />)}

                            {renderTimeLineElement('Quán ăn', feedback?.restaurant, <MdOutlineRestaurant />)}
                            
                            {renderTimeLineElement('Bảo quản', feedback?.preserve, <MdManageHistory/>)}
                            {renderTimeLineElement('Hình ảnh đính kèm', <Images images={feedback?.images}/>, <FaFileImage/>)}
                        </VerticalTimeline>


                }
                    
                <button onClick={viewMoreHandler} className='px-4 py-2 rounded-2xl bg-white shadow text-center flex items-center justify-center'>{!isViewMore ? 'Xem bình luận':'Ẩn bình luận'}</button>
                
            </div>
        </div>
    );
};

export default FeedbackCard;



