import React from 'react';
import { useRouter } from '../context/NavigationContext';
import { ArrowLeft, ShieldAlert, FileText, CheckCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const PrivacyTerms: React.FC = () => {
  const { navigate, currentPath } = useRouter();
  const isPrivacy = currentPath === '/privacy';

  return (
    <div className="bg-offwhite text-charcoal pt-20 animate-fade-in min-h-screen">
      <SEO 
        title={isPrivacy ? 'Privacy Policy & Data Ethics' : 'Terms & Conditions of Membership'}
        description={
          isPrivacy 
            ? 'Read the privacy policy, cookie policy, and data protection guidelines for SecondDesk premium workspace members.' 
            : 'Review the terms and conditions of membership, workspace use rules, and service guidelines for SecondDesk.'
        }
      />
      <Breadcrumbs />

      <section className="py-20 max-w-4xl mx-auto px-6 lg:px-12 space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center text-sand">
              {isPrivacy ? <ShieldAlert className="w-5 h-5 text-charcoal" /> : <FileText className="w-5 h-5 text-charcoal" />}
            </div>
            <span className="font-mono text-[10px] text-charcoal/40 uppercase tracking-widest">Regulatory Framework</span>
          </div>
          <h1 className="font-display font-light text-4xl sm:text-5xl text-charcoal tracking-tight">
            {isPrivacy ? 'Privacy Policy & Data Ethics' : 'Terms & Conditions of Membership'}
          </h1>
          <p className="font-sans text-xs text-charcoal/50">
            Last Updated: July 05, 2026. Effective for all multi-point Nairobi nodes and digital memberships.
          </p>
        </div>

        {isPrivacy ? (
          /* PRIVACY CONTENT */
          <div className="font-sans text-sm text-charcoal/75 leading-relaxed font-light space-y-6">
            <p>
              At Second Desk, we hold our members' data security and visual confidentiality to standard-setting operational principles. This policy explains how we collect, process, and secure corporate data across our physical sites and digital reservation dashboards.
            </p>

            <h3 className="font-display font-semibold text-lg text-charcoal pt-4">1. Data Collected Inside Nodes</h3>
            <p>
              We process minimal operational data, including guest biometric/CCTV access logs for physical safety, printing queues (automatically deleted within 24 hours of release), and conference room booking intervals. We never analyze or inspect any files uploaded to secure printers or connected local devices.
            </p>

            <h3 className="font-display font-semibold text-lg text-charcoal pt-4">2. Digital Reservation Platforms</h3>
            <p>
              Your name, billing parameters, and company credentials are kept behind bank-grade encrypted firewalls. We do not sell or lease member details to third-party marketing brokers. Data sharing is limited to pre-vetted payment gateways (such as local M-Pesa channels or international card processors) to settle invoices.
            </p>

            <h3 className="font-display font-semibold text-lg text-charcoal pt-4">3. CCTV & Physical Security</h3>
            <p>
              CCTV surveillance networks operate round-the-clock inside public corridors, entry lines, lift lobbies, and server-room cages. No cameras are installed inside private offices, boardrooms, phone booths, or wellness stations. Access to video logs is strictly restricted to secure operations directors.
            </p>

            <div className="p-6 bg-white border border-concrete space-y-2">
              <h4 className="font-display font-semibold text-charcoal text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-forest" /> GDPR & Kenya Data Protection Compliance
              </h4>
              <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">
                Our practices align with the Kenya Data Protection Act and international GDPR frameworks. You have the right to inspect, correct, or request deletion of your operational history records on our databases at any time.
              </p>
            </div>
          </div>
        ) : (
          /* TERMS OF SERVICE CONTENT */
          <div className="font-sans text-sm text-charcoal/75 leading-relaxed font-light space-y-6">
            <p>
              By executing a Second Desk membership agreement or booking a conference pass, you agree to comply with the standard site rules defined below.
            </p>

            <h3 className="font-display font-semibold text-lg text-charcoal pt-4">1. Respectful Shared Use</h3>
            <p>
              Our workspaces are engineered to support focus. Members must maintain sensible noise thresholds inside shared lounges and cafes. Long phone calls must be conducted inside private, acoustically isolated phone booths, never at hot desks.
            </p>

            <h3 className="font-display font-semibold text-lg text-charcoal pt-4">2. Redundant Power & Internet</h3>
            <p>
              We maintain automatic generators and redundant fiber lines to guarantee 99.9% uptime. In the highly unlikely event of a combined system outage, Second Desk's liability is capped at the pro-rated value of the affected day's lease pass.
            </p>

            <h3 className="font-display font-semibold text-lg text-charcoal pt-4">3. Cancellation & Commitments</h3>
            <p>
              All standard memberships operate on a convenient, flexible month-to-month basis. Cancellation requests must be submitted in writing to local managers at least 30 days prior to your next recurring billing cycle.
            </p>

            <div className="p-6 bg-white border border-concrete space-y-2">
              <h4 className="font-display font-semibold text-charcoal text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-forest" /> Safe Workplace Operations
              </h4>
              <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">
                We maintain an absolute zero-tolerance policy regarding harassment, intellectual property theft, or damage to spatial property. Violations will result in immediate termination of pass credentials.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
export default PrivacyTerms;
