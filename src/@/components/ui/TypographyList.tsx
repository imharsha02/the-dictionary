export function TypographyList({children, className}:{children:React.ReactNode, className?:string}) {
    return (
      <ul className={`my-0 ml-6 list-disc [&>li]:mt-2 ${className}`}>
        {children}
      </ul>
    )
  }