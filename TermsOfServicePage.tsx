import React from "react";

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "sans-serif" }}>Terms of Service</h1>
      <div className="prose lg:prose-xl max-w-none" style={{ fontFamily: "serif" }}>
        <p>Last updated: May 17, 2025</p>

        <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the [Your Website URL] website (the "Service") operated by Farm Fresh ("us", "we", or "our").</p>

        <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>

        <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

        {/* Add more sections as needed: Accounts, Intellectual Property, Links To Other Web Sites, Termination, Limitation Of Liability, Disclaimer, Governing Law, Changes, Contact Us */}
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Intellectual Property</h2>
        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Farm Fresh and its licensors. The Service is protected by copyright, trademark, and other laws of both the [Your Country] and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Farm Fresh.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Changes</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us:</p>
        <ul>
          <li>By email: legal@farmfresh.com</li>
        </ul>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
