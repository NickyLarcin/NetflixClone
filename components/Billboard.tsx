import useBillboard from "@/hooks/useBillboard";
import React from "react";

import { LuInfo } from "react-icons/lu";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard = () => {

    const { data : data } = useBillboard();
    const { openModal } = useInfoModal()

    const handleOpenModal = React.useCallback(()=>{
        openModal(data?.id);

    },[openModal, data?.id])

    
    return (

        <div className="relative h-[56.25vw]">
            <video 
            className = "w-full h-[56.25vw] object-cover brightness-[60%]"
            autoPlay
            muted 
            loop
            src = {data?.videoUrl} 
            poster={data?.thumbnailUrl}
            
            ></video>

            <div className="absolute top-[40%] sm:top-[60%] md:top-[60%] ml-4 md:ml-16">
                <p className="text-white text-1xl sm:text-2xl md:text-4xl h-full w-[50%] 
                lg:text-6xl font-bold drop-shadow-xl">
                    {data?.title}
                </p>
                <p className="text-white
                text-[12px]
                sm:text-md
                md:text-lg
                sm:mt-3
                md:mt-8
                w-[90%]
                md:w-[90%]
                lg:w-[50%]
                drop-shadow-xl ">
                    {data?.description}
                </p>
                <div className="flex flex-row items-center mt-3 md:mt-3 gap-3">
                    <PlayButton movieId={data?.id} />
                    <button 
                    onClick={handleOpenModal}
                    className="bg-white text-white bg-opacity-30
                    rounded-md
                    py-1 md:py-2
                    px-2 md:px-4
                    w-auto
                    text-xs lg:text-lg
                    font-semibold
                    flex-row
                    flex
                    items-center
                    hover:bg-opacity-20
                    transition">
                        <LuInfo className="mr-1 text-xs md:text-lg" />
                        More Info
                        
                    </button>
                </div>
            </div>

        </div>
    )

}

export default Billboard

