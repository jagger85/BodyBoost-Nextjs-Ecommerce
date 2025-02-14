import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react"
import { Card, CardContent } from "./ui/card"


const IconBoxes = () => {
    return ( 
        <div className="wrapper mb-6">
            <Card>
                <CardContent className="grid md:grid-cols-4 gap-4 p-4">
                    <div className="space-y-2">
                        <ShoppingBag/>
                        <div className="text-sm font-bold">Free Shipping</div>
                        <div className="text-sm text-muted-foregroud">
                            Free shipping on orders above 100$
                        </div>
                    </div>
                    <div className="space-y-2">
                        <DollarSign/>
                        <div className="text-sm font-bold">Money Back Guarantee</div>
                        <div className="text-sm text-muted-foregroud">
                            Within 30 days of purchase
                        </div>
                    </div>
                    <div className="space-y-2">
                        <WalletCards/>
                        <div className="text-sm font-bold">Flexible Payment</div>
                        <div className="text-sm text-muted-foregroud">
                            Pay with credit card, Paypal or COD
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Headset/>
                        <div className="text-sm font-bold">24/7 Support</div>
                        <div className="text-sm text-muted-foregroud">
                            Get support at any time
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
     );
}
 
export default IconBoxes;