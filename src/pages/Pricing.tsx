import React from 'react';
import { PriceListBoard } from '../components/PriceListBoard';
import { SEO } from '../components/SEO';
import { useRouter } from '../context/NavigationContext';
import { Calendar, Phone, Mail, ArrowRight, Download, CheckCircle, ShieldCheck } from 'lucide-react';
import { generateBrochurePDF } from '../utils/pdfGenerator';

export const Pricing: React.FC = () => {
  const { navigate } = useRouter();
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    setTimeout(() => {
      try {
        generateBrochurePDF();
        setDownloadSuccess(true);
      } catch (err) {
        console.error('Failed to generate PDF', err);
      } finally {
        setIsDownloading(false);
        setTimeout(() => setDownloadSuccess(false), 4000);
      }
    }, 1000);
  };

  return (
    <div className="bg-offwhite min-h-screen pt-28 pb-20 text-charcoal animate-fade-in">
      <SEO
        title="Official Price List & Rates — SecondDesk Mombasa"
        description="Official transparent rates for office suites, executive boardrooms, meeting rooms, coworking desks, printing, and Zoom rooms at SecondDesk."
      />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-sans font-semibold text-xs tracking-[0.25em] uppercase text-sand inline-block mb-3">
            SecondDesk Official Rates
          </span>
          <h1 className="font-display font-light text-4xl sm:text-5xl tracking-tight mb-4">
            Transparent <span className="font-serif italic font-normal text-sand">Membership & Facility Pricing</span>
          </h1>
          <p className="font-sans text-charcoal/70 text-base sm:text-lg leading-relaxed">
            From flexible hot desk passes to move-in-ready office suites and high-spec executive boardrooms. All rates listed exclude 16% VAT.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-charcoal hover:bg-sand text-white hover:text-charcoal border border-charcoal hover:border-sand font-sans text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? 'Generating Official PDF...' : 'Download Official Price List PDF'}
            </button>
            <button
              onClick={() => navigate('/book-tour')}
              className="bg-sand hover:bg-charcoal text-charcoal hover:text-white font-sans text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Book a Tour / Reserve Space
            </button>
          </div>

          {downloadSuccess && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-md flex items-center justify-center gap-2 max-w-md mx-auto">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Official Price List PDF downloaded successfully!
            </div>
          )}
        </div>

        {/* Price List Board Component */}
        <PriceListBoard />

        {/* Quick Contact & Guarantees */}
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-concrete text-center">
            <div className="w-12 h-12 rounded-full bg-sand/10 text-sand flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base mb-2">No Long Commitments</h3>
            <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
              Enjoy flexible month-to-month contracts on hot desks, dedicated desks, and office suites with 30-day flexibility.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-concrete text-center">
            <div className="w-12 h-12 rounded-full bg-sand/10 text-sand flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base mb-2">Direct Phone Support</h3>
            <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
              Have questions about customized team packages? Call our Mombasa community desk directly at <span className="font-bold text-charcoal">0719688992</span>.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-concrete text-center">
            <div className="w-12 h-12 rounded-full bg-sand/10 text-sand flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base mb-2">Instant Inquiries</h3>
            <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
              Send us your space requirements at <span className="font-bold text-charcoal">info@seconddesk.ke</span> for custom corporate quotes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
