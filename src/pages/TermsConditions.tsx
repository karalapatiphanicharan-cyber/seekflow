import React from 'react';
import { SectionTitle } from '../components/ui/SectionTitle';

const TermsConditions: React.FC = () => {
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-10 max-w-4xl mx-auto w-full">
      <SectionTitle subtitle="Legal Documentation">Terms & Conditions</SectionTitle>

      <div className="space-y-8 text-text-secondary leading-relaxed animate-in fade-in duration-500">
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">1. Agreement to Terms</h3>
          <p>
            By accessing and using SeekFlow, you agree to be bound by these Terms and Conditions.
            If you disagree with any part of these terms, you may not access the service.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">2. Educational Use Only</h3>
          <p>
            SeekFlow is provided strictly for educational and informational purposes. The simulations
            and calculations provided are intended to demonstrate theoretical concepts in Operating
            Systems. They should not be used as the sole basis for production storage system
            configurations or hardware performance predictions.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">3. No Warranties</h3>
          <p>
            This service is provided "as is," with all faults, and SeekFlow expresses no
            representations or warranties, of any kind related to this website or the materials
            contained on this website. While we strive for accuracy, we do not warrant that
            the simulator results are error-free or suitable for any specific purpose.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">4. Limitation of Liability</h3>
          <p>
            In no event shall SeekFlow, nor any of its contributors, be held liable for anything
            arising out of or in any way connected with your use of this website whether such
            liability is under contract. SeekFlow shall not be held liable for any indirect,
            consequential, or special liability arising out of or in any way related to your
            use of this website.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">5. Intellectual Property</h3>
          <p>
            Other than the content you own, under these Terms, SeekFlow and/or its licensors own all
            the intellectual property rights and materials contained in this website. You are
            granted a limited license only for purposes of viewing the material contained on
            this website and using the simulator features.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">6. User Responsibilities</h3>
          <p>
            You are responsible for ensuring that your use of the simulator complies with
            applicable local laws and regulations. You must not use this website in any way
            that is or may be damaging to this website or in any way that impacts user
            access to this website.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">7. Service Modifications</h3>
          <p>
            We reserve the right to modify or discontinue, temporarily or permanently, the
            Service (or any part thereof) with or without notice at any time. You agree that
            SeekFlow shall not be liable to you or to any third party for any modification,
            suspension, or discontinuance of the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">8. Governing Law</h3>
          <p>
            These Terms will be governed by and interpreted in accordance with the laws of
            your jurisdiction, and you submit to the non-exclusive jurisdiction of the state
            and federal courts located in your country for the resolution of any disputes.
          </p>
        </section>
      </div>
    </main>
  );
};

export default TermsConditions;
