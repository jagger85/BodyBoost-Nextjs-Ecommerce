import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EllipsisVertical, ShoppingCartIcon } from "lucide-react";
import UserButton from "./user-button";
import Link from "next/link";

const Menu = () => {
    return (
        <div className='flex justify-end gap-3'>
            <nav className='hidden md:flex w-full max-w-xs gap-1'>
                
                <Button variant="ghost" asChild>
                    <Link href="/cart" className="flex items-center gap-2">
                        <ShoppingCartIcon className="h-5 w-5" />
                        <span>Cart</span>
                    </Link>
                </Button>
                <UserButton/>
            </nav>
            <Sheet>
                <nav className='md:hidden'>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <EllipsisVertical className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetTitle>Menu</SheetTitle>
                        <div className="flex flex-col gap-2 mt-4">
                         
                            <Button variant="ghost" asChild>
                                <Link href="/cart" className="flex items-center gap-2">
                                    <ShoppingCartIcon className="h-5 w-5" />
                                    <span>Cart</span>
                                </Link>
                            </Button>
                            <UserButton/>
                        </div>
                        <SheetDescription></SheetDescription>
                    </SheetContent>
                </nav>
            </Sheet>
        </div>
    )
}

export default Menu;