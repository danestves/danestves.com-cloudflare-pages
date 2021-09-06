// Internals
import { GeneralObserver } from '@/components/GeneralObserver'

interface CloudinaryProps {
  publicID: string
  cloudName: string
  fluid?: boolean
  controls?: boolean
  fullscreen?: boolean
  jumpControls?: boolean
  baseColor?: string
  accentColor?: string
  iconsTextColor?: string
  logoOnClickUrl?: string
  logoImageUrl?: string
  autoPlay?: boolean
  autoPlayOnScroll?: boolean
  loop?: boolean
  title?: string
  subtitle?: string
  muted?: boolean
  otherParams?: string
}

// More information about all settings here https://studio.cloudinary.com/
export const Cloudinary: React.FunctionComponent<CloudinaryProps> = ({
  publicID,
  cloudName,
  fluid = true,
  controls = true,
  fullscreen = true,
  jumpControls = true,
  baseColor,
  accentColor,
  iconsTextColor,
  logoOnClickUrl,
  logoImageUrl,
  autoPlay = false,
  autoPlayOnScroll,
  loop,
  title,
  subtitle,
  muted = false,
  otherParams,
}): JSX.Element => {
  const base = baseColor
    ? encodeURIComponent(baseColor)
    : encodeURIComponent('#000000')
  const accent = accentColor
    ? encodeURIComponent(accentColor)
    : encodeURIComponent('#FF620C')
  const color = iconsTextColor
    ? encodeURIComponent(iconsTextColor)
    : encodeURIComponent('#ffffff')
  const logoOnClick = logoOnClickUrl
    ? `&player%5Blogo_onclick_url%5D=${encodeURIComponent(logoOnClickUrl)}`
    : ''
  const logoImage = logoImageUrl
    ? `&player%5Blogo_image_url%5D=${logoImageUrl}`
    : ''
  const autoPlayMode = autoPlayOnScroll
    ? '&player%5Bautoplay_mode%5D=on-scroll'
    : '&source%5Bautoplay_on_scroll%5D=false'
  const encodedTitle = title ? encodeURIComponent(title) : ''
  const encodedSubtitle = subtitle ? encodeURIComponent(subtitle) : ''

  return (
    <GeneralObserver>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          height="480"
          src={`https://player.cloudinary.com/embed/?public_id=${publicID}&cloud_name=${cloudName}&player%5Bfluid%5D=${fluid}&player%5Bcontrols%5D=${controls}&player%5Bcontrol_bar%5D%5Bfullscreen_toggle%5D=${fullscreen}&player%5Bshow_jump_controls%5D=${jumpControls}&player%5Bmuted%5D=${muted}&player%5Bcolors%5D%5Bbase%5D=${base}&player%5Bcolors%5D%5Baccent%5D=${accent}&player%5Bcolors%5D%5Btext%5D=${color}${logoOnClick}&${logoImage}${autoPlayMode}&player%5Bautoplay%5D=${autoPlay}&player%5Bloop%5D=${loop}&source%5Binfo%5D%5Btitle%5D=${encodedTitle}&source%5Binfo%5D%5Bsubtitle%5D=${encodedSubtitle}${
            otherParams || ''
          }`}
          title={title || ''}
          width="640"
        />
      </div>
    </GeneralObserver>
  )
}

export default Cloudinary
