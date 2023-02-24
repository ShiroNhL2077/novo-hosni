import React from "react";
import './banner.css'
import video from '../../assets/video.mp4'

export default function Banner() {
  return (
    <>
      <div className="warning bg-black text-light">
        <p>
          WARNING: This product contains nicotine.<br />Nicotine is an addictive chemical.
        </p>
      </div>
      <div className="top-video d-md-block">
        <video
        width={"100%"}
        
          autoPlay
          loop
          muted
          playsInline
          preload="true"
          poster="../../assets/poster.jpg"
        >

          <source src={video} />
        </video>
        {/* <video  
          autoPlay
          loop
          muted
          playsInline
          preload="true"  controls >
      <source src={video} type="video/mp4"/>
</video> */}
      </div>
    </>
  );
}
