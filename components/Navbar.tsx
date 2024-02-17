import { UserButton, auth } from "@clerk/nextjs"
import MainNav from "./MainNav"
import StoreSwitcher from "./StoreSwitcher"
import { redirect } from "next/navigation"
import prismaDb from "@/lib/prismaDb"

const Navbar = async() => {
  const {userId }= auth()
  if(!userId){
    redirect('/sign-in')
  }


  const stores = await prismaDb.store.findMany({
    where:{
      userId
    }
  })

  return (
    <div className="border-b flex items-center h-16 px-4 gap-2">
        <StoreSwitcher items={stores}/>
        <MainNav className="mx-6"/>
        <div className="ml-auto space-x-4 flex items-center">
            <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
  )
}

export default Navbar