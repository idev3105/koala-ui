import Image from 'next/image'

interface AvatarProps {
  src: string
  size?: 'small' | 'medium' | 'large'
  rounded?: 'small' | 'medium' | 'large' | 'full'
}

const sizeClasses = {
  small: 'w-6',
  medium: 'w-8',
  large: 'w-11',
}

const roundClasses = {
  small: 'rounded-sm',
  medium: 'rounded-md',
  large: 'rounded-lg',
  full: 'rounded-full',
}

export default function Avatar({ src, size = 'medium', rounded }: AvatarProps) {
  const sizeClass = sizeClasses[size]
  const roundClass = rounded ? roundClasses[rounded] : ''

  return (
    <div className="avatar">
      <div className={`relative top-0 ${sizeClass} ${roundClass}`}>
        <Image src={src} alt="avatar" fill />
      </div>
    </div>
  )
}
