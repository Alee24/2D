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
  doc.text('S E C O N D D E S K', 105, 70, { align: 'center' });

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
  doc.text('NAIROBI, KENYA  |  WWW.SECONDDESK.COM', 105, 265, { align: 'center' });


  // ==========================================
  // PAGE 2: DETAILED OFFICE SOLUTIONS
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
  doc.text('WORKSPACE SOLUTIONS & OFFICE CONFIGURATIONS', 25, 31);

  // Description under Header
  doc.setTextColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(
    'Explore flexible options tailored for solo executives, remote agencies, or scaling enterprise teams.',
    15,
    52
  );

  // Solutions Grid / Rows
  const solutions = [
    {
      title: '01. Executive Private Offices',
      rate: 'Starting from KES 45,000 / month',
      details: [
        'Acoustically sound-insulated glass partitioning for total speech privacy.',
        'Ergonomic Steelcase gesture chairs & custom solid hardwood desks.',
        'Private smart storage, personal safe box, and bespoke climate controls.',
        'Complimentary corporate high-volume secure cloud printing.'
      ]
    },
    {
      title: '02. Tailored Enterprise Suites',
      rate: 'Custom Pricing (On demand)',
      details: [
        'Entire private wings or dedicated floors customized to your corporate layout.',
        'Bespoke brand integration, secure isolated server racks & access control.',
        'Integrated private meeting rooms, executive lounges, and phone booths.',
        'Dedicated administrative and facilities team supporting your company.'
      ]
    },
    {
      title: '03. Premium Boardrooms & Meeting Spaces',
      rate: 'Starting from KES 3,500 / hour',
      details: [
        '75" 4K Smart Screens with high-definition telepresence configurations.',
        'Professional acoustical treatments, magnetic glass boards & writable walls.',
        'Dedicated reception concierge greeting your business guests on arrival.',
        'Gourmet catering and catering beverage setups supplied on demand.'
      ]
    },
    {
      title: '04. Dedicated Coworking Workstations',
      rate: 'Starting from KES 25,000 / month',
      details: [
        'Assigned, secure spacious desk workspace with locker access.',
        'Uncapped 500Mbps fiber internet with full redundancy failover systems.',
        'Access to multiple business lounges and outdoor landscaped sun decks.'
      ]
    }
  ];

  let solY = 65;
  solutions.forEach((sol) => {
    // Draw top line separator for each solution
    doc.setDrawColor(colors.concrete.r, colors.concrete.g, colors.concrete.b);
    doc.setLineWidth(0.5);
    doc.line(15, solY, 195, solY);

    // Title
    doc.setTextColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(sol.title, 15, solY + 6);

    // Rate
    doc.setTextColor(colors.forest.r, colors.forest.g, colors.forest.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(sol.rate, 195, solY + 6, { align: 'right' });

    // Details Bullet List
    doc.setTextColor(90, 90, 90);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);

    let bulletY = solY + 12;
    sol.details.forEach((bullet) => {
      // Draw custom minimal dash
      doc.setFillColor(colors.sand.r, colors.sand.g, colors.sand.b);
      doc.rect(17, bulletY - 2, 2, 0.5, 'F');
      
      // Text wrap to handle multi-line elegantly
      const splitBullet = doc.splitTextToSize(bullet, 170);
      doc.text(splitBullet, 22, bulletY);
      bulletY += (splitBullet.length * 4);
    });

    solY = bulletY + 2;
  });

  // Page 2 Footer
  doc.setTextColor(150, 150, 150);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('PAGE 2  |  SECONDDESK CORPORATE PORTFOLIO', 15, 282);


  // ==========================================
  // PAGE 3: LOCATIONS & PREMIUM HOSPITALITY
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
  doc.text('OUR ELITE LOCATIONS & HOSPITALITY METRICS', 25, 31);

  // Description
  doc.setTextColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Establish your presence in Nairobi\'s most prestigious, fully connected business districts.', 15, 52);

  // Locations Box grid
  const locationsData = [
    { name: 'SecondDesk Westlands', desc: 'The hub of innovation & tech. Premium high-altitude views and direct highway connectivity.' },
    { name: 'SecondDesk Karen', desc: 'Boutique office sanctuary surrounded by tranquil landscaped gardens and absolute privacy.' },
    { name: 'SecondDesk Kilimani', desc: 'Creative epicentre with abundant natural light, glass boardrooms, and organic cafes.' },
    { name: 'SecondDesk Upper Hill', desc: 'State-of-the-art corporate skyscraper spaces with fully secure dedicated server racks.' },
    { name: 'SecondDesk CBD', desc: 'Highly central transport hubs. Optimal for financial consultancies and legal firms.' }
  ];

  let locY = 62;
  locationsData.forEach((loc) => {
    // Fill subtle gray box
    doc.setFillColor(245, 245, 242);
    doc.rect(15, locY, 180, 17, 'F');
    doc.setDrawColor(colors.concrete.r, colors.concrete.g, colors.concrete.b);
    doc.rect(15, locY, 180, 17, 'S');

    // Accent left strip
    doc.setFillColor(colors.sand.r, colors.sand.g, colors.sand.b);
    doc.rect(15, locY, 1.5, 17, 'F');

    // Title
    doc.setTextColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(loc.name, 20, locY + 6);

    // Description
    doc.setTextColor(110, 110, 110);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(loc.desc, 20, locY + 12);

    locY += 21;
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
    '• Uncapped 500Mbps Fibre internet with symmetrical microwave backup arrays.',
    '• 100% full electricity backup generator systems with instant ATS failovers.',
    '• Biometric smart card security integration and 24/7 CCTV system tracking.',
    '• Eco-conscious HEPA clean air filtration units with personalized micro-climates.',
    '• Fully-stocked espresso bars serving single-origin specialty Kenyan coffee.'
  ];
  doc.text(infrastructureBullets, 22, 192, { lineHeightFactor: 1.5 });

  // Contact / Call to Action Box
  doc.setDrawColor(colors.sand.r, colors.sand.g, colors.sand.b);
  doc.setLineWidth(1);
  doc.rect(15, 232, 180, 36, 'S');

  doc.setTextColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('SCHEDULE A PERSONALIZED CONSULTATION', 22, 241);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(90, 90, 90);
  doc.text([
    'Contact our enterprise team to receive standard floorplans, custom modular desk layouts,',
    'or bespoke pricing portfolios tailored to your organizational team footprint.'
  ], 22, 246, { lineHeightFactor: 1.3 });

  // WhatsApp CTA text right aligned inside box
  doc.setTextColor(colors.charcoal.r, colors.charcoal.g, colors.charcoal.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('WhatsApp: +254 724 454757', 22, 261);

  // Developer credit inside PDF as requested in guidelines (Developed by KKDES)
  doc.setTextColor(160, 160, 160);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Developed by KKDES', 195, 261, { align: 'right' });

  // Footer for Page 3
  doc.setTextColor(150, 150, 150);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('PAGE 3  |  SECONDDESK CORPORATE PORTFOLIO', 15, 282);

  // Save / Download PDF
  doc.save('SecondDesk_Premium_Workspace_Brochure.pdf');
};
