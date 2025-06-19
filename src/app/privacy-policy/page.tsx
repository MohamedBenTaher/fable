import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function PrivacyPolicyPage() {
  return (
    <MaxWidthWrapper className="py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At Fable, we are committed to protecting your privacy and ensuring
              the security of your personal information. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our AI-powered document analysis service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Personal Information
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Name and email address when you create an account</li>
              <li>Payment information for subscription management</li>
              <li>Profile information you choose to provide</li>
              <li>Communication preferences and settings</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Document Data
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Documents you upload to our platform</li>
              <li>AI conversations and chat history</li>
              <li>Document metadata and processing information</li>
              <li>Usage patterns and feature interactions</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Technical Information
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Usage analytics and performance data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Provide and improve our AI document analysis services</li>
              <li>Process your documents and generate AI responses</li>
              <li>Manage your account and subscription</li>
              <li>Send important service updates and notifications</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Analyze usage patterns to improve our platform</li>
              <li>Ensure security and prevent fraudulent activity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Data Security and Protection
            </h2>
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
                🔒 Your Data is Secure
              </h3>
              <p className="text-blue-800 dark:text-blue-200">
                We implement enterprise-grade security measures to protect your
                information and never use your document content to train our AI
                models.
              </p>
            </div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>End-to-end encryption for data in transit and at rest</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication measures</li>
              <li>Secure cloud infrastructure with redundancy</li>
              <li>Employee training on data protection practices</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Data Sharing and Disclosure
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We do not sell, rent, or share your personal information with
              third parties for marketing purposes. We may share information
              only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations or court orders</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>
                With trusted service providers who assist in our operations
              </li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Rights and Choices
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Access:
                </strong>{" "}
                Request access to your personal information
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Correction:
                </strong>{" "}
                Update or correct inaccurate information
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Deletion:
                </strong>{" "}
                Request deletion of your personal data
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Portability:
                </strong>{" "}
                Export your data in a machine-readable format
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Opt-out:
                </strong>{" "}
                Unsubscribe from marketing communications
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Account Deletion:
                </strong>{" "}
                Delete your account and associated data
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Data Retention
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We retain your information only as long as necessary to provide
              our services and comply with legal obligations. Document data is
              typically deleted within 30 days of account closure, unless you
              specifically request earlier deletion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use cookies and similar technologies to enhance your experience
              and analyze platform usage. You can control cookie preferences
              through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              International Data Transfers
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Your information may be processed in countries other than your
              own. We ensure appropriate safeguards are in place to protect your
              data in accordance with applicable privacy laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this Privacy Policy periodically. We will notify you
              of any material changes via email or through our platform. Your
              continued use of Fable after such changes constitutes acceptance
              of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have questions about this Privacy Policy or wish to
                exercise your rights, please contact us:
              </p>
              <div className="text-gray-700 dark:text-gray-300">
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Email:
                  </strong>{" "}
                  privacy@fable.com
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Address:
                  </strong>{" "}
                  Fable Privacy Team, 123 Tech Street, San Francisco, CA 94105
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Response Time:
                  </strong>{" "}
                  We respond to privacy requests within 30 days
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
