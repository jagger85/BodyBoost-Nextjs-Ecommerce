import { APP_NAME } from "@/lib/constants";
import { Facebook, Instagram, Youtube, Mail, Phone } from "lucide-react";
import Image from "next/image";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="footer" className="border-t bg-black p-6">
            <div className="max-w-7xl mx-auto py-8 pb-0 px-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div>
                        <Image src='/images/logo-3.png' alt='brand logo' width={200} height={50}/>
                        <p className="text-muted-foreground text-sm mt-4">
                        Empowering you to move stronger, recover faster, and live healthier—because your potential is limitless.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm hover:underline">About Us</a></li>
                            <li><a href="#" className="text-sm hover:underline">Blog</a></li>
                            <li><a href="#" className="text-sm hover:underline">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="font-bold mb-4">Get to know us</h3>
                        <div className="space-y-2">
                            <a href="tel:#" className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4" />
                                <span>+91 9870559859</span>
                            </a>
                            <a href="mailto:#" className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4" />
                                <span>care@example.com</span>
                            </a>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="font-bold mb-4">Stay updated with us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="hover:opacity-80">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:opacity-80">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:opacity-80">
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className=" text-center text-sm text-muted-foreground">
                    © {currentYear} {APP_NAME}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;