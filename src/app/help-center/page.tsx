import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  FileText,
  MessageSquare,
  Settings,
  CreditCard,
  Users,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function HelpCenterPage() {
  return (
    <MaxWidthWrapper className="py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Help Center
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Find answers to frequently asked questions and learn how to get the
          most out of Fable.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
          <Input
            placeholder="Search for help..."
            className="pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card className="hover:shadow-lg dark:hover:shadow-gray-700/20 transition-shadow cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Learn the basics of uploading documents and starting
              conversations.
            </p>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                How to upload your first document
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Understanding AI responses
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Supported file formats
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg dark:hover:shadow-gray-700/20 transition-shadow cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              Using AI Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Maximize your AI conversations and get better insights.
            </p>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Best practices for asking questions
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Export and share conversations
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Understanding AI limitations
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg dark:hover:shadow-gray-700/20 transition-shadow cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CreditCard className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              Billing & Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Manage your subscription and understand pricing.
            </p>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Upgrade or downgrade plans
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Payment methods and billing
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Cancel your subscription
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg dark:hover:shadow-gray-700/20 transition-shadow cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <Settings className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-2" />
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Customize your account and manage preferences.
            </p>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Update profile information
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Change password
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Notification settings
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg dark:hover:shadow-gray-700/20 transition-shadow cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <Users className="h-8 w-8 text-teal-600 dark:text-teal-400 mb-2" />
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              Team Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Collaborate with your team and share documents.
            </p>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Invite team members
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Share documents and conversations
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Manage team permissions
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg dark:hover:shadow-gray-700/20 transition-shadow cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <Shield className="h-8 w-8 text-red-600 dark:text-red-400 mb-2" />
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Learn about data protection and security measures.
            </p>
            <div className="space-y-2">
              <Link
                href="/security"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Data encryption and storage
              </Link>
              <Link
                href="/privacy-policy"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Privacy policy
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Two-factor authentication
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-white">
                What file formats are supported?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Fable supports PDF files, Word documents (.docx), PowerPoint
                presentations (.pptx), and text files (.txt). We&apos;re
                continuously adding support for more formats.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-white">
                How secure is my data?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Your documents are encrypted in transit and at rest. We use
                enterprise-grade security measures and never use your content to
                train our AI models. Learn more on our{" "}
                <Link
                  href="/security"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  security page
                </Link>
                .
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-white">
                Can I cancel my subscription anytime?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, you can cancel your subscription at any time from your
                account settings. Your access will continue until the end of
                your current billing period.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-white">
                Is there a limit on document size?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Free accounts can upload documents up to 10MB. Pro and
                Enterprise plans support documents up to 100MB. For larger
                files, please contact our support team.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Support */}
      <div className="text-center bg-blue-50 dark:bg-blue-950/20 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Still need help?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Our support team is here to help you with any questions or issues.
        </p>
        <Link
          href="/support"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}
