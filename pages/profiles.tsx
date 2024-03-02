import useCurrentUser from "@/hooks/useCurrentUser";
import type { NextPage, NextPageContext } from "next";
import {getSession, signOut} from "next-auth/react"
import {useRouter} from "next/router"

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



const Profiles = () => {
    const router = useRouter();
    const {data:user} = useCurrentUser()
    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-white text-3xl md:text-6xl text-center">Who is watching ?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div className="" onClick={()=>{router.push('/')}}>
                        <div className="group flex-row w-20 sm:w-44 mx-auto">
                            <div className="
                            w-20 sm:w-44
                            h-20 sm:h-44
                            rounded-md
                            flex
                            items-center
                            justify-center
                            border-2
                            border-transparent
                            overflow-hidden
                            group-hover:cursor-pointer
                            group-hover:border-white
                            transition">
                                <img src="/images/default-red.png" alt="Profiles"></img>
                                
                            </div>
                            <div className="mt-4 
                            text-gray-400 
                            text-center 
                            text-2xl 
                            transition 
                            group-hover:text-white
                            group-hover:cursor-pointer">
                                {user?.name}
                            </div>
                            

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profiles