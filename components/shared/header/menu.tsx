import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EllipsisVertical, ShoppingCartIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import ModeToggle from "./mode-toggle";

const Menu = () => {
    return (
        <div className='flex justify-end gap-3'>
            <nav className='hidden md:flex w-full max-w-xs gap-1'>
                <ModeToggle/>
                <Button variant="ghost" asChild>
                    <Link href="/cart" className="flex items-center gap-2">
                        <ShoppingCartIcon className="h-5 w-5" />
                        <span>Cart</span>
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/sign-in" className="flex items-center gap-2">
                        <UserIcon className="h-5 w-5" />
                        <span>Sign in</span>
                    </Link>
                </Button>
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
                            <ModeToggle/>
                            <Button variant="ghost" asChild>
                                <Link href="/cart" className="flex items-center gap-2">
                                    <ShoppingCartIcon className="h-5 w-5" />
                                    <span>Cart</span>
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href="/sign-in" className="flex items-center gap-2">
                                    <UserIcon className="h-5 w-5" />
                                    <span>Sign in</span>
                                </Link>
                            </Button>
                        </div>
                        <SheetDescription></SheetDescription>
                    </SheetContent>
                </nav>
            </Sheet>
        </div>
    )
}

export default Menu;