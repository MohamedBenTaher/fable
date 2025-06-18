import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Star,
  CheckCircle,
  Users,
  FileText,
  MessageSquare,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Quote,
  Play,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      {/* Hero Section */}
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        {/* Announcement Banner */}
        <div className="mx-auto mb-8 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 px-7 py-2 shadow-md backdrop-blur transition-all hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg">
          <Badge
            variant="secondary"
            className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-0"
          >
            🎉 New
          </Badge>
          <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">
            AI-powered document analysis now available
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="max-w-5xl text-5xl font-bold md:text-6xl lg:text-7xl text-gray-900 dark:text-white mb-6">
          Transform your{" "}
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            documents
          </span>{" "}
          into intelligent conversations
        </h1>

        {/* Subheadline */}
        <p className="mt-5 max-w-prose text-xl text-gray-700 dark:text-gray-300 sm:text-xl mb-8">
          Upload any PDF and start chatting with AI to extract insights,
          summarize content, and get instant answers. Perfect for researchers,
          students, and professionals.
        </p>

        {/* Social Proof Numbers */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-10 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>
              <strong className="text-gray-900 dark:text-white">50,000+</strong>{" "}
              users
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span>
              <strong className="text-gray-900 dark:text-white">1M+</strong>{" "}
              documents processed
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span>
              <strong className="text-gray-900 dark:text-white">4.9/5</strong>{" "}
              rating
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            className={buttonVariants({
              size: "lg",
              className:
                "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all",
            })}
            href="/dashboard"
          >
            Start for free
            <ArrowRight size={20} className="ml-2" />
          </Link>
          <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-full flex items-center justify-center hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800/50 dark:hover:to-indigo-800/50 transition-colors">
              <Play className="h-5 w-5 text-blue-600 dark:text-blue-400 ml-1" />
            </div>
            <span className="font-medium">Watch demo</span>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-xs text-gray-500 dark:text-gray-400">
          <span>✓ No credit card required</span>
          <span className="mx-3">•</span>
          <span>✓ 5 free documents</span>
          <span className="mx-3">•</span>
          <span>✓ Setup in 2 minutes</span>
        </div>
      </MaxWidthWrapper>

      {/* Product Preview */}
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 dark:opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-white/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <Image
                  src="/dashboard-preview.jpg"
                  alt="Fable dashboard showing AI chat interface with PDF document"
                  width={1364}
                  height={866}
                  quality={100}
                  className="rounded-md bg-white dark:bg-gray-800 p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto mb-32 mt-32 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 text-blue-700 dark:text-blue-300 border-0">
            <Zap className="w-3 h-3 mr-1" />
            Powered by AI
          </Badge>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent sm:text-5xl">
            Everything you need to unlock your documents
          </h2>
          <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
            Advanced AI technology meets intuitive design to transform how you
            interact with documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              ),
              title: "Intelligent Conversations",
              description:
                "Ask questions and get instant answers from your documents using advanced AI.",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: (
                <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              ),
              title: "Instant Summarization",
              description:
                "Get key insights and summaries from lengthy documents in seconds.",
              gradient: "from-purple-500 to-pink-500",
            },
            {
              icon: (
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              ),
              title: "Secure & Private",
              description:
                "Your documents are encrypted and processed securely. We never store your content.",
              gradient: "from-green-500 to-emerald-500",
            },
            {
              icon: (
                <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              ),
              title: "Save Hours Daily",
              description:
                "Reduce document review time by 80% with AI-powered analysis and extraction.",
              gradient: "from-orange-500 to-red-500",
            },
            {
              icon: (
                <FileText className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              ),
              title: "Multiple Formats",
              description:
                "Support for PDFs, Word docs, research papers, and more file types.",
              gradient: "from-indigo-500 to-purple-500",
            },
            {
              icon: (
                <TrendingUp className="h-8 w-8 text-teal-600 dark:text-teal-400" />
              ),
              title: "Export & Share",
              description:
                "Export insights, share conversations, and collaborate with your team.",
              gradient: "from-teal-500 to-blue-500",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Social Proof / Testimonials */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 dark:from-blue-950/20 dark:via-gray-900 dark:to-indigo-950/20 py-24">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
              Trusted by thousands of professionals
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See what our users are saying about Fable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Fable transformed how I research. I can now extract insights from academic papers in minutes instead of hours.",
                author: "Dr. Sarah Chen",
                role: "Research Scientist",
                avatar: "SC",
              },
              {
                quote:
                  "The AI conversations feature is incredible. It&apos;s like having a research assistant that never sleeps.",
                author: "Marcus Rodriguez",
                role: "Legal Analyst",
                avatar: "MR",
              },
              {
                quote:
                  "My team&apos;s productivity increased by 3x since we started using Fable for document analysis.",
                author: "Emily Johnson",
                role: "Product Manager",
                avatar: "EJ",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white dark:bg-gray-800"
              >
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </MaxWidthWrapper>
      </div>

      {/* How it Works */}
      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-6">
          <div className="mx-auto max-w-2xl sm:text-center">
            <Badge className="mb-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 text-green-700 dark:text-green-300 border-0">
              <CheckCircle className="w-3 h-3 mr-1" />
              Simple Process
            </Badge>
            <h2 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              Start chatting with your documents in seconds
            </h2>
            <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
              Our streamlined process gets you from upload to insights in under
              2 minutes.
            </p>
          </div>
        </div>

        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-blue-300 dark:border-blue-700 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Step 1
              </span>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Create your account
              </span>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Sign up for free in seconds. No credit card required. Choose
                from our{" "}
                <Link
                  href="/pricing"
                  className="text-blue-700 dark:text-blue-300 underline underline-offset-2 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  flexible pricing plans
                </Link>{" "}
                as you grow.
              </p>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-green-300 dark:border-green-700 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Step 2
              </span>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Upload your document
              </span>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Drag and drop any PDF, Word doc, or research paper. Our AI
                instantly processes and indexes your content for intelligent
                conversations.
              </p>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-purple-300 dark:border-purple-700 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Step 3
              </span>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Start the conversation
              </span>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Ask questions, request summaries, or extract key insights.
                Export your findings and share with your team for seamless
                collaboration.
              </p>
            </div>
          </li>
        </ol>

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-white/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/file-upload-preview.jpg"
                alt="File upload interface showing drag and drop functionality"
                width={1419}
                height={732}
                quality={100}
                className="rounded-md bg-white dark:bg-gray-800 p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Teaser */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/20 py-24">
        <MaxWidthWrapper>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Start free, upgrade when you need more power
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Free
                  </h3>
                  <div className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    $0
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    5 documents/month
                  </p>
                  <Link
                    href="/sign-up"
                    className={buttonVariants({
                      variant: "outline",
                      className:
                        "w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700",
                    })}
                  >
                    Get Started
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-500 dark:border-blue-400 relative bg-white dark:bg-gray-800">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                  Most Popular
                </Badge>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Pro
                  </h3>
                  <div className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    $19
                    <span className="text-lg text-gray-600 dark:text-gray-400">
                      /mo
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Unlimited documents
                  </p>
                  <Link
                    href="/pricing"
                    className={buttonVariants({
                      className: "w-full bg-blue-600 hover:bg-blue-700",
                    })}
                  >
                    Upgrade to Pro
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Enterprise
                  </h3>
                  <div className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    $49
                    <span className="text-lg text-gray-600 dark:text-gray-400">
                      /mo
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Team features + SSO
                  </p>
                  <Link
                    href="/pricing"
                    className={buttonVariants({
                      variant: "outline",
                      className:
                        "w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700",
                    })}
                  >
                    Contact Sales
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Link
                href="/pricing"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                View detailed pricing →
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-24">
        <MaxWidthWrapper>
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold sm:text-5xl mb-6">
              Ready to transform your document workflow?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join thousands of professionals who are already saving hours every
              day with Fable&apos;s AI-powered document analysis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                href="/dashboard"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all",
                })}
              >
                Start for free today
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link
                href="/pricing"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className:
                    "border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all",
                })}
              >
                View pricing
              </Link>
            </div>

            <div className="mt-8 text-sm text-blue-100">
              <span>✓ No credit card required</span>
              <span className="mx-3">•</span>
              <span>✓ Setup in under 2 minutes</span>
              <span className="mx-3">•</span>
              <span>✓ Cancel anytime</span>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
