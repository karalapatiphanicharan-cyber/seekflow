import React from 'react';
import { SectionTitle } from '../components/ui/SectionTitle';

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-10 max-w-4xl mx-auto w-full">
      <SectionTitle subtitle="Legal Documentation">Privacy Policy</SectionTitle>

      <div className="space-y-8 text-text-secondary leading-relaxed animate-in fade-in duration-500">
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">1. Introduction</h3>
          <p>
            Welcome to SeekFlow. We respect your privacy and are committed to protecting any information
            that may be collected through your use of our website. This Privacy Policy explains our
            practices regarding the collection, use, and disclosure of information.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">2. Information Collection</h3>
          <p>
            SeekFlow is designed as a client-side application. We do not require users to create accounts
            or provide personal information (such as names or email addresses) to use the simulator.
            Any data you input into the simulator (track requests, disk size, etc.) is processed
            locally in your browser and is not stored on our servers.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">3. Cookies and Tracking</h3>
          <p>
            We may use cookies and similar tracking technologies to track activity on our website
            and hold certain information. Cookies are files with a small amount of data which may
            include an anonymous unique identifier. You can instruct your browser to refuse all
            cookies or to indicate when a cookie is being sent.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">4. Google AdSense</h3>
          <p>
            We may use Google AdSense to serve advertisements. Google, as a third-party vendor, uses
            cookies to serve ads on our site. Google's use of advertising cookies enables it and its
            partners to serve ads to our users based on their visit to our site or other sites on the
            Internet. Users may opt-out of personalized advertising by visiting Google's Ads Settings.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">5. Third-Party Services</h3>
          <p>
            We may employ third-party companies and individuals due to the following reasons:
            to facilitate our Service, to provide the Service on our behalf, or to perform
            Service-related services (e.g., analytics). These third parties may have access to
            your information only to perform these tasks on our behalf and are obligated not to
            disclose or use it for any other purpose.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">6. Data Usage</h3>
          <p>
            Any information collected is used solely to provide and maintain the Service, notify
            you about changes to our Service, allow you to participate in interactive features,
            and provide analysis or valuable information so that we can improve the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">7. External Links</h3>
          <p>
            Our website may contain links to other sites that are not operated by us. If you click
            on a third-party link, you will be directed to that third party's site. We strongly
            advise you to review the Privacy Policy of every site you visit.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">8. Policy Updates</h3>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page. You are advised to review this Privacy
            Policy periodically for any changes.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">9. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us via our
            GitHub repository.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
