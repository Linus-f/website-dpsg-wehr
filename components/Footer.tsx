import ExportedImage from 'next-image-export-optimizer';
import Link from 'next/link';
import {
    IoLogoInstagram as Instagram,
    IoLogoFacebook as Facebook,
} from 'react-icons/io5'

import dpsgLogo from '@/public/dpsg.svg'

function SocialLink({children, url, hoverColor, label} : {children: React.ReactNode, url: string, hoverColor: string, label: string}) {
    return (
        <Link href={url} target='_blank' aria-label={label}>
            <div className={`text-white ${hoverColor} text-2xl ml-4`}>
                {children}
            </div>
        </Link>
    )
}

function FacebookLink() {
    return (
        <SocialLink url="https://de-de.facebook.com/dpsgwehr/" hoverColor="hover:text-blue-600" label="Facebook">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z"></path>
            </svg>
        </SocialLink>
    )
}

function InstagramLink() {
    return (
        <SocialLink url="https://www.instagram.com/pfadfinder_wehr/" hoverColor='hover:text-pink-600' label="Instagram">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M349.33 69.33a93.62 93.62 0 0 1 93.34 93.34v186.66a93.62 93.62 0 0 1-93.34 93.34H162.67a93.62 93.62 0 0 1-93.34-93.34V162.67a93.62 93.62 0 0 1 93.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"></path>
                <circle cx="377.33" cy="134.67" r="28"></circle>
                <path d="M256 181.33A74.67 74.67 0 1 1 181.33 256 74.75 74.75 0 0 1 256 181.33m0-37.33a112 112 0 1 0 112 112 112 112 0 0 0-112-112z"></path>
            </svg>
        </SocialLink>
    )
}

function SocialMedia() {
    return (
        <div className="w-full flex place-content-between content-center mt-10 mb-0">
            <p className="text-center text-white text-sm ml-4">
               © {new Date().getFullYear()} DPSG St. Bernhard Wehr    
            </p>
            <div className="flex place-content-end items-center mr-4">
                <InstagramLink />
                <FacebookLink />
            </div>
        </div>
    );
}

function FooterLink({ url, text, external = true } : {url: string, text: string, external?: boolean }) {
    return (
        <Link href={url} target={external ? "_blank" : ""} className='text-green-50 hover:underline text-sm mb-1'>
            {text}
        </Link>
    )
}

function FooterLinkColumn({title, children} : {title: string, children?: React.ReactNode, width?: string}) {
    return (
        <div className={`flex flex-col w-auto m-4 mb-0 sm:flex-1`}>
            <h1 className='font-semibold text-lg mb-2'>{title}</h1>
            {children}
        </div>
    )
}

function FooterDPSG() {
    return (
        <div className='md:flex-shrink-0 m-4 mb-0'>
            <h1 className='font-semibold text-lg mb-2'>DPSG</h1>
            <Link href="https://www.dpsg.de" target='_blank'>
                <ExportedImage
                    src={dpsgLogo}
                    alt="DPSG Logo"
                    width="224"
                    height="108"
                    className="bg-white w-full sm:w-56"
                />
            </Link>
        </div>
    )
}

function FooterMain() {
    return (
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-white ">
            <div className="flex-1 flex flex-row place-content-between">
                <FooterLinkColumn title="Hütten">
                    <FooterLink url="https://www.pfadfinderheim-st-raphael.de/" text="St. Raphael in Todtmoos" />
                    <FooterLink url="http://www.pfadfinderhaus-noeggenschwiel.de/" text="Pfadfinderhaus Nöggenschwiel" />
                </FooterLinkColumn>
                <FooterLinkColumn title="Sonstiges">
                    <FooterLink url="/pages/impressum" text="Impressum" external={false} />
                    <FooterLink url="/pages/datenschutz" text="Datenschutz" external={false} />
                    <FooterLink url="https://github.com/Linus-f/website-dpsg-wehr" text="Quellcode" />
                </FooterLinkColumn>
            </div>
            <FooterDPSG />
        </div>
    )
}

export default function Footer() {
    return (
        <footer className="bg-gray-800 pb-2 mt-14">
            <div className="max-w-sm sm:max-w-4xl px-3 flex flex-col justify-center mx-auto my-0">
                <FooterMain />
                <SocialMedia />
            </div>
        </footer>
    )
}