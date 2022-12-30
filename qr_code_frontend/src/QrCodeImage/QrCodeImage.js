import React, { useEffect } from 'react';
import QRCode from 'qrcode';

export default function QrCodeImage({ qr, setQr, url, qrSettings, showDownloadButton }) {
  const { size, border, foregroundColor, backgroundColor } = qrSettings;
  useEffect(() => {
    url && generateQRCode();
  });

  const generateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: size,
        margin: border,
        color: {
          dark: foregroundColor,
          light: backgroundColor
        }
      },
      (err, url) => {
        if (err) return console.error(err);
        setQr(url);
      }
    );
  };

  return (
    <div>
      {qr && url && <img src={qr} alt='qr code' />}
      {showDownloadButton && qr && url && (
        <button>
          <a style={style.download} href={qr} download='qrcode.png'>
            Download
          </a>
        </button>
      )}
    </div>
  );
}

const style = {
  download: {
    textDecoration: 'none',
    color: 'inherit'
  }
};
