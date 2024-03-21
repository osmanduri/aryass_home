import ReactPlayer from 'react-player';
import sampleVideo from '/video/41.mp4'; // Importe la vidéo

export default function SliderVideo() {
    return (
        <div className='w-full h-auto'>
          <ReactPlayer
            url={sampleVideo} // Utilise la vidéo importée
            width='100%'
            height='100%'
            controls={false}
            loop={true}
            playing={true}
        />
        </div>
      );
}
