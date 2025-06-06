
import { JobForm } from './JobForm';
import { JobListing } from '@/types/job';

interface HeaderProps {
  onAddJob: (listing: Omit<JobListing, 'id' | 'dateAdded'>) => void;
  jobCount: number;
}

export const Header = ({ onAddJob, jobCount }: HeaderProps) => {
  return (
    <header className="border-b bg-green-50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-green-800">Catleya</h1>
            <p className="text-green-600 mt-1">
              For Kayangg Job Hunting
              {jobCount > 0 && (
                <span className="ml-2 text-sm">
                  • {jobCount} {jobCount === 1 ? 'listing' : 'listings'}
                </span>
              )}
            </p>
          </div>
          <JobForm onSubmit={onAddJob} />
        </div>
      </div>
    </header>
  );
};
