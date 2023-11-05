import ExportedImage from 'next-image-export-optimizer';
import Link from 'next/link';
import {
    IoLogoInstagram as Instagram,
    IoLogoFacebook as Facebook,
} from 'react-icons/io5'

import dpsgLogo from '@/public/dpsg.svg'

function SocialLink({children, url, hoverColor} : {children: React.ReactNode, url: string, hoverColor: string}) {
    return (
        <Link href={url} target='_blank'>
            <div className={`text-white ${hoverColor} text-2xl ml-4`}>
                {children}
            </div>
        </Link>
    )
}

function FacebookLink() {
    return (
        <SocialLink url="https://de-de.facebook.com/dpsgwehr/" hoverColor="hover:text-blue-600">
            <Facebook />
        </SocialLink>
    )
}

function InstagramLink() {
    return (
        <SocialLink url="https://www.instagram.com/pfadfinder_wehr/" hoverColor='hover:text-pink-600'>
            <Instagram />
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