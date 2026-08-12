import { jsPDF } from 'jspdf';

export const generateBrochurePDF = () => {
  // Create a new A4 document in portrait mode (210 x 297 mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // SECONDESK Official Color Palette Definitions
  const black = '#111111';
  const red = '#E31B23';
  const offwhite = '#FAFAF8';
  const concrete = '#E7E7E7';
  const darkgray = '#222222';

  // HELPER: Convert hex to RGB values
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
    darkgray: hexToRgb(darkgray),
  };

  // ==========================================
  // PAGE 1: COVER PAGE (SECONDESK Red & Black Theme)
  // ==========================================
  
  // Background: Full bleed Black
  doc.setFillColor(colors.black.r, colors.black.g, colors.black.b);
  doc.rect(0, 0, 210, 297, 'F');

  // Outer framing in SECONDESK Red
  doc.setDrawColor(colors.red.r, colors.red.g, colors.red.b);
  doc.setLineWidth(0.8);
  doc.rect(10, 10, 190, 277, 'S');

  // Logo Circle Emblem (SD)
  doc.setFillColor(colors.black.r, colors.black.g, colors.black.b);
  doc.setDrawColor(colors.red.r, colors.red.g, colors.red.b);
  doc.setLineWidth(1.2);
  doc.circle(105, 42, 14, 'FD');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('S', 98.5, 46.5);
  doc.setTextColor(colors.red.r, colors.red.g, colors.red.b);
  doc.text('D', 106.5, 46.5);

  // Logo / Brand Name: SECON (White) + DESK (Red)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(255, 255, 255);
  doc.text('S E C O N', 100, 70, { align: 'right' });
  doc.setTextColor(colors.red.r, colors.red.g, colors.red.b);
  doc.text('D E S K', 105, 70, { align: 'left' });

  // Accent horizontal line in Red
  doc.setDrawColor(colors.red.r, colors.red.g, colors.red.b);
  doc.setLineWidth(1.5);
  doc.line(30, 80, 180, 80);

  // Subtitle
  doc.setTextColor(colors.red.r, colors.red.g, colors.red.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('PREMIUM WORKSPACE PORTFOLIO', 105, 95, { align: 'center' });

  // Luxury Divider Detail
  doc.setDrawColor(colors.red.r, colors.red.g, colors.red.b);
  doc.setLineWidth(0.5);
  doc.line(90, 110, 120, 110);

  // Description copy
  doc.setTextColor(220, 220, 220);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const introText = [
    'Bespoke coworking spaces, executive private offices,',
    'state-of-the-art boardrooms, and custom enterprise layouts',
    'crafted for elite focus and professional excellence.'
  ];
  doc.text(introText, 105, 125, { align: 'center', lineHeightFactor: 1.6 });

  // Core Pillars Section
  const pillars = [
    { title: 'PRISTINE DESIGN', desc: 'Spatially-optimized, high-end hospitality aesthetics.' },
    { title: 'UNINTERRUPTED FOCUS', desc: 'HEPA air filtration, premium soundproofing & 100% power backup.' },
    { title: 'ELITE HOSPITALITY', desc: 'Complimentary single-origin Kenyan espresso & dedicated concierge.' }
  ];

  let pillarY = 175;
  pillars.forEach((p) => {
    // Draw tiny square accent in Red
    doc.setFillColor(colors.red.r, colors.red.g, colors.red.b);
    doc.rect(30, pillarY - 4, 3, 3, 'F');

    doc.setTextColor(colors.red.r, colors.red.g, colors.red.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(p.title, 38, pillarY);

    doc.setTextColor(230, 230, 230);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(p.desc, 38, pillarY + 5);

    pillarY += 20;
  });

  // Footer text
  doc.setTextColor(150, 150, 150);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('MOMBASA, KENYA  |  LINKS ROAD, NYALI (LOCATED ABOVE SECOND CUP CAFE ON THE 2ND FLOOR)  |  WWW.SECONDESK.KE', 105, 265, { align: 'center' });


  // ==========================================
  // PAGE 2: OFFICIAL PRICE LIST & WORKSPACE PACKAGES
  // ==========================================
  doc.addPage();

  // Background: Full bleed Off-white
  doc.setFillColor(colors.offwhite.r, colors.offwhite.g, colors.offwhite.b);
  doc.rect(0, 0, 210, 297, 'F');

  // Outer framing in Concrete
  doc.setDrawColor(colors.concrete.r, colors.concrete.g, colors.concrete.b);
  doc.setLineWidth(0.3);
  doc.rect(10, 10, 190, 277, 'S');

  // Header Title block (Black background + Red accent line)
  doc.setFillColor(colors.black.r, colors.black.g, colors.black.b);
  doc.rect(15, 15, 180, 25, 'F');
  doc.setFillColor(colors.red.r, colors.red.g, colors.red.b);
  doc.rect(15, 38, 180, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('OFFICIAL PRICE LIST & AVAILABLE PACKAGES', 25, 30);

  // Sub-header under Header
  doc.setTextColor(colors.black.r, colors.black.g, colors.black.b);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(
    'All rates listed below exclude 16% VAT. Shared Co-Working Space available on flexible terms; Private Office Suites require a minimum 6-month rental duration.',
    15,
    48
  );

  // Solutions Grid / Rows
  const packages = [
    {
      title: '01. Private Office Suites (Only Private Spaces)',
      badge: 'MIN 6-MONTH TERM',
      details: [
        'Minimum Rental Duration: 6 Months (Mandatory Management Policy)',
        'Small Office Suite (11 sqm) — KES 45,000 / month',
        'Medium Office Suite (14 sqm) — KES 55,000 / month',
        'Large Office Suite (25 sqm) — KES 65,000 / month',
        'Includes: Sound-insulated private partitions, 24/7 access, and private keycard entry.'
      ]
    },
    {
      title: '02. Meeting Room (Max 4 Guests)',
      badge: 'HOURLY / HALF-DAY / FULL-DAY',
      details: [
        'Hourly Rate — KES 1,500 / hr',
        'Half Day Pass (4 Hours) — KES 5,000 | Full Day Pass (8 Hours) — KES 8,000',
        'Includes: Magnetic whiteboard, fast dedicated internet, one complimentary hot beverage per guest.'
      ]
    },
    {
      title: '03. Executive Boardroom (Max 10 Guests)',
      badge: 'HOURLY / HALF-DAY / FULL-DAY',
      details: [
        'Hourly Rate — KES 2,000 / hr',
        'Half Day (4 Hours) — KES 8,000 | Full Day (8 Hours) — KES 12,000',
        'Includes: 75" 4K presentation screen, magnetic whiteboard, fast dedicated internet, one complimentary hot beverage per guest.'
      ]
    },
    {
      title: '04. Shared Co-Working Space',
      badge: 'FLEXIBLE PASSES',
      details: [
        'Monthly Shared Seat — KES 17,000 / month',
        'Full Day Shared Seat Pass (8 Hours) — KES 1,700 / day',
        'Half Day Shared Seat Pass (4 Hours) — KES 1,200 / half-day',
        'Includes: Seats at long tables in common area, fast dedicated internet, one complimentary hot beverage per stay.'
      ]
    },
    {
      title: '05. Printing, Copying & Add-on Services',
      badge: 'DOCUMENT SERVICES',
      details: [
        'Black & White Printing / Copying — KES 15 / page',
        'Color Printing / Copying — KES 50 / page',
        'High-Resolution Document Scanning — Complimentary for all registered members',
        'Operating Hours: Mon - Fri (8:00 AM - 8:00 PM), Sat (9:00 AM - 1:00 PM), Sun (Closed / 24-7 Member Keycard Access)'
      ]
    }
  ];

  let solY = 58;
  packages.forEach((pkg) => {
    // Top separator line
    doc.setDrawColor(colors.concrete.r, colors.concrete.g, colors.concrete.b);
    doc.setLineWidth(0.5);
    doc.line(15, solY, 195, solY);

    // Title
    doc.setTextColor(colors.black.r, colors.black.g, colors.black.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(pkg.title, 15, solY + 6);

    // Badge in Red
    doc.setTextColor(colors.red.r, colors.red.g, colors.red.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(pkg.badge, 195, solY + 6, { align: 'right' });

    // Details Bullet List
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);

    let bulletY = solY + 12;
    pkg.details.forEach((bullet) => {
      // Red square icon
      doc.setFillColor(colors.red.r, colors.red.g, colors.red.b);
      doc.rect(17, bulletY - 2, 2, 2, 'F');
      
      const splitBullet = doc.splitTextToSize(bullet, 170);
      doc.text(splitBullet, 22, bulletY);
      bulletY += (splitBullet.length * 4.2);
    });

    solY = bulletY + 3;
  });

  // Page 2 Footer
  doc.setTextColor(150, 150, 150);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('PAGE 2  |  SECONDESK OFFICIAL RATES & PACKAGES', 15, 282);


  // ==========================================
  // PAGE 3: LOCATION & BOOKING INFORMATION
  // ==========================================
  doc.addPage();

  // Background: Full bleed Off-white
  doc.setFillColor(colors.offwhite.r, colors.offwhite.g, colors.offwhite.b);
  doc.rect(0, 0, 210, 297, 'F');

  // Outer framing in Concrete
  doc.setDrawColor(colors.concrete.r, colors.concrete.g, colors.concrete.b);
  doc.setLineWidth(0.3);
  doc.rect(10, 10, 190, 277, 'S');

  // Header Title block (Black background + Red accent line)
  doc.setFillColor(colors.black.r, colors.black.g, colors.black.b);
  doc.rect(15, 15, 180, 25, 'F');
  doc.setFillColor(colors.red.r, colors.red.g, colors.red.b);
  doc.rect(15, 38, 180, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('HEADQUARTERS LOCATION & CONTACT DETAILS', 25, 30);

  // Description
  doc.setTextColor(colors.black.r, colors.black.g, colors.black.b);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text('Visit our flagship center situated on Links Road, Nyali (located above Second Cup Cafe on the 2nd floor).', 15, 48);

  // Locations Box grid
  const locationCard = {
    title: 'SECONDESK Nyali Executive Hub',
    address: 'Links Road, Nyali (located above Second Cup Cafe on the 2nd floor)',
    phone: '+254 719 688 992',
    email: 'info@secondesk.ke',
    features: [
      'Prime location on Links Road with immediate access to commercial amenities.',
      'Dedicated executive boardrooms, soundproof meeting rooms, and office suites.',
      'Fast dedicated internet with dual backup generators.',
      'Enclosed private offices, meeting rooms, and shared co-working space.'
    ]
  };

  let locY = 56;
  
  // Fill subtle box
  doc.setFillColor(245, 245, 242);
  doc.rect(15, locY, 180, 95, 'F');
  doc.setDrawColor(colors.concrete.r, colors.concrete.g, colors.concrete.b);
  doc.rect(15, locY, 180, 95, 'S');

  // Red accent left strip
  doc.setFillColor(colors.red.r, colors.red.g, colors.red.b);
  doc.rect(15, locY, 3, 95, 'F');

  // Title inside box
  doc.setTextColor(colors.black.r, colors.black.g, colors.black.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(locationCard.title, 22, locY + 10);

  // Address line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text(`Address: ${locationCard.address}`, 22, locY + 17);
  doc.text(`Phone: ${locationCard.phone}  |  Email: ${locationCard.email}`, 22, locY + 23);

  // Features inside location box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(colors.black.r, colors.black.g, colors.black.b);
  doc.text('Key Amenities & Location Benefits:', 22, locY + 33);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(70, 70, 70);
  let locFeatureY = locY + 40;
  locationCard.features.forEach((feat) => {
    doc.setFillColor(colors.red.r, colors.red.g, colors.red.b);
    doc.rect(23, locFeatureY - 2, 2, 2, 'F');
    const splitFeat = doc.splitTextToSize(feat, 160);
    doc.text(splitFeat, 28, locFeatureY);
    locFeatureY += (splitFeat.length * 4.5);
  });

  // Infrastructure block (Black card + Red accent header)
  doc.setFillColor(colors.black.r, colors.black.g, colors.black.b);
  doc.rect(15, 168, 180, 52, 'F');

  doc.setTextColor(colors.red.r, colors.red.g, colors.red.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('UNCOMPROMISING INFRASTRUCTURE AS STANDARD', 22, 179);

  doc.setTextColor(230, 230, 230);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const infrastructureBullets = [
    '• Fast dedicated internet with symmetrical redundant backup array.',
    '• 100% full electricity backup generator systems with automatic ATS failover.',
    '• Biometric keycard security integration and 24/7 CCTV surveillance.',
    '• Fully-serviced reception lounge, high-end boardrooms, and executive facilities.',
    '• One complimentary hot beverage per guest during their stay.'
  ];
  doc.text(infrastructureBullets, 22, 188, { lineHeightFactor: 1.5 });

  // Contact / Call to Action Box in SECONDESK Red
  doc.setDrawColor(colors.red.r, colors.red.g, colors.red.b);
  doc.setLineWidth(1);
  doc.rect(15, 228, 180, 36, 'S');

  doc.setTextColor(colors.red.r, colors.red.g, colors.red.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('BOOK A SPATIAL TOUR OR RESERVE YOUR SPACE', 22, 237);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(70, 70, 70);
  doc.text([
    'Call our Mombasa community team directly to book a site inspection, test a day pass,',
    'or request a customized enterprise office package for your business team.'
  ], 22, 243, { lineHeightFactor: 1.3 });

  // Contact CTA text right aligned inside box
  doc.setTextColor(colors.black.r, colors.black.g, colors.black.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Phone / WhatsApp: +254 719 688 992  |  Email: info@secondesk.ke', 22, 257);

  // Developer credit inside PDF
  doc.setTextColor(160, 160, 160);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Developed by KKDES', 195, 257, { align: 'right' });

  // Footer for Page 3
  doc.setTextColor(150, 150, 150);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('PAGE 3  |  SECONDESK CORPORATE PORTFOLIO', 15, 282);

  // Save / Download PDF
  doc.save('SECONDESK_Official_Brochure_PriceList.pdf');
};
