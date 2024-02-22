interface HeadingProps{
    title:string,
    description:string
}
const Heading:React.FC<HeadingProps> = ({title,description}) => {
  return (
   <div>
    <h1 className="text-2xl font-semibold">{title}</h1>
    <p className="font-sm">{description}</p>
   </div>
  )
}

export default Heading