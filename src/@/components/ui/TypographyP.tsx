import React from "react";

export function TypographyP({children, className}: {children: React.ReactNode, className?:string}) {
    return (
      <p className={`leading-7 ${className}`}>
        {children}
      </p>
    )
  }