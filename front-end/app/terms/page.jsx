import React from 'react'

export default function TermsOfService() {
  return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>

        <p className="text-white/70 mb-6 text-sm text-center">Effective Date: June 1, 2025</p>

        <section className="space-y-6 text-sm text-white/80 leading-relaxed">
          <p>
            Welcome to Simuxel. By accessing or using our platform, you agree to be bound by these Terms of Service
            and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited
            from using or accessing this site.
          </p>

          <h2 className="text-white font-semibold text-lg mt-6">1. Use of the Platform</h2>
          <p>
            Simuxel is intended for professional and academic users who need to analyze building performance based on
            construction and climate data. You agree to use the platform only for lawful purposes and in a way that
            does not infringe the rights of others or restrict their use of the service.
          </p>

          <h2 className="text-white font-semibold text-lg mt-6">2. Account Responsibility</h2>
          <p>
            You are responsible for maintaining the confidentiality of your login credentials. You must notify us
            immediately if you suspect unauthorized use of your account. Simuxel is not liable for any loss or damage
            arising from your failure to protect your credentials.
          </p>

          <h2 className="text-white font-semibold text-lg mt-6">3. Data Usage and Storage</h2>
          <p>
            Simuxel processes building models and climate data. While we strive to keep your information secure,
            you understand and agree that you upload and manage data at your own risk. We are not responsible for
            data loss, corruption, or unauthorized access due to user actions or third-party interference.
          </p>

          <h2 className="text-white font-semibold text-lg mt-6">4. Intellectual Property</h2>
          <p>
            All content on this platform, including text, graphics, code, and simulations, is the intellectual
            property of Simuxel or its licensors. You may not reproduce, distribute, or create derivative works
            without explicit permission.
          </p>

          <h2 className="text-white font-semibold text-lg mt-6">5. Modifications to the Service</h2>
          <p>
            We reserve the right to modify or discontinue any part of the service at any time, with or without notice.
            We are not liable for any impact this may have on you or your work.
          </p>

          <h2 className="text-white font-semibold text-lg mt-6">6. Termination</h2>
          <p>
            We may suspend or terminate your access to Simuxel if you violate these Terms or engage in conduct that we
            believe is harmful to the platform, our users, or our business.
          </p>

          <h2 className="text-white font-semibold text-lg mt-6">7. Governing Law</h2>
          <p>
            These terms are governed by the laws of Alberta, Canada. Any disputes arising from your use of Simuxel
            shall be resolved in the courts located in Alberta.
          </p>

          <p className="mt-8 text-white/70 text-sm">
            If you have any questions about these Terms, please contact us at support@simuxel.com.
          </p>
        </section>
      </div>
  )
}
