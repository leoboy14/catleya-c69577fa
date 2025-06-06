
import { useState } from 'react';
import { Header } from '@/components/Header';
import { JobCard } from '@/components/JobCard';
import { JobForm } from '@/components/JobForm';
import { AiJobSidebar } from '@/components/AiJobSidebar';
import { useJobListings } from '@/hooks/useJobListings';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, BookOpen } from 'lucide-react';

const Index = () => {
  const { jobListings, addJobListing, updateJobListing, deleteJobListing } = useJobListings();

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <BookOpen size={24} className="text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-green-800">No job listings yet</h3>
        <p className="text-green-600 mb-6">
          Start building your job search by adding your first listing. Keep track of applications and opportunities in one place.
        </p>
        <JobForm 
          onSubmit={addJobListing}
          trigger={
            <Card className="cursor-pointer hover:shadow-md transition-all duration-200 border-dashed border-2 hover:border-green-400 border-green-200">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Plus size={24} className="text-green-600 mb-2" />
                <span className="text-sm font-medium text-green-700">Add your first job</span>
              </CardContent>
            </Card>
          }
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex">
      <div className="flex-1">
        <Header onAddJob={addJobListing} jobCount={jobListings.length} />
        
        <main className="container mx-auto px-4 py-8">
          {jobListings.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {jobListings.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onUpdate={updateJobListing}
                  onDelete={deleteJobListing}
                />
              ))}
            </div>
          )}
        </main>
      </div>
      
      <AiJobSidebar onAddJob={addJobListing} />
    </div>
  );
};

export default Index;
