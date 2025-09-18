'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

const MetaPixel = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  useEffect(() => {
    if (!pixelId) return

    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(pixelId)
        ReactPixel.pageView()
      })
  }, [pathname, searchParams, pixelId])

  if (!pixelId) {
    console.warn("Meta Pixel ID is not set. Tracking is disabled.");
    return null;
  }

  return (
    <Script id="fb-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `}
    </Script>
  )
}

export default MetaPixel