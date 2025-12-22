import ExportedImage from 'next-image-export-optimizer';
import Link from 'next/link';
import Logo from '@/public/images/logo.png';

export default function NotFound() {
    return (
        <div className="h-full flex flex-col items-center">
            <div className="mx-auto my-auto flex flex-col items-center">
                <ExportedImage
                    src={Logo}
                    alt="Logo Pfadfinder Wehr"
                    width={220}
                    className="-ml-8"
                />
                <div className="prose dark:prose-invert mt-4 text-center max-w-none">
                    <h1 className="">Fehler 404 - Pfad nicht gefunden</h1>
                    <p>
                        Oh nein! Wir haben nicht gefunden wonach du gesucht hast. Machmal passiert
                        das selbst uns. Möglicherweise ist der Link falsch oder die Seite wurde
                        entfernt. Bitte überprüfe die URL und versuch es erneut. Vielen Dank!
                    </p>
                    <Link href="/">Hier gehts zurück zur Startseite</Link>
                </div>
            </div>
        </div>
    );
}
