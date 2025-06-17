import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Lock,
  Key,
  Eye,
  Server,
  FileCheck,
  Users,
  AlertTriangle,
} from "lucide-react";

export default function SecurityPage() {
  return (
    <MaxWidthWrapper className="py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Security & Trust
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your data security and privacy are our top priorities. Learn about the
          comprehensive measures we take to protect your documents and ensure
          your information remains secure.
        </p>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card className="text-center border-green-200 bg-green-50">
          <CardContent className="p-6">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">
              Enterprise-Grade Security
            </h3>
            <p className="text-sm text-gray-600">
              Bank-level encryption and security protocols
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">
              End-to-End Encryption
            </h3>
            <p className="text-sm text-gray-600">
              Data encrypted in transit and at rest
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <Eye className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">
              Zero Access Policy
            </h3>
            <p className="text-sm text-gray-600">
              We never access or train on your content
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <FileCheck className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">
              SOC 2 Compliant
            </h3>
            <p className="text-sm text-gray-600">
              Independently audited security controls
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Security Measures */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Security Framework
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-full">
            <CardHeader>
              <Lock className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Data Encryption</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>AES-256 encryption</strong> for data at rest in our
                    secure databases
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>TLS 1.3 encryption</strong> for all data
                    transmission
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>End-to-end encryption</strong> from upload to
                    processing
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Key rotation</strong> and secure key management
                    practices
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <Server className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Infrastructure Security</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>AWS infrastructure</strong> with enterprise security
                    controls
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Network isolation</strong> and secure VPC
                    configuration
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>DDoS protection</strong> and rate limiting
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>24/7 monitoring</strong> and incident response
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <Key className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Access Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Multi-factor authentication</strong> for all
                    accounts
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Role-based permissions</strong> and principle of
                    least privilege
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Session management</strong> with automatic timeouts
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Access logging</strong> and audit trails
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <Users className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle>Team Security</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Background checks</strong> for all team members
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Security training</strong> and regular updates
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Limited access</strong> to production systems
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Secure development</strong> practices and code
                    reviews
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Compliance and Certifications */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Compliance & Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-8">
              <Badge className="bg-green-100 text-green-800 mb-4">
                Certified
              </Badge>
              <h3 className="text-xl font-semibold mb-3">SOC 2 Type II</h3>
              <p className="text-gray-600">
                Independently audited for security, availability, and
                confidentiality controls.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <Badge className="bg-blue-100 text-blue-800 mb-4">
                Compliant
              </Badge>
              <h3 className="text-xl font-semibold mb-3">GDPR</h3>
              <p className="text-gray-600">
                Full compliance with European Union data protection regulations.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <Badge className="bg-purple-100 text-purple-800 mb-4">
                Compliant
              </Badge>
              <h3 className="text-xl font-semibold mb-3">CCPA</h3>
              <p className="text-gray-600">
                Adherence to California Consumer Privacy Act requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Data Protection Promise */}
      <div className="mb-16">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-8">
            <div className="text-center">
              <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Data Protection Promise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    ✅ We NEVER:
                  </h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Use your documents to train AI models</li>
                    <li>• Share your content with third parties</li>
                    <li>• Access your documents without permission</li>
                    <li>• Store unnecessary personal information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    ✅ We ALWAYS:
                  </h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Encrypt your data end-to-end</li>
                    <li>• Allow you to delete data anytime</li>
                    <li>• Follow strict access controls</li>
                    <li>• Maintain transparent policies</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Best Practices for Users */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Security Best Practices for Users
        </h2>

        <Card>
          <CardHeader>
            <AlertTriangle className="h-8 w-8 text-yellow-600 mb-2" />
            <CardTitle>Protect Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Account Security
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Use a strong, unique password</li>
                  <li>• Enable two-factor authentication</li>
                  <li>• Log out from shared devices</li>
                  <li>• Monitor account activity regularly</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Document Safety
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • Only upload documents you own or have permission to use
                  </li>
                  <li>• Be cautious with sensitive information</li>
                  <li>• Review sharing settings before collaboration</li>
                  <li>• Delete documents when no longer needed</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Incident Response */}
      <div className="mb-16">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Security Incident Response
            </h2>
            <p className="text-gray-700 text-center mb-6">
              We have a comprehensive incident response plan to quickly address
              any security concerns.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  🚨 Detection
                </h3>
                <p className="text-sm text-gray-600">
                  24/7 monitoring and automated threat detection systems
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  ⚡ Response
                </h3>
                <p className="text-sm text-gray-600">
                  Immediate containment and investigation within 1 hour
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  📢 Communication
                </h3>
                <p className="text-sm text-gray-600">
                  Transparent communication and affected user notification
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Security Team */}
      <div className="text-center bg-gray-50 p-8 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Security Questions or Concerns?
        </h3>
        <p className="text-gray-600 mb-6">
          Our security team is here to address any questions about our security
          practices.
        </p>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Security Email:</strong> security@fable.com
          </p>
          <p>
            <strong>Response Time:</strong> Within 24 hours for security
            inquiries
          </p>
          <p>
            <strong>Vulnerability Reports:</strong> We offer a responsible
            disclosure program
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
