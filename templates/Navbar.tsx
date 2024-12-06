'use client'

import { ArrowRight, Sparkles, Zap, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar' // Import the Navbar component
import { Session } from 'next-auth'

export default function LandingPage({ session }: { session: Session | null }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* Navbar */}
      <Navbar session={session} />

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
              Create. Generate. Elevate!
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-gray-300">
            Unleash the power of AI to transform your social media presence
          </p>
          <div>
            <Button className="bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold py-3 px-8 rounded-full text-lg hover:from-orange-500 hover:to-amber-400 transition-all duration-300">
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white/5 backdrop-blur-lg py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
                Powerful Features
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Sparkles className="w-8 h-8 text-amber-400" />}
                title="AI-Powered Captions"
                description="Generate engaging captions tailored to your images in seconds."
              />
              <FeatureCard 
                icon={<Zap className="w-8 h-8 text-orange-500" />}
                title="Instant Hashtag Suggestions"
                description="Get trending and relevant hashtags to boost your post's visibility."
              />
              <FeatureCard 
                icon={<Rocket className="w-8 h-8 text-red-500" />}
                title="Performance Analytics"
                description="Track your post's performance and get AI-driven insights."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to elevate your social media game?
          </h3>
          <p className="text-xl mb-10 text-gray-300">
            Join thousands of creators who are already using KreateAI
          </p>
          <Button className="bg-white text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-400 transition-all duration-300">
            Start Your Free Trial
          </Button>
        </section>

        {/* Footer */}
        <footer className="bg-white/5 backdrop-blur-lg py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl font-extrabold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                    Kreate
                  </span>
                  <span className="text-white">AI</span>
                </h1>
              </div>
              <nav className="mb-4 md:mb-0">
                <ul className="flex space-x-6">
                  <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Us</a></li>
                </ul>
              </nav>
              <div className="text-sm text-gray-400">
                © 2023 KreateAI. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}
