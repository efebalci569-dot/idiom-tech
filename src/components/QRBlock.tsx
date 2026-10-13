import QRCode from 'react-qr-code';
import { QrCode } from 'lucide-react';
import { QR_CAPTION, SITE_URL } from '../config/site';

/**
 * QR access block. The code is generated from SITE_URL at render time, so
 * updating the deployed address in src/config/site.ts and rebuilding is all
 * it takes to refresh the QR code. While the real address is unknown, a
 * placeholder notice is shown instead of a fake QR code.
 */
export default function QRBlock() {
  if (!SITE_URL) {
    return (
      <div className="qr-pending">
        <QrCode size={28} aria-hidden="true" />
        <p style={{ fontWeight: 700, marginTop: '0.5rem' }}>QR code coming after publishing</p>
        <p style={{ fontSize: '0.92rem' }}>
          Once {`Idiom-Tech`} is published at its real public address, a QR code
          will appear here so exhibition visitors can open the site with their
          phones. See README for the publishing steps.
        </p>
      </div>
    );
  }

  return (
    <figure className="qr-frame">
      <QRCode value={SITE_URL} size={168} aria-label={`QR code linking to ${SITE_URL}`} />
      <figcaption>{QR_CAPTION}</figcaption>
    </figure>
  );
}
