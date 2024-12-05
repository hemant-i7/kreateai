"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Loader2, Sparkles, Copy, Check } from 'lucide-react';
import { toast } from "sonner";

interface GeneratedContent {
  caption: string;
  hashtags: string[];
}

export default function CaptionGenerator() {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedContent(null);

    try {
      const response = await fetch("/api/generate-caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate caption");
      }

      const content: GeneratedContent = await response.json();
      setGeneratedContent(content);
    } catch (err) {
      toast.error("Failed to generate caption. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (textareaRef.current) {
      navigator.clipboard.writeText(textareaRef.current.value);
      setIsCopied(true);
      toast.success("Caption copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-white">
            AI Caption Generator
          </h1>
          <p className="text-xl text-gray-400">
            Create engaging captions for your social media posts in seconds
          </p>
        </div>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              Generate Your Caption
            </CardTitle>
            <CardDescription className="text-gray-400">
              Describe your image or provide a topic for your caption
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="prompt"
                  className="text-sm font-medium text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Image Description or Topic
                </label>
                <Input
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A serene sunset over the ocean"
                  required
                  className="text-base bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-200 text-black font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Caption
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {generatedContent && (
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                Your AI-Generated Caption
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="caption" className="text-lg font-medium text-gray-300">
                  Caption
                </label>
                <div className="relative">
                  <Textarea
                    id="caption"
                    ref={textareaRef}
                    value={`${generatedContent.caption}\n\n${generatedContent.hashtags.join(" ")}`}
                    readOnly
                    className="min-h-[150px] p-3 rounded-md bg-gray-800 text-white border-gray-700 resize-none"
                  />
                  <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                    {generatedContent.caption.length} / 2200
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={copyToClipboard}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {isCopied ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-5 w-5" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}

