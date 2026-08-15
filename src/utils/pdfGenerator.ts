import { jsPDF } from 'jspdf';

export const generateBrochurePDF = () => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Color Palette Definitions
    const black = '#111111';
    const red = '#E31B23';
    const offwhite = '#FFFFFF';
    const concrete = '#E5E5E5';
    const lightbox = '#F8F8F8';
    const textgray = '#444444';
    const lighttext = '#777777';

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const colors = {
      black: hexToRgb(black),
      red: hexToRgb(red),
      offwhite: hexToRgb(offwhite),
      concrete: hexToRgb(concrete),
      lightbox: hexToRgb(lightbox),
      textgray: hexToRgb(textgray),
      lighttext: hexToRgb(lighttext),
    };

    // ==========================================
    // PAGE 1: COVER PAGE
    // ==========================================
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, 'F');

    // Top Red Accent Bar
    doc.setFillColor(colors.red.r, colors.red.g, colors.red.b);
    doc.rect(10, 10, 190, 4, 'F');

    // Outer Framing Box
    doc.setDrawColor(colors.concrete.r, colors.concrete.g, colors.concrete.b);
    doc.setLineWidth(0.4);
    doc.rect(10, 10, 190, 277, 'S');

    // Brand Logo: SECOND (Black) + DESK (Red) as one single word SECONDESK
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(36);
    const secondWidth = doc.getTextWidth('SECOND');
    const deskWidth = doc.getTextWidth('DESK');
    const logoStartX = (210 - (secondWidth + deskWidth)) / 2;

    doc.setTextColor(colors.black.r, colors.black.g, colors.black.b);
    doc.text('SECOND', logoStartX, 72);
    doc.setTextColor(colors.red.r, colors.red.g, colors.red.b);
    doc.text('DESK', logoStartX + secondWidth, 72);

    // Accent Horizontal Line in Red
    doc.setDrawColor(colors.red.r, colors.red.g, colors.red.b);
    doc.setLineWidth(1.5);
    doc.line(30, 82, 180, 82);

    // Subtitle
    doc.setTextColor(colors.black.r, colors.black.g, colors.black.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('PREMIUM WORKSPACE PORTFOLIO', 105, 96, { align: 'center' });

    // Luxury Divider Detail
    doc.setDrawColor(colors.concrete.r, colors.concrete.g, colors.concrete.b);
    doc.setLineWidth(0.5);
    doc.line(95, 110, 115, 110);

    // Description Copy
    doc.setTextColor(colors.textgray.r, colors.textgray.g, colors.textgray.b);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const introText = [
      'Bespoke coworking spaces, executive private offices,',
      'state-of-the-art boardrooms, and custom enterprise layouts',
      'crafted for elite focus and professional excellence.'
    ];
    doc.text(introText, 105, 126, { align: 'center', lineHeightFactor: 1.6 });

    // Core Pillars Section
    const pillars = [
      { title: 'PRISTINE DESIGN', desc: 'Spatially-optimized, high-end hospitality aesthetics.' },
      { title: 'UNINTERRUPTED FOCUS', desc: 'HEPA air filtration, premium soundproofing & 100% power backup.' },
      { title: 'ELITE HOSPITALITY', desc: 'Complimentary single-origin Kenyan espresso & dedicated concierge.' }
    ];

    let pillarY = 175;
    pillars.forEach((p) => {
      doc.setFillColor(colors.red.r, colors.red.g, colors.red.b);
      doc.rect(30, pillarY - 4, 3.5, 3.5, 'F');

      doc.setTextColor(colors.black.r, colors.black.g, colors.black.b);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(p.title, 39, pillarY);

      doc.setTextColor(colors.lighttext.r, colors.lighttext.g, colors.lighttext.b);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(p.desc, 39, pillarY + 5.5);

      pillarY += 21;
    });

    // Footer Line
    doc.setTextColor(colors.lighttext.r, colors.lighttext.g, colors.lighttext.b);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('MOMBASA, KENYA  |  LINKS ROAD, NYALI (LOCATED ABOVE SECOND CUP CAFE ON THE 2ND FLOOR)  |  WWW.SECONDESK.KE', 105, 268, { align: 'center' });


    // ==========================================
    // PAGE 2: OFFICIAL PRICE LIST & WORKSPACE PACKAGES
    // ==========================================
    doc.addPage();
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, 'F');

    // Top Red Accent Bar
    doc.setFillColor(colors.red.r, colors.red.g, colors.red.b);
    doc.rect(10, 10, 190, 4, 'F');

    // Outer Framing Box
    doc.setDrawColor(colors.concrete.r, colors.concrete.g, colors.concrete.b);
    doc.setLineWidth(0.4);
    doc.rect(10, 10, 190, 277, 'S');

    // Black Title Block
    doc.setFillColor(colors.black.r, colors.black.g, colors.black.b);
    doc.rect(15, 16, 180, 24, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('OFFICIAL PRICE LIST & AVAILABLE PACKAGES', 23, 31);

    // Sub-header under Header
    doc.setTextColor(colors.textgray.r, colors.textgray.g, colors.textgray.b);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(
      'All rates listed below exclude 16% VAT. Shared Co-Working Space available on flexible terms; Private Office Suites require a minimum 6-month rental duration.',
      15,
      47,
      { maxWidth: 180, lineHeightFactor: 1.3 }
    );

    const packages = [
      {
        title: '01. Private Office Suites (Only Private Spaces)',
        badge: 'MIN 6-MONTH TERM',
        details: [
          'Minimum Rental Duration: 6 Months (Mandatory Management Policy)',
          'Small Office Suite (11 sqm) — KES 45,000 / month',
          'Medium Office Suite (14 sqm) — KES 55,000 / month',
          'Large Office Suite (25 sqm) — KES 65,000 / month'
        ]
      },
      {
        title: '02. Meeting Room (Max 4 Guests)',
        badge: 'HOURLY PASSES',
        details: [
          'Hourly Rate — KES 1,500 / hr',
          'Half Day Pass — KES 5,000 | Full Day Pass — KES 8,000'
        ]
      },
      {
        title: '03. Executive Boardroom (Max 10 Guests)',
        badge: 'HOURLY / HALF-DAY / FULL-DAY',
        details: [
          'Hourly Rate — KES 2,000 / hr',
          'Half Day — KES 8,000 | Full Day — KES 12,000'
        ]
      },
      {
        title: '04. Shared Co-Working Space',
        badge: 'FLEXIBLE PASSES',
        details: [
          'Monthly Shared Seat — KES 17,000 / month',
          'Full Day Shared Seat Pass — KES 1,700 / day',
          'Half Day Shared Seat Pass — KES 1,200 / half-day',
          'Includes: Seats at long tables in common area, fast dedicated internet, one complimentary hot beverage per stay.'
        ]
      },
      {
        title: '05. Printing, Copying & Add-on Services',
        badge: 'DOCUMENT SERVICES',
        details: [
          'Black & White Printing / Copying — KES 15 / page',
          'Color Printing / Copying — KES 50 / page',
          'High-Resolution Document Scanning — Complimentary for all registered members'
        ]
      }
    ];

    let solY = 58;
    packages.forEach((pkg) => {
      // Separator Line
      doc.setDrawColor(colors.concrete.r, colors.concrete.g, colors.concrete.b);
      doc.setLineWidth(0.4);
      doc.line(15, solY, 195, solY);

      // Title
      doc.setTextColor(colors.black.r, colors.black.g, colors.black.b);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.text(pkg.title, 15, solY + 6);

      // Badge Text in Red
      doc.setTextColor(colors.red.r, colors.red.g, colors.red.b);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(pkg.badge, 195, solY + 6, { align: 'right' });

      // Details
      doc.setTextColor(colors.textgray.r, colors.textgray.g, colors.textgray.b);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);

      let bulletY = solY + 12;
      pkg.details.forEach((bullet) => {
        // Red Dash Icon
        doc.setFillColor(colors.red.r, colors.red.g, colors.red.b);
        doc.rect(17, bulletY - 2, 2.5, 0.8, 'F');
        
        const splitBullet = doc.splitTextToSize(bullet, 170);
        doc.text(splitBullet, 22, bulletY);
        bulletY += (splitBullet.length * 4.2);
      });

      solY = bulletY + 3;
    });

    // Page 2 Footer
    doc.setTextColor(colors.lighttext.r, colors.lighttext.g, colors.lighttext.b);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('PAGE 2  |  SECONDESK OFFICIAL RATES & PACKAGES', 15, 282);


    // ==========================================
    // PAGE 3: LOCATION & BOOKING INFORMATION
    // ==========================================
    doc.addPage();
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, 'F');

    // Top Red Accent Bar
    doc.setFillColor(colors.red.r, colors.red.g, colors.red.b);
    doc.rect(10, 10, 190, 4, 'F');

    // Outer Framing Box
    doc.setDrawColor(colors.concrete.r, colors.concrete.g, colors.concrete.b);
    doc.setLineWidth(0.4);
    doc.rect(10, 10, 190, 277, 'S');

    // Black Title Block
    doc.setFillColor(colors.black.r, colors.black.g, colors.black.b);
    doc.rect(15, 16, 180, 24, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('HEADQUARTERS LOCATION & CONTACT DETAILS', 23, 31);

    // Description
    doc.setTextColor(colors.textgray.r, colors.textgray.g, colors.textgray.b);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text('Visit our flagship center situated on Links Road, Nyali (located above Second Cup Cafe on the 2nd floor).', 15, 48);

    const locationCard = {
      title: 'SECONDESK Nyali Executive Hub',
      address: 'Links Road, Nyali (located above Second Cup Cafe on the 2nd floor)',
      phone: '0719688992',
      email: 'info@secondesk.ke',
      features: [
        'Prime location on Links Road with immediate access to commercial amenities.',
        'Dedicated executive boardrooms, soundproof meeting rooms, and office suites.',
        'Fast dedicated internet with dual backup generators.',
        'Enclosed private offices, meeting rooms, and shared co-working space.'
      ]
    };

    let locY = 56;

    doc.setFillColor(colors.lightbox.r, colors.lightbox.g, colors.lightbox.b);
    doc.rect(15, locY, 180, 95, 'F');
    doc.setDrawColor(colors.concrete.r, colors.concrete.g, colors.concrete.b);
    doc.rect(15, locY, 180, 95, 'S');

    // Red Strip on Left
    doc.setFillColor(colors.red.r, colors.red.g, colors.red.b);
    doc.rect(15, locY, 3, 95, 'F');

    doc.setTextColor(colors.black.r, colors.black.g, colors.black.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(locationCard.title, 23, locY + 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(colors.lighttext.r, colors.lighttext.g, colors.lighttext.b);
    doc.text(`Address: ${locationCard.address}`, 23, locY + 17);
    doc.text(`Phone: ${locationCard.phone}  |  Email: ${locationCard.email}`, 23, locY + 23);
    doc.text('Operating Hours: Mon - Fri (8:00 AM - 8:00 PM), Sat (9:00 AM - 6:00 PM), Sun (Closed)', 23, locY + 29);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(colors.black.r, colors.black.g, colors.black.b);
    doc.text('Key Amenities & Location Benefits:', 23, locY + 39);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(colors.textgray.r, colors.textgray.g, colors.textgray.b);
    let locFeatureY = locY + 46;
    locationCard.features.forEach((feat) => {
      doc.setFillColor(colors.red.r, colors.red.g, colors.red.b);
      doc.rect(24, locFeatureY - 2, 2.5, 0.8, 'F');
      const splitFeat = doc.splitTextToSize(feat, 160);
      doc.text(splitFeat, 29, locFeatureY);
      locFeatureY += (splitFeat.length * 4.5);
    });

    // Infrastructure Card
    doc.setFillColor(colors.black.r, colors.black.g, colors.black.b);
    doc.rect(15, 168, 180, 52, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('UNCOMPROMISING INFRASTRUCTURE AS STANDARD', 23, 179);

    doc.setTextColor(230, 230, 230);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const infrastructureBullets = [
      '• Fast dedicated internet with symmetrical redundant backup array.',
      '• 100% full electricity backup generator systems with automatic ATS failover.',
      '• Biometric keycard security integration and CCTV surveillance.',
      '• Fully-serviced reception lounge, high-end boardrooms, and executive facilities.',
      '• Fresh coffee & tea bar with direct service from Second Cup downstairs.'
    ];
    doc.text(infrastructureBullets, 23, 188, { lineHeightFactor: 1.5 });

    // Contact CTA Box
    doc.setDrawColor(colors.red.r, colors.red.g, colors.red.b);
    doc.setLineWidth(0.8);
    doc.rect(15, 228, 180, 36, 'S');

    doc.setTextColor(colors.red.r, colors.red.g, colors.red.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('BOOK A SPATIAL TOUR OR RESERVE YOUR SPACE', 23, 237);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(colors.textgray.r, colors.textgray.g, colors.textgray.b);
    doc.text([
      'Call our Mombasa community team directly to book a site inspection, test a day pass,',
      'or request a customized enterprise office package for your business team.'
    ], 23, 243, { lineHeightFactor: 1.3 });

    doc.setTextColor(colors.black.r, colors.black.g, colors.black.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('Phone / WhatsApp: 0719688992  |  Email: info@secondesk.ke', 23, 257);

    doc.setTextColor(colors.lighttext.r, colors.lighttext.g, colors.lighttext.b);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('Developed by KKDES', 195, 257, { align: 'right' });

    // Page 3 Footer
    doc.setTextColor(colors.lighttext.r, colors.lighttext.g, colors.lighttext.b);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('PAGE 3  |  SECONDESK CORPORATE PORTFOLIO', 15, 282);

    // Single Clean Download Trigger
    try {
      doc.save('Brochure.pdf');
    } catch (e) {
      console.warn('Standard doc.save failed, triggering blob link fallback', e);
      const pdfBlob = doc.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        try {
          document.body.removeChild(link);
          URL.revokeObjectURL(blobUrl);
        } catch (err) {}
      }, 4000);
    }
  } catch (err) {
    console.error('Failed to generate PDF', err);
  }
};
