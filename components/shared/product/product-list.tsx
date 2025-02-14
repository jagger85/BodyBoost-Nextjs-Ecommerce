import ProductCard from "./product-card";
import { Product } from "@/types";
const ProductList = ({data, title, limit}: {data: Product[]; title?: string; limit?: number}) => {
    const limitedData = limit ? data.slice(0, limit) : data
    return (
        <div className='wrapper-big my-10  mt-20'>
            <h2 className="text-5xl tracking-wider mb-4 text-center">{title}</h2>
            {data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {limitedData.map((product: Product) => (
                      <ProductCard key={product.slug} product={product}/>
                    ))}
                </div>
            ): (
                <div>
                <p>No products found</p>
                </div>
            )}
        </div>
    )
}

export default ProductList;