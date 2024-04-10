import ReactPlayer from 'react-player';
import sampleVideo from '/video/41.mp4'; // Importe la vidéo

export default function SliderVideo() {
    return (
        <div className='w-full h-auto'>
          <ReactPlayer
            url={"https://res.cloudinary.com/dtpee8p4w/video/upload/v1712183969/41_jk91xo.mp4"} // Utilise la vidéo importée
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
