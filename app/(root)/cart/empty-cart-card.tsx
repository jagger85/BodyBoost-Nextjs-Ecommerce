import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

const EmptyCartCard = () => {
    return ( 
        <div className="flex items-center justify-center w-full h-full">
        <Card className="pattern-grid">
            <CardHeader className="space-y-4" >
                <Link href='/' className="flex-center">
                <div className="bg-black p-8 border border-1 border-background rounded-full">
                <ShoppingCartIcon size={80}/>
                </div>
                </Link>
                <CardTitle className="text-center text-primary">Your basket is empty</CardTitle>
                <CardDescription className="text-center">
                    Looks like you haven&lsquo;t added anything to your cart yet
                </CardDescription>
            </CardHeader>
            <CardContent>
            <Link href='/'>
            <div className="flex justify-center items-center bg-primary rounded-lg p-2 text-black gap-2 font-bold">
            Go Shopping
            </div>
            </Link>
            </CardContent>
        </Card>
    </div>
);
}
 
export default EmptyCartCard;