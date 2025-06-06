
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { JobListing } from '@/types/job';
import { generateJobListings } from '@/services/geminiService';
import { Plus, Search, Loader2, Building, MapPin, DollarSign } from 'lucide-react';

interface AiJobSidebarProps {
  onAddJob: (listing: Omit<JobListing, 'id' | 'dateAdded'>) => void;
}

interface GeminiJobListing {
  title: string;
  company: string;
  location: string;
  salary: string;
  url: string;
  notes: string;
}

export const AiJobSidebar = ({ onAddJob }: AiJobSidebarProps) => {
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState<GeminiJobListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const jobListings = await generateJobListings(prompt);
      setSuggestions(jobListings);
    } catch (err) {
      setError('Failed to generate job suggestions. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSuggestion = (suggestion: GeminiJobListing) => {
    onAddJob(suggestion);
  };

  return (
    <div className="w-80 bg-green-50 border-l border-green-200 p-4 overflow-y-auto">
      <div className="sticky top-0 bg-green-50 pb-4">
        <h2 className="text-lg font-semibold text-green-800 mb-4">AI Job Suggestions</h2>
        
        <div className="space-y-3">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Frontend developer remote"
            className="border-green-200"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button 
            onClick={handleSearch} 
            disabled={isLoading || !prompt.trim()}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Search size={16} className="mr-2" />
                Find Jobs
              </>
            )}
          </Button>
        </div>

        {error && (
          <div className="mt-3 p-2 bg-red-100 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>

      <div className="space-y-3 mt-4">
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-800">{suggestion.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-green-600">
                  <Building size={12} />
                  <span className="text-xs">{suggestion.company}</span>
                </div>
                {suggestion.location && (
                  <div className="flex items-center gap-2 text-green-600">
                    <MapPin size={12} />
                    <span className="text-xs">{suggestion.location}</span>
                  </div>
                )}
                {suggestion.salary && (
                  <div className="flex items-center gap-2 text-green-600">
                    <DollarSign size={12} />
                    <span className="text-xs">{suggestion.salary}</span>
                  </div>
                )}
              </div>
              {suggestion.notes && (
                <p className="text-xs text-green-600 mb-3">{suggestion.notes}</p>
              )}
              <Button 
                size="sm" 
                onClick={() => handleAddSuggestion(suggestion)}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Plus size={12} className="mr-1" />
                Add to List
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
