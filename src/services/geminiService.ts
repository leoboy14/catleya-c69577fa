
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
            text: `Search the internet and generate 5 realistic job listings based on this request: "${prompt}". 
            Find actual current job opportunities and return ONLY a valid JSON array with this exact structure:
            [
              {
                "title": "Job Title",
                "company": "Company Name",
                "location": "Location",
                "salary": "Salary Range or 'Not specified'",
                "url": "https://example.com/job",
                "notes": "Brief description of the role"
              }
            ]
            Make the URLs realistic job board links. Include current market salary ranges where possible.`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
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
    return jobListings;
  } catch (error) {
    console.error('Error generating job listings:', error);
    throw error;
  }
};
