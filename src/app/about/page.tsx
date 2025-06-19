import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Target,
  Lightbulb,
  Heart,
  Award,
  Globe,
  Zap,
  Shield,
  MessageSquare,
} from "lucide-react";

import Link from "next/link";

export default function AboutPage() {
  return (
    <MaxWidthWrapper className="py-24">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 text-blue-700 dark:text-blue-300 border-0">
          <Heart className="w-3 h-3 mr-1" />
          Our Story
        </Badge>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Making documents
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {" "}
            intelligent
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          We believe that every document contains valuable insights waiting to
          be discovered. Fable transforms static documents into dynamic,
          interactive conversations through the power of AI.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <Target className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
            <CardTitle className="text-2xl text-gray-900 dark:text-white">
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To democratize access to information by making document analysis
              as simple as having a conversation. We&apos;re building AI tools that
              understand context, extract insights, and help people make better
              decisions faster.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <Lightbulb className="h-10 w-10 text-purple-600 dark:text-purple-400 mb-4" />
            <CardTitle className="text-2xl text-gray-900 dark:text-white">
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A world where knowledge is instantly accessible and actionable.
              Where researchers, students, and professionals can focus on
              insights rather than searching through documents.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Key Features */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            What Makes Fable Different
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We&apos;ve reimagined how people interact with documents, making AI
            accessible and intuitive for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg dark:hover:shadow-gray-700/20 transition-all bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-8">
              <MessageSquare className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Conversational AI
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ask questions in natural language and get instant, contextual
                answers from your documents.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg dark:hover:shadow-gray-700/20 transition-all bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-8">
              <Shield className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Privacy First
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your documents are encrypted and never used to train our models.
                Your data stays yours.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg dark:hover:shadow-gray-700/20 transition-all bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-8">
              <Zap className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get insights in seconds, not hours. Our AI processes documents
                instantly for immediate analysis.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Meet the Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We&apos;re a passionate team of engineers, designers, and researchers
            united by our mission to make AI accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Moahmed Ben Taher",
              role: "CEO & Co-founder",
              bio: "Senior AI Software Engineer with 10+ years in machine learning and document processing.",
              image: "/team/alex.jpg",
            },

            {
              name: "Marcus Rodriguez",
              role: "Head of Product",
              bio: "Product designer turned PM with a focus on making complex technology simple and intuitive.",
              image: "/team/marcus.jpg",
            },
          ].map((member, index) => (
            <Card
              key={index}
              className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Values
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The principles that guide everything we do at Fable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: (
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              ),
              title: "User-Centric",
              description:
                "Every feature we build starts with understanding our users&apos; needs.",
            },
            {
              icon: (
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              ),
              title: "Privacy First",
              description:
                "We believe privacy is a fundamental right, not a luxury.",
            },
            {
              icon: (
                <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              ),
              title: "Excellence",
              description:
                "We strive for the highest quality in everything we deliver.",
            },
            {
              icon: (
                <Globe className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              ),
              title: "Accessibility",
              description:
                "AI should be accessible to everyone, regardless of technical expertise.",
            },
          ].map((value, index) => (
            <Card
              key={index}
              className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <CardContent className="p-6">
                <div className="mb-4">{value.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Company Stats */}
      <div className="mb-20">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Fable by the Numbers
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Growing every day thanks to our amazing users
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  50K+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Active Users
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  1M+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Documents Processed
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  10M+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  AI Conversations
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  99.9%
                </div>
                <div className="text-gray-600 dark:text-gray-400">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Join Us CTA */}
      <div className="text-center bg-gray-50 dark:bg-gray-800 p-12 rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Join Our Journey
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          We&apos;re always looking for talented people who share our passion for
          making AI accessible and useful for everyone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pricing"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Try Fable Today
          </Link>
          <Link
            href="/help-center"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
