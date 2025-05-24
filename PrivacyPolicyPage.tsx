import React from "react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "sans-serif" }}>Privacy Policy</h1>
      <div className="prose lg:prose-xl max-w-none" style={{ fontFamily: "serif" }}>
        <p>Last updated: May 17, 2025</p>
        
        <p>Farm Fresh ("us", "we", or "our") operates the [Your Website URL] website (the "Service").</p>
        
        <p>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. Our Privacy Policy for Farm Fresh is managed with the help of the [Privacy Policy Generator Name/Link if applicable].</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Information Collection and Use</h2>
        <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
        
        <h3 className="text-xl font-semibold mt-4 mb-2">Types of Data Collected</h3>
        <h4>Personal Data</h4>
        <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>
        <ul>
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Address, State, Province, ZIP/Postal code, City</li>
          <li>Cookies and Usage Data</li>
        </ul>

        {/* Add more sections as needed: Usage Data, Tracking & Cookies Data, Use of Data, Transfer Of Data, Disclosure Of Data, Security Of Data, Service Providers, Links To Other Sites, Children's Privacy, Changes To This Privacy Policy, Contact Us */}

        <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <ul>
          <li>By email: privacy@farmfresh.com</li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
