import type { NextPage, NextPageContext } from "next";
import {getSession} from "next-auth/react"
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/InfoModal";

import styles from "../styles/Home.module.css";
import useMoviesList from "@/hooks/useMoviesList";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";


export async function getServerSideProps (context: NextPageContext){
  const session = await getSession(context);
  if(!session){
    return {
    redirect: {
      destination: '/auth',
      permanent: false,
    }
    }
  }

  return {
    props: {}
  }



}


export default function Home() {

    const { data: movies = []} = useMoviesList()
    const { data : favorites = []} = useFavorites()
    const { isOpen, closeModal } = useInfoModal()




  return(
    <div className="flex flex-col">
      <InfoModal 
      visible = {isOpen}
      onClose = {closeModal}
       />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList 
        title = "Trending now"
        data = {movies}
      
        />
        <MovieList 
        title = "My list"
        data = {favorites}
      
        />
      </div>
      
      


    </div>

  )

  
}
