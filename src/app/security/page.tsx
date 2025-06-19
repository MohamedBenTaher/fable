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
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Security & Trust
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Your data security and privacy are our top priorities. Learn about the
          comprehensive measures we take to protect your documents and ensure
          your information remains secure.
        </p>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card className="text-center border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
          <CardContent className="p-6">
            <Shield className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Enterprise-Grade Security
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bank-level encryption and security protocols
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
          <CardContent className="p-6">
            <Lock className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              End-to-End Encryption
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Data encrypted in transit and at rest
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20">
          <CardContent className="p-6">
            <Eye className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Zero Access Policy
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We never access or train on your content
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
          <CardContent className="p-6">
            <FileCheck className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              SOC 2 Compliant
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Independently audited security controls
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Security Measures */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Our Security Framework
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
              <CardTitle className="text-gray-900 dark:text-white">
                Data Encryption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>AES-256 encryption</strong> for data at rest in our
                    secure databases
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>TLS 1.3 encryption</strong> for all data
                    transmission
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>End-to-end encryption</strong> from upload to
                    processing
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Key rotation</strong> and secure key management
                    practices
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <Server className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
              <CardTitle className="text-gray-900 dark:text-white">
                Infrastructure Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>AWS infrastructure</strong> with enterprise security
                    controls
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Network isolation</strong> and secure VPC
                    configuration
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>DDoS protection</strong> and rate limiting
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>24/7 monitoring</strong> and incident response
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <Key className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
              <CardTitle className="text-gray-900 dark:text-white">
                Access Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Multi-factor authentication</strong> for all
                    accounts
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Role-based permissions</strong> and principle of
                    least privilege
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Session management</strong> with automatic timeouts
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Access logging</strong> and audit trails
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <Users className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-2" />
              <CardTitle className="text-gray-900 dark:text-white">
                Team Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-600 dark:bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Background checks</strong> for all team members
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-600 dark:bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Security training</strong> and regular updates
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-600 dark:bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Limited access</strong> to production systems
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-600 dark:bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
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
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Compliance & Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-8">
              <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 mb-4">
                Certified
              </Badge>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                SOC 2 Type II
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Independently audited for security, availability, and
                confidentiality controls.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-8">
              <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 mb-4">
                Compliant
              </Badge>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                GDPR
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Full compliance with European Union data protection regulations.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-8">
              <Badge className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 mb-4">
                Compliant
              </Badge>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                CCPA
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Adherence to California Consumer Privacy Act requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Data Protection Promise */}
      <div className="mb-16">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8">
            <div className="text-center">
              <Shield className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Data Protection Promise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    ✅ We NEVER:
                  </h3>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Use your documents to train AI models</li>
                    <li>• Share your content with third parties</li>
                    <li>• Access your documents without permission</li>
                    <li>• Store unnecessary personal information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    ✅ We ALWAYS:
                  </h3>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300">
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
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Security Best Practices for Users
        </h2>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mb-2" />
            <CardTitle className="text-gray-900 dark:text-white">
              Protect Your Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Account Security
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use a strong, unique password</li>
                  <li>• Enable two-factor authentication</li>
                  <li>• Log out from shared devices</li>
                  <li>• Monitor account activity regularly</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Document Safety
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
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
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Security Incident Response
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
              We have a comprehensive incident response plan to quickly address
              any security concerns.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  🚨 Detection
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  24/7 monitoring and automated threat detection systems
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ⚡ Response
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Immediate containment and investigation within 1 hour
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  📢 Communication
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Transparent communication and affected user notification
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Security Team */}
      <div className="text-center bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Security Questions or Concerns?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Our security team is here to address any questions about our security
          practices.
        </p>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
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
