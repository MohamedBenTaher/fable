import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Find answers to frequently asked questions and learn how to get the
          most out of Fable.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input placeholder="Search for help..." className="pl-10 pr-4 py-3" />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <FileText className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle className="text-lg">Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Learn the basics of uploading documents and starting
              conversations.
            </p>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                How to upload your first document
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                Understanding AI responses
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                Supported file formats
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <MessageSquare className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle className="text-lg">Using AI Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Maximize your AI conversations and get better insights.
            </p>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                Best practices for asking questions
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                Export and share conversations
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                Understanding AI limitations
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CreditCard className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle className="text-lg">Billing & Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Manage your subscription and understand pricing.
            </p>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                Upgrade or downgrade plans
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                Payment methods and billing
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                Cancel your subscription
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <Settings className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle className="text-lg">Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Customize your account and manage preferences.
            </p>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                Update profile information
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                Change password
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                Notification settings
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <Users className="h-8 w-8 text-teal-600 mb-2" />
            <CardTitle className="text-lg">Team Features</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Collaborate with your team and share documents.
            </p>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                Invite team members
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                Share documents and conversations
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                Manage team permissions
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <Shield className="h-8 w-8 text-red-600 mb-2" />
            <CardTitle className="text-lg">Security & Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Learn about data protection and security measures.
            </p>
            <div className="space-y-2">
              <Link
                href="/security"
                className="block text-sm text-blue-600 hover:underline"
              >
                Data encryption and storage
              </Link>
              <Link
                href="/privacy-policy"
                className="block text-sm text-blue-600 hover:underline"
              >
                Privacy policy
              </Link>
              <Link
                href="#"
                className="block text-sm text-blue-600 hover:underline"
              >
                Two-factor authentication
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                What file formats are supported?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Fable supports PDF files, Word documents (.docx), PowerPoint
                presentations (.pptx), and text files (.txt). We're continuously
                adding support for more formats.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How secure is my data?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Your documents are encrypted in transit and at rest. We use
                enterprise-grade security measures and never use your content to
                train our AI models. Learn more on our{" "}
                <Link
                  href="/security"
                  className="text-blue-600 hover:underline"
                >
                  security page
                </Link>
                .
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Can I cancel my subscription anytime?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time from your
                account settings. Your access will continue until the end of
                your current billing period.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Is there a limit on document size?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Free accounts can upload documents up to 10MB. Pro and
                Enterprise plans support documents up to 100MB. For larger
                files, please contact our support team.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Support */}
      <div className="text-center bg-blue-50 p-8 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Still need help?
        </h3>
        <p className="text-gray-600 mb-6">
          Our support team is here to help you with any questions or issues.
        </p>
        <Link
          href="/support"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}
