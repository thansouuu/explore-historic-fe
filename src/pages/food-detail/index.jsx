import 'react-vertical-timeline-component/style.min.css';

import { useParams } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { useFeedbackDetail } from '@/hooks/use-feedback-detail';
import { GiThink } from 'react-icons/gi';
import { SlInfo } from 'react-icons/sl';
import { PiCookingPot } from 'react-icons/pi';
import { FaRegFaceGrinBeamSweat } from 'react-icons/fa6';
import { MdOutlineRestaurant } from 'react-icons/md';

const FoodDetail = () => {
    const params = useParams();
    const { isLoading, data } = useFeedbackDetail(params.id);

    if (isLoading) return <div>Loading...</div>;

    const renderTimeLineElement = (title, subtitle, content, icon) => {
        return (
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: '#bf8b44', color: '#fff' }}
                icon={icon}
            >
                <h3 className="vertical-timeline-element-title">{title}</h3>
                <h4 className="vertical-timeline-element-subtitle font-semibold text-sm">{subtitle}</h4>
                <p>{content}</p>
            </VerticalTimelineElement>
        );
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold text-center my-10">Nhận xét phản hồi về món {data.data.foodName}</h1>
            <div>
                <VerticalTimeline>
                    {renderTimeLineElement(
                        'Nhận Xét Chung Về Món Ăn',
                        data.data.createdBy.fullname,
                        data.data.comment,
                        <GiThink />,
                    )}

                    {renderTimeLineElement(
                        'Khái quát chung',
                        data.data.createdBy.fullname,
                        data.data.overview,
                        <SlInfo />,
                    )}

                    {renderTimeLineElement(
                        'Cách làm món ăn',
                        data.data.createdBy.fullname,
                        data.data.making,
                        <PiCookingPot />,
                    )}

                    {renderTimeLineElement(
                        'Thưởng thức',
                        data.data.createdBy.fullname,
                        data.data.enjoy,
                        <FaRegFaceGrinBeamSweat />,
                    )}

                    {renderTimeLineElement(
                        'Quán ăn',
                        data.data.createdBy.fullname,
                        data.data.restaurant,
                        <MdOutlineRestaurant />,
                    )}
                </VerticalTimeline>
            </div>
        </div>
    );
};

export default FoodDetail;
