export function TypographyLarge({children, className}:{className?:string,children:React.ReactNode}) {
    return <div className={`text-lg font-semibold ${className}`}>{children}</div>
  }