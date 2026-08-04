import React from 'react';
import { Logo } from './Logo';
import { officialPriceList, companyInfo } from '../data/coworkingData';
import { Clock, Phone, Mail, Globe } from 'lucide-react';

export const PriceListBoard: React.FC = () => {
  return (
    <div className="bg-white border border-concrete shadow-lg rounded-xl p-6 sm:p-10 max-w-5xl mx-auto my-8">
      {/* Price List Header mirroring the exact brand flyer layout */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-concrete pb-6 mb-6 gap-4">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-3">
          <Logo size={48} light={false} />
          <div>
            <span className="font-display text-2xl uppercase flex items-center tracking-[0.15em] font-black" style={{ fontWeight: 900 }}>
              <span className="text-charcoal">SECOND</span>
              <span className="text-[#E31B23]">DESK</span>
            </span>
            <span className="text-[10px] tracking-widest text-charcoal/50 uppercase block font-sans font-semibold">
              Boutique Workspace Network
            </span>
          </div>
        </div>

        {/* Contact Info Header */}
        <div className="text-right text-xs font-sans text-charcoal/80 space-y-1">
          <p className="flex items-center justify-end gap-2 font-medium">
            <Mail className="w-3.5 h-3.5 text-[#E31B23]" />
            <a href="mailto:info@seconddesk.ke" className="hover:underline">info@seconddesk.ke</a>
            <span className="text-charcoal/30">|</span>
            <Globe className="w-3.5 h-3.5 text-[#E31B23]" />
            <a href="https://www.seconddesk.ke" target="_blank" rel="noreferrer" className="hover:underline">www.seconddesk.ke</a>
          </p>
          <p className="flex items-center justify-end gap-2 font-bold text-charcoal">
            <Phone className="w-3.5 h-3.5 text-[#E31B23]" />
            <span>0719688992</span>
            <span className="text-charcoal/30">|</span>
            <span>+254 719 688 992</span>
          </p>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="text-center space-y-2 mb-6">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-charcoal uppercase">
          {officialPriceList.title}
        </h2>
        <p className="font-display text-xs sm:text-sm font-bold tracking-widest text-[#E31B23] uppercase">
          {officialPriceList.subtitle}
        </p>

        {/* VAT Banner */}
        <div className="bg-[#FDF2F2] border border-[#FAD2D2] text-[#E31B23] font-sans text-xs sm:text-sm font-bold py-2.5 px-4 rounded-lg tracking-wider uppercase mt-3">
          {officialPriceList.vatNotice}
        </div>
      </div>

      {/* Price Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {officialPriceList.sections.map((section) => (
          <div key={section.id} className="bg-white border border-concrete/80 rounded-lg overflow-hidden shadow-xs hover:border-charcoal/30 transition-all">
            {/* Dark Header */}
            <div className="bg-[#1D1D1D] text-white px-5 py-3 flex items-center justify-between">
              <h3 className="font-display font-bold text-xs sm:text-sm tracking-wider uppercase text-white">
                {section.title}
              </h3>
            </div>

            {/* Price Rows */}
            <div className="divide-y divide-concrete/50">
              {section.rates.map((rate, rIdx) => (
                <div key={rIdx} className="px-5 py-3.5 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-sans font-medium text-charcoal/80">
                    {rate.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-sans font-bold text-charcoal/40 uppercase tracking-wider">
                      {rate.period}
                    </span>
                    <span className="font-display font-bold text-charcoal text-sm sm:text-base">
                      {rate.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Operating Hours Bar */}
      <div className="bg-[#1D1D1D] text-white rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E31B23]/20 flex items-center justify-center text-[#E31B23]">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="font-display font-bold text-sm tracking-wide text-white block uppercase">
              Operating Hours
            </span>
            <span className="text-white/60 text-[11px]">
              Access available for all workspaces & boardrooms
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs font-medium">
          <div className="bg-white/10 px-3 py-1.5 rounded">
            <span className="text-white/60 mr-1.5">Mon - Fri:</span>
            <span className="text-white font-bold">8:00 AM - 8:00 PM</span>
          </div>
          <div className="bg-white/10 px-3 py-1.5 rounded">
            <span className="text-white/60 mr-1.5">Saturday:</span>
            <span className="text-white font-bold">9:00 AM - 1:00 PM</span>
          </div>
          <div className="bg-white/10 px-3 py-1.5 rounded text-white/50">
            <span className="text-white/60 mr-1.5">Sunday:</span>
            <span className="text-red-400 font-bold">Closed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceListBoard;
