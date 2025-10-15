"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ReconstructionReport from "./ReconstructionReport";

interface ReconstructionData {
  mostLikely: string;
  confidence: number;
  alternatives: Array<{ text: string; confidence: number }>;
  era: string;
  community: string;
  keyTerms: Array<{ original: string; expanded: string; meaning: string }>;
  reasoning: string;
}

interface Source {
  title: string;
  url: string;
  snippet: string;
  credibility: number;
  relevanceReason: string;
}

export default function ChronosInterface() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reconstructionData, setReconstructionData] = useState<ReconstructionData | null>(null);
  const [sources, setSources] = useState<Source[]>([]);
  const [processingTime, setProcessingTime] = useState(0);
  const [originalText, setOriginalText] = useState("");

  const exampleFragments = [
    "lol ur so lame. asl?",
    "omg just posted a thirst trap on insta",
    "noob got pwned. git gud lmao",
    "smh at the top 8 drama. ppl need to chill. g2g, ttyl",
    "idk tbh ngl this is fire fr fr",
    "bump! does anyone know about this?",
  ];

  const handleReconstruct = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to reconstruct");
      return;
    }

    setLoading(true);
    setError("");
    setReconstructionData(null);
    setSources([]);
    setOriginalText(inputText);

    const startTime = performance.now();

    try {
      // Step 1: Reconstruct text with Gemini
      const reconstructResponse = await fetch("/api/reconstruct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      if (!reconstructResponse.ok) {
        const errorData = await reconstructResponse.json();
        throw new Error(errorData.error || "Failed to reconstruct text");
      }

      const reconstructResult = await reconstructResponse.json();
      setReconstructionData(reconstructResult.data);

      // Step 2: Search for contextual sources
      // Search for the reconstructed text
      const searchResponse = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          query: reconstructResult.data.mostLikely,
          searchType: "main"
        }),
      });

      if (searchResponse.ok) {
        const searchResult = await searchResponse.json();
        setSources(searchResult.sources || []);
      }

      const endTime = performance.now();
      setProcessingTime((endTime - startTime) / 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      console.error("Reconstruction error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadExample = (example: string) => {
    setInputText(example);
    setReconstructionData(null);
    setSources([]);
    setError("");
  };

  return (
    <div className="w-full space-y-8">
      {/* Input Section */}
      <Card className="p-6 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="space-y-4">
          <div>
            <label htmlFor="fragment-input" className="block text-lg font-semibold mb-2">
              Enter Fragmented Text
            </label>
            <Textarea
              id="fragment-input"
              placeholder="Type or paste fragmented internet text here... (e.g., 'omg ur so lame asl?')"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] text-base font-mono"
              disabled={loading}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <p className="text-sm text-muted-foreground w-full mb-1">Quick examples:</p>
            {exampleFragments.map((example, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => loadExample(example)}
                disabled={loading}
                className="text-xs"
              >
                {example}
              </Button>
            ))}
          </div>

          <Button
            onClick={handleReconstruct}
            disabled={loading || !inputText.trim()}
            size="lg"
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Reconstructing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Reconstruct Text
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Results Display */}
      {reconstructionData && (
        <ReconstructionReport
          originalText={originalText}
          reconstructionData={reconstructionData}
          sources={sources}
          processingTime={processingTime}
        />
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold">Analyzing fragment...</p>
            <p className="text-sm text-muted-foreground">
              AI is reconstructing the text and searching for contextual sources
            </p>
          </div>
        </div>
      )}
    </div>
  );
}