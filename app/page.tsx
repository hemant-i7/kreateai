'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Camera, Send, Copy, Grid, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const promptSuggestions = [
  "Create a witty caption with trending hashtags",
  "Generate an inspirational quote related to the image",
  "Craft a mysterious caption to intrigue followers",
  "Compose a caption that tells a story about the image"
]

export default function SocialMediaCaptionGenerator() {
  const [image, setImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image) return

    setIsLoading(true)

    const formData = new FormData()
    formData.append('prompt', prompt || 'Generate a catchy social media caption for this image with relevant hashtags and emojis')
    formData.append('image', await fetch(image).then(r => r.blob()), 'image.jpg')

    try {
      const res = await fetch('/api/gemini-vision', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error('Failed to fetch response')
      }

      const data = await res.json()
      setResponse(data.text)
    } catch (error) {
      console.error('Error:', error)
      setResponse('Failed to generate caption 😕')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
     <div className="px-10 mx-10 text-3xl font-bold mt-6 text-amber-400 font-extrabold">
      KreateAI
     </div>
        
      {/* Glassmorphism background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <Grid className="w-full h-full text-gray-800" />
      </div>
      
      <div className="relative container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">''
        <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
              <Sparkles className="inline-block mr-2 text-[#FF9B4B]" />
              AI Caption Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-48 border border-white/20 rounded-xl flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all overflow-hidden"
                >
                  {image ? (
                    <Image src={image} alt="Uploaded image" layout="fill" objectFit="cover" className="rounded-xl" />
                  ) : (
                    <div className="text-center">
                      <Camera className="mx-auto h-12 w-12 text-[#FF9B4B]" />
                      <p className="mt-2 text-sm text-gray-300">Drop your image here or click to upload 📸</p>
                    </div>
                  )}
                </Button>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  ref={fileInputRef}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Prompt Suggestions</label>
                <div className="flex flex-wrap gap-2">
                  {promptSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      type="button"
                      onClick={() => setPrompt(suggestion)}
                      variant="outline"
                      className="text-xs bg-white/5 border-white/10 text-gray-300"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="✨ Customize your caption prompt or leave blank for AI magic"
                disabled={isLoading}
                rows={3}
                className="bg-black/20 border-white/20 focus:border-[#FF9B4B] rounded-xl text-white"
              />
              
              <Button 
                type="submit" 
                disabled={isLoading || !image}
                className="w-full bg-[#FF9B4B]    text-black font-medium py-3 rounded-xl transition-all duration-200 ease-in-out"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full"></div>
                    Generating...
                  </div>
                ) : (
                  <>
                    Generate Caption <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {response && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 rounded-xl p-4 bg-white/10 border border-white/20"
              >
                <div className="absolute top-4 left-4 z-10">
       
      </div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-medium text-[#FF9B4B] flex items-center">
                    <Sparkles className="mr-2 h-4 w-4" /> Your Caption
                  </h2>
                  <Button 
                    onClick={() => copyToClipboard(response)}
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-wrap">{response}</p>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

