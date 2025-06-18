import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Users,
  Lightbulb,
  Shield,
  Heart,
  Zap,
  Globe,
  Award,
  MessageSquare,
  BookOpen,
  Rocket,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <MaxWidthWrapper className="py-24">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-0">
          <BookOpen className="w-3 h-3 mr-1" />
          Our Story
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
          Transforming how the world
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block">
            interacts with documents
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          At Fable, we believe that every document contains a story waiting to
          be discovered. Our mission is to unlock the knowledge hidden in your
          documents through the power of AI.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              To democratize access to information by making every document
              searchable, understandable, and actionable through intelligent AI
              conversations. We&apos;re building a future where knowledge barriers
              disappear and insights are just a question away.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-4">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              A world where every professional, student, and researcher can
              instantly access the knowledge they need from any document. We
              envision AI as the bridge between human curiosity and the vast
              ocean of information in our documents.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* The Story Behind Fable */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          The Story Behind Fable
        </h2>
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 lg:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Fable was born from a simple frustration: spending hours
                  searching through documents for specific information. Our
                  founders, while working on research projects, realized that
                  despite having access to thousands of papers and reports,
                  finding the exact insights they needed was like looking for a
                  needle in a haystack.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The breakthrough came when we realized that AI could not just
                  read documents, but truly understand them and engage in
                  meaningful conversations about their content. This wasn&apos;t just
                  about search – it was about creating an intelligent companion
                  that could help unlock the knowledge hidden within every
                  document.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Today, Fable serves thousands of professionals, researchers,
                  and students worldwide, helping them save hours of work and
                  discover insights they never knew existed. Every conversation
                  with a document brings us closer to our vision of truly
                  accessible knowledge.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="h-8 w-8 text-green-600" />,
              title: "Privacy First",
              description:
                "Your documents and conversations are private. We never train our AI models on your content and implement enterprise-grade security.",
              gradient: "from-green-500 to-emerald-500",
            },
            {
              icon: <Users className="h-8 w-8 text-blue-600" />,
              title: "User-Centric",
              description:
                "Every feature we build starts with understanding our users&apos; needs. Your feedback drives our product roadmap and innovations.",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: <Zap className="h-8 w-8 text-purple-600" />,
              title: "Innovation",
              description:
                "We&apos;re constantly pushing the boundaries of what&apos;s possible with AI and document understanding to bring you cutting-edge capabilities.",
              gradient: "from-purple-500 to-pink-500",
            },
            {
              icon: <Heart className="h-8 w-8 text-red-600" />,
              title: "Accessibility",
              description:
                "Knowledge should be accessible to everyone. We&apos;re committed to making Fable affordable and easy to use for all.",
              gradient: "from-red-500 to-orange-500",
            },
            {
              icon: <Globe className="h-8 w-8 text-indigo-600" />,
              title: "Global Impact",
              description:
                "We&apos;re building for a global community, supporting multiple languages and diverse document types from around the world.",
              gradient: "from-indigo-500 to-purple-500",
            },
            {
              icon: <Award className="h-8 w-8 text-yellow-600" />,
              title: "Excellence",
              description:
                "We maintain the highest standards in everything we do, from code quality to customer support to AI accuracy.",
              gradient: "from-yellow-500 to-orange-500",
            },
          ].map((value, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.gradient} bg-opacity-10 flex items-center justify-center mx-auto mb-4`}
                >
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Moahmed Ben Taher",
              role: "CEO & Co-Founder",
              bio: "Senior AI Software Engineer with 10+ years in machine learning and document processing.",
              avatar: "SC",
              gradient: "from-blue-500 to-indigo-600",
            },
            {
              name: "Emily Johnson",
              role: "Head of Product",
              bio: "Product leader with experience at Notion and Figma, passionate about user-centered design.",
              avatar: "EJ",
              gradient: "from-green-500 to-emerald-600",
            },
          ].map((member, index) => (
            <Card key={index} className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${member.gradient} rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4`}
                >
                  {member.avatar}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            We&apos;re growing! Join our team of passionate builders.
          </p>
          <Button variant="outline" asChild>
            <Link href="#" className="inline-flex items-center">
              <Users className="w-4 h-4 mr-2" />
              View Open Positions
            </Link>
          </Button>
        </div>
      </div>

      {/* Technology & Approach */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Technology Approach
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="h-6 w-6 text-blue-600 mr-3" />
                Advanced AI Models
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We leverage state-of-the-art large language models combined with
                specialized document understanding algorithms to provide
                accurate, contextual responses to your questions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">
                    Custom fine-tuned models for document analysis
                  </span>
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">
                    Multi-modal understanding (text, tables, images)
                  </span>
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">
                    Continuous learning and improvement
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 text-green-600 mr-3" />
                Security & Privacy
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Built from the ground up with enterprise-grade security and
                privacy controls. Your data is encrypted, protected, and never
                used to train our models.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">End-to-end encryption</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">SOC 2 Type II compliance</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Zero data retention policy</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Milestones */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Our Journey
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {[
              {
                year: "2024",
                title: "Fable 2.0 Launch",
                description:
                  "Advanced AI models, team collaboration features, and enterprise security.",
                icon: <Rocket className="h-6 w-6 text-purple-600" />,
              },
              {
                year: "2023",
                title: "50,000+ Users",
                description:
                  "Reached 50,000 active users and processed over 1 million documents.",
                icon: <Users className="h-6 w-6 text-blue-600" />,
              },
              {
                year: "2023",
                title: "Series A Funding",
                description:
                  "Raised $10M to accelerate product development and team growth.",
                icon: <Award className="h-6 w-6 text-green-600" />,
              },
              {
                year: "2022",
                title: "Public Beta",
                description:
                  "Launched public beta with initial AI document chat capabilities.",
                icon: <MessageSquare className="h-6 w-6 text-orange-600" />,
              },
              {
                year: "2022",
                title: "Company Founded",
                description:
                  "Started Fable with the vision of making documents truly interactive.",
                icon: <Lightbulb className="h-6 w-6 text-yellow-600" />,
              },
            ].map((milestone, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  {milestone.icon}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="outline" className="text-sm">
                      {milestone.year}
                    </Badge>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-12 rounded-2xl text-white">
        <h2 className="text-3xl font-bold mb-4">
          Want to learn more about Fable?
        </h2>
        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          We&apos;d love to hear from you. Whether you have questions, feedback, or
          just want to chat about the future of document intelligence, we&apos;re
          here to listen.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/help-center" className="inline-flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Contact Us
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className=" bg-blue-600 border-white text-white hover:bg-white hover:text-purple-600"
            asChild
          >
            <Link href="/dashboard" className="inline-flex items-center">
              <Rocket className="w-5 h-5 mr-2" />
              Try Fable Free
            </Link>
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
