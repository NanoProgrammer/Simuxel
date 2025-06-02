import React from 'react'


export default function PrivacyPolicy() {
  return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="text-white/70 mb-6 text-sm text-center">Effective Date: June 1, 2025</p>

        <section className="space-y-6 text-sm text-white/80 leading-relaxed">
          <p>
            At Simuxel, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use,
            store, and protect your information when you use our platform.
          </p>

          <h2 className="text-white font-semibold text-lg mt-6">1. Information We Collect</h2>
          <p>We may collect the following types of information when you use Simuxel:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Your name and email address when you create an account</li>
            <li>Project files and building model data you upload</li>
            <li>Usage information such as IP address, device type, and browser</li>
            <li>Simulation preferences and configurations</li>
          </ul>

          <h2 className="text-white font-semibold text-lg mt-6">2. How We Use Your Information</h2>
          <p>We use your data to:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Provide, personalize, and improve our services</li>
            <li>Process simulations and display results</li>
            <li>Communicate with you about updates and support</li>
            <li>Enhance platform performance and security</li>
          </ul>

          <h2 className="text-white font-semibold text-lg mt-6">3. Data Sharing</h2>
          <p>
            We do not sell or rent your personal information. We may share your data with trusted service providers
            who assist in operating the platform, only to the extent necessary. All third parties are required to
            comply with strict data protection standards.
          </p>

          <h2 className="text-white font-semibold text-lg mt-6">4. Data Security</h2>
          <p>
            We take reasonable administrative, technical, and physical measures to protect your data from unauthorized
            access, alteration, or loss. However, no system is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-white font-semibold text-lg mt-6">5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data at any time. You can also request that
            we stop using your data for marketing or other non-essential purposes.
          </p>

          <h2 className="text-white font-semibold text-lg mt-6">6. Data Retention</h2>
          <p>
            We retain your information as long as your account is active or as needed to provide services. You may
            delete your account at any time, after which your data will be permanently removed from our systems.
          </p>

          <h2 className="text-white font-semibold text-lg mt-6">7. International Users</h2>
          <p>
            Simuxel is operated from Canada. If you are accessing the platform from outside Canada, you consent to the
            transfer and processing of your data in Canada under applicable Canadian laws.
          </p>

          <h2 className="text-white font-semibold text-lg mt-6">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy occasionally. We will notify you of any significant changes through the
            platform or via email.
          </p>

          <h2 className="text-white font-semibold text-lg mt-6">9. Contact</h2>
          <p>
            If you have any questions or concerns regarding this Privacy Policy or your data, please contact us at:
            <br />
            <span className="text-white">privacy@simuxel.com</span>
          </p>
        </section>
      </div>
  )
}
