import React from 'react';
import 'video.js/dist/video-js.css';

function chapitrage(props) {
   
    console.log("Verif" + props)

    return (
        <div className="relative w-full">
            {/* Effet de fondu pour indiquer le scroll */}
            <div
                className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white via-transparent to-transparent pointer-events-none"></div>
            <div
                className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white via-transparent to-transparent pointer-events-none"></div>

            {/* Conteneur scrollable */}
            <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide relative">
                <div className="flex space-x-4 p-2">
                    {props.Chapters.map((chapter, index) => (
                        <button
                            key={index}
                            className="px-4 py-2 bg-white text-black border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition"
                            onClick={() => props.playerRef.current.currentTime(parseInt(chapter['pos']))}
                        >
                            {chapter.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default chapitrage;