import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function TermsOfServicePage() {
  return (
    <MaxWidthWrapper className="py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Agreement to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using Fable's AI-powered document analysis
              service, you agree to be bound by these Terms of Service
              ("Terms"). If you do not agree to these Terms, please do not use
              our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Description of Service
            </h2>
            <p className="text-gray-700 mb-4">
              Fable provides an AI-powered platform that allows users to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Upload and analyze documents using artificial intelligence
              </li>
              <li>Engage in conversations with AI about document content</li>
              <li>Extract insights and summaries from uploaded materials</li>
              <li>Export and share AI-generated responses and analyses</li>
              <li>Collaborate with team members on document analysis</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              User Accounts and Registration
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Account Creation
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                You must provide accurate and complete information when creating
                an account
              </li>
              <li>
                You are responsible for maintaining the security of your account
                credentials
              </li>
              <li>You must be at least 18 years old to create an account</li>
              <li>One person or entity may maintain only one account</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Account Responsibility
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                You are responsible for all activities that occur under your
                account
              </li>
              <li>You must notify us immediately of any unauthorized use</li>
              <li>
                We reserve the right to suspend or terminate accounts that
                violate these Terms
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Acceptable Use Policy
            </h2>
            <div className="bg-red-50 p-6 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                🚫 Prohibited Activities
              </h3>
              <p className="text-red-800">
                The following activities are strictly prohibited when using
                Fable.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              You may NOT:
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Upload content that is illegal, harmful, threatening, or abusive
              </li>
              <li>Violate any intellectual property rights</li>
              <li>Upload malware, viruses, or harmful code</li>
              <li>Attempt to reverse engineer or compromise our systems</li>
              <li>Use the service for spam or unsolicited communications</li>
              <li>Share account credentials with unauthorized users</li>
              <li>
                Scrape or extract data from our platform without permission
              </li>
              <li>Use the service to compete with Fable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Content and Intellectual Property
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Your Content
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                You retain ownership of all documents and content you upload
              </li>
              <li>
                You grant us a limited license to process your content for
                service delivery
              </li>
              <li>
                You are responsible for ensuring you have rights to upload and
                analyze content
              </li>
              <li>
                We do not claim ownership of your documents or AI conversations
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Our Platform
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Fable retains all rights to our platform, AI models, and
                technology
              </li>
              <li>
                Our service is protected by copyright, trademark, and other laws
              </li>
              <li>
                You may not copy, modify, or create derivative works of our
                platform
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Subscription and Payment Terms
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Billing
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                Subscription fees are billed in advance on a monthly or annual
                basis
              </li>
              <li>All fees are non-refundable except as required by law</li>
              <li>
                We may change pricing with 30 days' notice to existing
                subscribers
              </li>
              <li>
                Taxes may be added to your subscription fee as required by law
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Cancellation
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                You may cancel your subscription at any time from your account
                settings
              </li>
              <li>
                Cancellation takes effect at the end of your current billing
                period
              </li>
              <li>We may suspend or terminate service for non-payment</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Privacy and Data Protection
            </h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Our collection and use of
              personal information is governed by our Privacy Policy, which is
              incorporated into these Terms by reference.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                🔒 Data Security Promise
              </h3>
              <ul className="list-disc list-inside text-blue-800 space-y-1">
                <li>We encrypt your data in transit and at rest</li>
                <li>We never use your content to train our AI models</li>
                <li>We implement industry-standard security measures</li>
                <li>You can delete your data at any time</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Service Availability and Limitations
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Service Level
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                We strive for 99.9% uptime but do not guarantee uninterrupted
                service
              </li>
              <li>
                We may perform maintenance that temporarily affects service
                availability
              </li>
              <li>
                We reserve the right to modify or discontinue features with
                notice
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Usage Limits
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Usage limits vary by subscription plan</li>
              <li>Excessive usage may result in service throttling</li>
              <li>
                We may implement reasonable usage policies to ensure fair access
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Disclaimers and Limitations of Liability
            </h2>

            <div className="bg-yellow-50 p-6 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                ⚠️ Important Disclaimers
              </h3>
              <p className="text-yellow-800">
                AI-generated responses are for informational purposes only and
                should not be considered professional advice.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Service Disclaimers
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                Our service is provided "as is" without warranties of any kind
              </li>
              <li>AI responses may contain errors or inaccuracies</li>
              <li>
                We do not guarantee the accuracy, completeness, or reliability
                of AI outputs
              </li>
              <li>Users should verify important information independently</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Limitation of Liability
            </h3>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law, Fable shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages, including but not limited to loss of profits, data, or
              business interruption.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Indemnification
            </h2>
            <p className="text-gray-700">
              You agree to indemnify and hold harmless Fable from any claims,
              damages, or expenses arising from your use of the service,
              violation of these Terms, or infringement of any rights of another
              party.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Termination
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Either party may terminate the agreement at any time with or
                without cause
              </li>
              <li>
                We may immediately suspend or terminate accounts that violate
                these Terms
              </li>
              <li>
                Upon termination, your right to use the service ceases
                immediately
              </li>
              <li>
                We will provide reasonable opportunity to export your data
                before deletion
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Governing Law and Disputes
            </h2>
            <p className="text-gray-700 mb-4">
              These Terms are governed by the laws of California, United States.
              Any disputes will be resolved through binding arbitration in San
              Francisco, California.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-700">
              We may modify these Terms at any time. Material changes will be
              communicated via email or platform notification at least 30 days
              before taking effect. Your continued use constitutes acceptance of
              the updated Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms of Service, please
                contact us:
              </p>
              <div className="text-gray-700">
                <p>
                  <strong>Email:</strong> legal@fable.com
                </p>
                <p>
                  <strong>Address:</strong> Fable Legal Team, 123 Tech Street,
                  San Francisco, CA 94105
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Severability
            </h2>
            <p className="text-gray-700">
              If any provision of these Terms is found to be unenforceable, the
              remaining provisions will continue in full force and effect.
            </p>
          </section>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
