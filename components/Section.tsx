'use client'

export type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  subTitle?: string
  childrenClassName?: string
  onClickSeeAll?: () => void
}

export default function Section({
  children,
  className,
  childrenClassName,
  title,
  subTitle,
  onClickSeeAll,
}: SectionProps) {
  return (
    <div className={`${className}`}>
      <div className="title ml-4">{title}</div>
      {subTitle && <div className="sub-title ml-4">{subTitle}</div>}
      {/* TODO: this is hard code, use i18n instead of  */}
      <div
        className="link ml-4 cursor-pointer underline"
        onClick={() => onClickSeeAll && onClickSeeAll()}
      >
        See All
      </div>
      <div className={`mt-2 w-full ${childrenClassName}`}>{children}</div>
    </div>
  )
}
