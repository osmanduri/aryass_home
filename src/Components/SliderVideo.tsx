import ReactPlayer from 'react-player';

export default function SliderVideo() {
    return (
        <div className='w-full h-auto'>
          <ReactPlayer
            url={"https://res.cloudinary.com/dtpee8p4w/video/upload/v1716422866/Slider_Video_Aryas_io45on.mp4"} // Utilise la vidéo importée
            width='100%'
            height='100%'
            controls={false}
            loop={true}
            playing={true}
            muted={false}
        />
        </div>
      );
}
