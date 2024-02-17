import prismaDb from "@/lib/prismaDb"

interface DashboardPageProps{
  params:{storeId:string}
}
const page:React.FC<DashboardPageProps> =async({params}) => {
  const store = await prismaDb.store.findFirst({
    where:{
      id :params.storeId
    }
  })
  return (
    <div>Active Store : {store?.name}
    </div>
  )
}

export default page