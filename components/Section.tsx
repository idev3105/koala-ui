export type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  subTitle?: string
  childrenClassName?: string
}

export default function Section({
  children,
  className,
  childrenClassName,
  title,
  subTitle,
}: SectionProps) {
  return (
    <div className={`${className}`}>
      <div className="title ml-4">{title}</div>
      {subTitle && <div className="sub-title ml-2">{subTitle}</div>}
      <div className={`mt-2 w-full ${childrenClassName}`}>{children}</div>
    </div>
  )
}
