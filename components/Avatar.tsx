import Image from 'next/image'

interface AvatarProps {
  src: string
  size?: 'small' | 'medium' | 'large'
  rounded?: 'small' | 'medium' | 'large' | 'full'
}

export default function Avatar({ src, size = 'medium', rounded }: AvatarProps) {
  var sizeClass = 'w-8'
  switch (size) {
    case 'small':
      sizeClass = 'w-6'
      break
    case 'medium':
      sizeClass = 'w-8'
      break
    case 'large':
      sizeClass = 'w-11'
      break
  }

  var roundClass = undefined
  switch (rounded) {
    case 'small':
      roundClass = 'rounded-sm'
      break
    case 'medium':
      roundClass = 'rounded-md'
      break
    case 'large':
      roundClass = 'rounded-lg'
      break
    case 'full':
      roundClass = 'rounded-full'
      break
  }

  return (
    <div className="avatar">
      <div className={`relative top-0 ${sizeClass} ${roundClass}`}>
        <Image src={src} alt="avatar" fill={true} />
      </div>
    </div>
  )
}
