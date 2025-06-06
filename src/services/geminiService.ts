interface GeminiJobListing {
  title: string;
  company: string;
  location: string;
  salary: string;
  url: string;
  notes: string;
}

const GEMINI_API_KEY = 'AIzaSyCtoqYTZTWJpZ20yOWTdVhwHeqfanq9Cds';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export const generateJobListings = async (prompt: string): Promise<GeminiJobListing[]> => {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Search the internet for current job openings and generate 5 realistic job listings based on this request: "${prompt}". 
            Use Google Search to find actual job postings from popular job boards like LinkedIn, Indeed, Glassdoor, AngelList, and company career pages.
            
            Return ONLY a valid JSON array with this exact structure:
            [
              {
                "title": "Job Title",
                "company": "Company Name", 
                "location": "Location",
                "salary": "Salary Range or 'Not specified'",
                "url": "https://actual-job-board-url.com/job-posting",
                "notes": "Brief description of the role and requirements"
              }
            ]
            
            Make sure to:
            - Use real company names and actual job titles
            - Include accurate salary ranges based on current market data
            - Provide actual URLs to job postings when possible (LinkedIn, Indeed, company sites)
            - Include relevant location information (Remote, City/State, Hybrid)
            - Add brief but informative notes about each role`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini API Response:', data);
    
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      throw new Error('No response from Gemini API');
    }

    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const jobListings = JSON.parse(jsonMatch[0]);
    
    // Log the grounding metadata if available
    if (data.candidates?.[0]?.groundingMetadata) {
      console.log('Grounding sources:', data.candidates[0].groundingMetadata);
    }
    
    return jobListings;
  } catch (error) {
    console.error('Error generating job listings:', error);
    throw error;
  }
};
