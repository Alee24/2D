import { jsPDF } from 'jspdf';

export const generateBrochurePDF = () => {
  // Create a new A4 document in portrait mode (210 x 297 mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Color Palette Definitions (in hex or RGB fractions)
  const charcoal = '#1D1D1D';
  const sand = '#D8C3A5';
  const offwhite = '#FAFAF8';
  const concrete = '#E7E7E7';
  const forest = '#314D3D';

  // HELPER: Convert hex to RGB values
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const colors = {
    charcoal: hexToRgb(charcoal),
    sand: hexToRgb(sand),
    offwhite: hexToRgb(offwhite),
    concrete: hexToRgb(concrete),
    forest: hexToRgb(forest),
  };

  // ==========================================
  // PAGE 1: COVER PAGE (Elegant Luxury Theme)
  // ==========================================
  
  // Background: Full bleed Charcoal
  doc.setFillColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
  doc.rect(0, 0, 210, 297, 'F');

  // Decorative border in Sand
  doc.setDrawColor(colors.sand.r, colors.sand.g, colors.sand.b);
  doc.setLineWidth(0.5);
  doc.rect(10, 10, 190, 277, 'S');

  // Accent horizontal line
  doc.setDrawColor(colors.sand.r, colors.sand.g, colors.sand.b);
  doc.setLineWidth(1.5);
  doc.line(30, 80, 180, 80);

  // Logo / Brand Name
  doc.setTextColor(colors.sand.r, colors.sand.g, colors.sand.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(38);
  doc.text('S E C O N D E S K', 105, 70, { align: 'center' });

  // Subtitle
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.text('PREMIUM WORKSPACE PORTFOLIO', 105, 95, { align: 'center' });

  // Luxury Divider Detail
  doc.setDrawColor(colors.sand.r, colors.sand.g, colors.sand.b);
  doc.setLineWidth(0.3);
  doc.line(95, 115, 115, 115);

  // Description copy
  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const introText = [
    'Bespoke coworking spaces, executive private offices,',
    'state-of-the-art boardrooms, and custom enterprise layouts',
    'crafted for elite focus and professional excellence.'
  ];
  doc.text(introText, 105, 130, { align: 'center', lineHeightFactor: 1.6 });

  // Core Pillars Section
  const pillars = [
    { title: 'PRISTINE DESIGN', desc: 'Spatially-optimized, high-end hospitality aesthetics.' },
    { title: 'UNINTERRUPTED FOCUS', desc: 'HEPA air filtration, premium soundproofing & 100% power backup.' },
    { title: 'ELITE HOSPITALITY', desc: 'Complimentary single-origin Kenyan espresso & dedicated concierge.' }
  ];

  let pillarY = 175;
  pillars.forEach((p) => {
    // Draw tiny square accent
    doc.setFillColor(colors.sand.r, colors.sand.g, colors.sand.b);
    doc.rect(30, pillarY - 4, 3, 3, 'F');

    doc.setTextColor(colors.sand.r, colors.sand.g, colors.sand.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
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
  doc.text('MOMBASA, KENYA  |  LINKS ROAD, NYALI (LOCATED ABOVE SECOND CUP CAFE)  |  WWW.SECONDESK.KE', 105, 265, { align: 'center' });


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

  // Header Title block
  doc.setFillColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
  doc.rect(15, 15, 180, 25, 'F');

  doc.setTextColor(colors.sand.r, colors.sand.g, colors.sand.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('OFFICIAL PRICE LIST & AVAILABLE PACKAGES', 25, 31);

  // Sub-header under Header
  doc.setTextColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(
    'All rates listed below exclude 16% VAT. Flexible terms available for individuals, startups, and corporate teams.',
    15,
    50
  );

  // Solutions Grid / Rows
  const packages = [
    {
      title: '01. Private Office Suites (Only Private Spaces)',
      badge: 'MONTHLY RATES',
      details: [
        'Small Office Suite (11 sqm) — KES 45,000 / month',
        'Medium Office Suite (14 sqm) — KES 55,000 / month',
        'Large Office Suite (25 sqm) — KES 65,000 / month',
        'Includes: Sound-insulated private partitions, Steelcase chairs, solid oak desks, 24/7 access, and private keycard entry.'
      ]
    },
    {
      title: '02. Meeting Rooms & Executive Boardrooms',
      badge: 'HOURLY / HALF-DAY / FULL-DAY',
      details: [
        'Meeting Room (Max 4 Guests) — KES 1,500 / hr',
        'Executive Boardroom (Max 10 Guests) — Full Day: KES 12,000 | Half Day: KES 8,000 | Hourly: KES 2,000',
        'Zoom Room (Acoustic Video Pod) — KES 1,000 / hr',
        'Includes: 4K presentation screens, video conferencing bars, whiteboards, one complimentary hot beverage per guest.'
      ]
    },
    {
      title: '03. Shared Co-Working Space',
      badge: 'FLEXIBLE PASSES',
      details: [
        'Monthly Shared Seat — KES 17,000 / month',
        'Full Day Shared Seat Pass — KES 1,700 / day',
        'Half Day Shared Seat Pass — KES 1,200 / half-day',
        'Includes: Seats at long tables in common area, fast dedicated internet, one complimentary hot beverage per stay.'
      ]
    },
    {
      title: '04. Printing, Copying & Add-on Services',
      badge: 'DOCUMENT SERVICES',
      details: [
        'Black & White Printing / Copying — KES 15 / page',
        'Color Printing / Copying — KES 50 / page',
        'High-Resolution Document Scanning — Complimentary for all registered members',
        'Operating Hours: Mon - Fri (8:00 AM - 8:00 PM), Sat (9:00 AM - 6:00 PM), Sun (Closed / 24-7 Member Keycard Access)'
      ]
    }
  ];

  let solY = 60;
  packages.forEach((pkg) => {
    // Top separator line
    doc.setDrawColor(colors.concrete.r, colors.concrete.g, colors.concrete.b);
    doc.setLineWidth(0.5);
    doc.line(15, solY, 195, solY);

    // Title
    doc.setTextColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(pkg.title, 15, solY + 6);

    // Badge
    doc.setTextColor(colors.forest.r, colors.forest.g, colors.forest.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(pkg.badge, 195, solY + 6, { align: 'right' });

    // Details Bullet List
    doc.setTextColor(70, 70, 70);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);

    let bulletY = solY + 12;
    pkg.details.forEach((bullet) => {
      // Dash icon
      doc.setFillColor(colors.sand.r, colors.sand.g, colors.sand.b);
      doc.rect(17, bulletY - 2, 2, 0.5, 'F');
      
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

  // Header Title block
  doc.setFillColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
  doc.rect(15, 15, 180, 25, 'F');

  doc.setTextColor(colors.sand.r, colors.sand.g, colors.sand.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('HEADQUARTERS LOCATION & CONTACT DETAILS', 25, 31);

  // Description
  doc.setTextColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text('Visit our flagship center situated on Links Road, Nyali (Located above Second Cup Cafe).', 15, 50);

  // Locations Box grid
  const locationCard = {
    title: 'Secondesk Nyali Executive Hub',
    address: 'Links Road, Nyali (Located above Second Cup Cafe)',
    phone: '0719688992',
    email: 'info@secondesk.ke',
    landmarks: 'Located above Second Cup Cafe, near Nyali Centre and City Mall.',
    features: [
      'Prime location on Links Road with immediate access to commercial amenities.',
      'Dedicated executive boardrooms, soundproof meeting rooms, and office suites.',
      'Fast dedicated internet with dual backup generators.',
      'Enclosed private offices, meeting rooms, and shared co-working space.'
    ]
  };

  let locY = 58;
  
  // Fill subtle gray box
  doc.setFillColor(245, 245, 242);
  doc.rect(15, locY, 180, 105, 'F');
  doc.setDrawColor(colors.concrete.r, colors.concrete.g, colors.concrete.b);
  doc.rect(15, locY, 180, 105, 'S');

  // Accent left strip
  doc.setFillColor(colors.sand.r, colors.sand.g, colors.sand.b);
  doc.rect(15, locY, 2.5, 105, 'F');

  // Title inside box
  doc.setTextColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(locationCard.title, 22, locY + 10);

  // Address line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text(`Address: ${locationCard.address}`, 22, locY + 17);
  doc.text(`Phone: ${locationCard.phone}  |  Email: ${locationCard.email}`, 22, locY + 23);
  doc.text(`Landmark: ${locationCard.landmarks}`, 22, locY + 29);

  // Features inside location box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
  doc.text('Key Amenities & Location Benefits:', 22, locY + 39);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(70, 70, 70);
  let locFeatureY = locY + 46;
  locationCard.features.forEach((feat) => {
    doc.setFillColor(colors.sand.r, colors.sand.g, colors.sand.b);
    doc.rect(23, locFeatureY - 2, 2, 0.5, 'F');
    const splitFeat = doc.splitTextToSize(feat, 160);
    doc.text(splitFeat, 28, locFeatureY);
    locFeatureY += (splitFeat.length * 4.5);
  });

  // Hospitality & Infrastructure block
  doc.setFillColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
  doc.rect(15, 172, 180, 52, 'F');

  doc.setTextColor(colors.sand.r, colors.sand.g, colors.sand.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('UNCOMPROMISING INFRASTRUCTURE AS STANDARD', 22, 183);

  doc.setTextColor(230, 230, 230);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const infrastructureBullets = [
    '• Fast dedicated internet with symmetrical redundant backup array.',
    '• 100% full electricity backup generator systems with automatic ATS failover.',
    '• Biometric keycard security integration and 24/7 CCTV surveillance.',
    '• Fully-serviced reception lounge, high-end boardrooms, and executive facilities.',
    '• Fresh coffee & tea bar with direct service from Second Cup downstairs.'
  ];
  doc.text(infrastructureBullets, 22, 192, { lineHeightFactor: 1.5 });

  // Contact / Call to Action Box
  doc.setDrawColor(colors.sand.r, colors.sand.g, colors.sand.b);
  doc.setLineWidth(1);
  doc.rect(15, 232, 180, 36, 'S');

  doc.setTextColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('BOOK A SPATIAL TOUR OR RESERVE YOUR SPACE', 22, 241);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(90, 90, 90);
  doc.text([
    'Call our Mombasa community team directly to book a site inspection, test a day pass,',
    'or request a customized enterprise office package for your business team.'
  ], 22, 246, { lineHeightFactor: 1.3 });

  // Contact CTA text right aligned inside box
  doc.setTextColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Phone / WhatsApp: 0719688992  |  Email: info@secondesk.ke', 22, 261);

  // Developer credit inside PDF
  doc.setTextColor(160, 160, 160);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Developed by KKDES', 195, 261, { align: 'right' });

  // Footer for Page 3
  doc.setTextColor(150, 150, 150);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('PAGE 3  |  SECONDESK CORPORATE PORTFOLIO', 15, 282);

  // Save / Download PDF
  doc.save('Secondesk_Official_Brochure_PriceList.pdf');
};
