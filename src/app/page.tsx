import { HomeClient } from '@/components/home/HomeClient'
import { HeroSection } from '@/components/hero/HeroSection'
import { TrustSection } from '@/components/hero/TrustSection'
import { MenuCategories } from '@/components/catalog/MenuCategories'
import { CatalogGrid } from '@/components/catalog/CatalogGrid'
import { DeliveryPayment } from '@/components/common/DeliveryPayment'
import { CTASection } from '@/components/common/CTASection'
import { StructuredData } from '@/components/seo/StructuredData'

export default function Home() {
  return (
    <>
      <StructuredData />
      <HomeClient>
        <HeroSection />
        <TrustSection />
        <MenuCategories />
        <CatalogGrid />
        <DeliveryPayment />
        <CTASection />
      </HomeClient>
    </>
  )
}
