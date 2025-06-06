
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { JobListing } from '@/types/job';
import { JobForm } from './JobForm';
import { Link, Trash, Edit, MapPin, DollarSign, Building } from 'lucide-react';

interface JobCardProps {
  job: JobListing;
  onUpdate: (id: string, updates: Partial<JobListing>) => void;
  onDelete: (id: string) => void;
}

export const JobCard = ({ job, onUpdate, onDelete }: JobCardProps) => {
  const [showActions, setShowActions] = useState(false);

  const handleUpdate = (updates: Omit<JobListing, 'id' | 'dateAdded'>) => {
    onUpdate(job.id, updates);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card 
      className="group hover:shadow-md transition-all duration-200 hover:border-green-300 border-green-100"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight mb-2 text-green-800">{job.title}</CardTitle>
            <div className="flex flex-col gap-2 mb-2">
              <div className="flex items-center gap-2 text-green-600">
                <Building size={14} />
                <span className="text-sm font-medium">{job.company}</span>
              </div>
              {job.location && (
                <div className="flex items-center gap-2 text-green-600">
                  <MapPin size={14} />
                  <span className="text-sm">{job.location}</span>
                </div>
              )}
              {job.salary && (
                <div className="flex items-center gap-2 text-green-600">
                  <DollarSign size={14} />
                  <span className="text-sm">{job.salary}</span>
                </div>
              )}
            </div>
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
              Added {formatDate(job.dateAdded)}
            </Badge>
          </div>
          <div className={`flex gap-1 transition-opacity duration-200 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
            <JobForm
              onSubmit={handleUpdate}
              initialValues={job}
              title="Edit Job"
              trigger={
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit size={14} />
                </Button>
              }
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              onClick={() => onDelete(job.id)}
            >
              <Trash size={14} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {job.notes && (
          <CardDescription className="mb-3 text-sm leading-relaxed text-green-600">
            {job.notes}
          </CardDescription>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 w-full border-green-200 text-green-700 hover:bg-green-50" 
          asChild
        >
          <a href={job.url} target="_blank" rel="noopener noreferrer">
            <Link size={14} />
            View Job Posting
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};
