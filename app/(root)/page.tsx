import ProductList from '@/components/shared/product/product-list'
import { getLatestProducts, getFeaturedProducts } from '@/lib/actions/product.actions'
import ProductCarousel from '@/components/shared/product/product-carousel'
import ViewAllProductsButton from '@/components/view-all-products-button'
import IconBoxes from '@/components/icon-boxes'
import DealCountDown from '@/components/deal-countdown'
import ShopBenefitSection from '@/components/sections/find-by-benefit'
import MissionSection from '@/components/sections/mission'
import Hero from '@/components/sections/hero'
const Homepage = async () => {
  const latestProducts = await getLatestProducts()
  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      <Hero/>
      <ShopBenefitSection/>
      {featuredProducts.length > 0 && <ProductCarousel data={featuredProducts} />}
      <ProductList data={latestProducts} title='Newest Arrivals' />
      <MissionSection />
      <ViewAllProductsButton />
      <DealCountDown />
      <IconBoxes />
    </>
  )
}

export default Homepage
