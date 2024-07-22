import React, { memo, useEffect, useState } from 'react';



const Thinklink = () => {
return (
        
        <div className="flex flex-col gap-4 pb-4 w-full h-screen">
            <iframe
                className="w-full h-full aspect-video border-4 border-gray-600 rounded-xl overflow-hidden"
                src="https://www.thinglink.com/view/scene/1870908140518638436"
                title="Thuyết trình về món Bánh canh Bến Có"
                frameBorder="0"
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                // allow="webkitallowfullscreen; mozallowfullscreen ;allowfullscreen"
                // allowFullScreen
            ></iframe>
            {/* <iframe width="960" height="1374" data-original-width="1080" data-original-height="1546"  type="text/html" style="border: none;" webkitallowfullscreen mozallowfullscreen allowfullscreen scrolling="no"></iframe>
            <script async src="//cdn.thinglink.me/jse/responsive.js"></script> */}
            {/* <iframe width="960" height="1374" data-original-width="1080" data-original-height="1546" src="https://www.thinglink.com/view/scene/1870908140518638436" type="text/html" style="border: none;" webkitallowfullscreen mozallowfullscreen allowfullscreen scrolling="no"></iframe><script async src="//cdn.thinglink.me/jse/responsive.js"></script> */}
        </div>
        
    );
};

export default Thinklink;

// Thinklink.displayName = 'Thinklink';

