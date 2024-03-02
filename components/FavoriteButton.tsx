import axios from "axios";
import React, { useCallback } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";


interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton : React.FC<FavoriteButtonProps> = ({ movieId}) => {
    const { mutate: mutateFavorites } = useFavorites()
    const { data: currentUser, mutate} = useCurrentUser()

    const isFavorite = React.useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(movieId)

    },[currentUser, movieId])

    const toggleFavorites = useCallback(async () => {

        try {

        console.log("isfavorite:",isFavorite)
        console.log("movieId",movieId)

        let response;

        if(isFavorite){
            response = await axios.delete('/api/favorite', {data : {movieId}})
        } else {
            console.log("is favorite: else", movieId)
            response = await axios.post('/api/favorite', {movieId});
        }

        const updatedFavoriteIds = response?.data?.favoriteIds

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        })


        mutateFavorites();
    }catch(error){
        console.error("Error Toggling Favorites:", error)
    }
    },[movieId, isFavorite, currentUser, mutate, mutateFavorites,])

    const Icon = isFavorite ? FaCheck : FaPlus

    return (
        <div 
        onClick = {()=>{toggleFavorites()}}
        className="cursor-pointer group/item
        w-4
        h-4
        sm:w-6
        sm:h-6
        md:w-10
        md:h-10
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-neutral-300">
            <Icon className="text-white" size={10}/>


        </div>
    )


}

export default FavoriteButton