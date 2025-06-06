
import { useState } from 'react';
import { Header } from '@/components/Header';
import { JobCard } from '@/components/JobCard';
import { JobForm } from '@/components/JobForm';
import { useJobListings } from '@/hooks/useJobListings';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, BookOpen } from 'lucide-react';

const Index = () => {
  const { jobListings, addJobListing, updateJobListing, deleteJobListing } = useJobListings();

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <BookOpen size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No job listings yet</h3>
        <p className="text-muted-foreground mb-6">
          Start building your job search by adding your first listing. Keep track of applications and opportunities in one place.
        </p>
        <JobForm 
          onSubmit={addJobListing}
          trigger={
            <Card className="cursor-pointer hover:shadow-md transition-all duration-200 border-dashed border-2 hover:border-primary/50">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Plus size={24} className="text-muted-foreground mb-2" />
                <span className="text-sm font-medium">Add your first job</span>
              </CardContent>
            </Card>
          }
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
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
  );
};

export default Index;
