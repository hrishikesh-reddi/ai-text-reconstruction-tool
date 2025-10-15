"use client";

import ChronosInterface from "@/components/ChronosInterface";
import { Card } from "@/components/ui/card";
import { Sparkles, Clock, Globe, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-12 h-12 text-primary animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Project Chronos
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            The AI Archaeologist
          </p>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Reconstruct fragmented historical web content using Google Gemini AI and contextual web searches. 
            Piece together digital artifacts from early internet to modern times.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
            <Card className="p-4 border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
              <div className="flex flex-col items-center text-center space-y-2">
                <Sparkles className="w-8 h-8 text-primary" />
                <h3 className="font-semibold">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Google Gemini reconstructs and expands fragmented text
                </p>
              </div>
            </Card>
            
            <Card className="p-4 border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
              <div className="flex flex-col items-center text-center space-y-2">
                <Globe className="w-8 h-8 text-primary" />
                <h3 className="font-semibold">Contextual Sources</h3>
                <p className="text-sm text-muted-foreground">
                  Searches Wikipedia, Know Your Meme, and more
                </p>
              </div>
            </Card>
            
            <Card className="p-4 border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
              <div className="flex flex-col items-center text-center space-y-2">
                <Zap className="w-8 h-8 text-primary" />
                <h3 className="font-semibold">Era Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Identifies time period and community context
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Interface */}
        <ChronosInterface />

        {/* Info Section */}
        <div className="mt-16 text-center space-y-4">
          <h2 className="text-2xl font-bold">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <Card className="p-4 border border-muted">
              <div className="font-bold text-primary mb-2">1. Input</div>
              <p className="text-sm text-muted-foreground">
                Enter fragmented text from old forums, chat rooms, or social media
              </p>
            </Card>
            
            <Card className="p-4 border border-muted">
              <div className="font-bold text-primary mb-2">2. Reconstruct</div>
              <p className="text-sm text-muted-foreground">
                AI expands abbreviations and completes phrases with confidence scores
              </p>
            </Card>
            
            <Card className="p-4 border border-muted">
              <div className="font-bold text-primary mb-2">3. Search</div>
              <p className="text-sm text-muted-foreground">
                Finds authoritative sources to provide cultural context
              </p>
            </Card>
            
            <Card className="p-4 border border-muted">
              <div className="font-bold text-primary mb-2">4. Report</div>
              <p className="text-sm text-muted-foreground">
                Generate comprehensive reconstruction report with sources
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}