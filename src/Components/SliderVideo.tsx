import { useRef, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

export default function SliderVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const handleToggleSound = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted; // Inverse l'état muet
            setIsMuted(!isMuted);
            if (!isMuted) {
                videoRef.current.play(); // Appelle la méthode play() de l'élément vidéo
            }
        }
    };

    return (
        <div className='w-full h-auto relative'>
            <video
                ref={videoRef}
                src="https://res.cloudinary.com/dtpee8p4w/video/upload/v1716422866/Slider_Video_Aryas_io45on.mp4"
                width="100%"
                height="100%"
                controls={false}
                loop
                muted={isMuted} // Utilise l'état pour définir si la vidéo est muette
                autoPlay
                playsInline
            />
            <div className='absolute top-0 left-0 m-4'>
                <button 
                    onClick={handleToggleSound} 
                    className='bg-white text-black p-2 rounded-full flex items-center justify-center'>
                    {isMuted ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
                </button>
            </div>
        </div>
    );
}
