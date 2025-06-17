import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MessageCircle,
  Phone,
  Clock,
  Search,
  FileText,
  Users,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  return (
    <MaxWidthWrapper className="py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How can we help you?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get the support you need to make the most of Fable. Our team is here
          to help you succeed.
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="text-center">
          <CardHeader>
            <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle>Live Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Chat with our support team in real-time
            </p>
            <Button className="w-full">Start Chat</Button>
            <p className="text-sm text-gray-500 mt-2">
              <Clock className="h-4 w-4 inline mr-1" />
              Available 24/7
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <CardTitle>Email Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Send us a detailed message</p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="mailto:support@fable.com">Send Email</Link>
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              <Clock className="h-4 w-4 inline mr-1" />
              Response within 24 hours
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Phone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <CardTitle>Phone Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Speak directly with our team</p>
            <Button variant="outline" className="w-full">
              Schedule Call
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              <Clock className="h-4 w-4 inline mr-1" />
              Mon-Fri, 9AM-6PM EST
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Help Links */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Quick Help
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Search className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Getting Started</h3>
              <p className="text-sm text-gray-600 mb-3">
                Learn the basics of using Fable
              </p>
              <Link
                href="/help-center"
                className="text-blue-600 text-sm hover:underline"
              >
                View Guide →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Document Upload</h3>
              <p className="text-sm text-gray-600 mb-3">
                Troubleshoot file upload issues
              </p>
              <Link
                href="/help-center"
                className="text-blue-600 text-sm hover:underline"
              >
                Learn More →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Account & Billing</h3>
              <p className="text-sm text-gray-600 mb-3">
                Manage your subscription
              </p>
              <Link
                href="/help-center"
                className="text-blue-600 text-sm hover:underline"
              >
                Get Help →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Security & Privacy</h3>
              <p className="text-sm text-gray-600 mb-3">
                Learn about data protection
              </p>
              <Link
                href="/security"
                className="text-blue-600 text-sm hover:underline"
              >
                Read More →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Status */}
      <div className="text-center bg-green-50 p-8 rounded-lg">
        <div className="flex items-center justify-center mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-green-700 font-medium">
            All Systems Operational
          </span>
        </div>
        <p className="text-gray-600">
          Check our{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            status page
          </Link>{" "}
          for real-time updates on service availability.
        </p>
      </div>
    </MaxWidthWrapper>
  );
}
