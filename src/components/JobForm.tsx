
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { JobListing } from '@/types/job';
import { Plus } from 'lucide-react';

interface JobFormProps {
  onSubmit: (listing: Omit<JobListing, 'id' | 'dateAdded'>) => void;
  initialValues?: Partial<JobListing>;
  trigger?: React.ReactNode;
  title?: string;
}

export const JobForm = ({ onSubmit, initialValues, trigger, title = "Add New Job" }: JobFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: initialValues?.title || '',
    company: initialValues?.company || '',
    location: initialValues?.location || '',
    salary: initialValues?.salary || '',
    url: initialValues?.url || '',
    notes: initialValues?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.company.trim() && formData.url.trim()) {
      onSubmit(formData);
      setFormData({ title: '', company: '', location: '', salary: '', url: '', notes: '' });
      setIsOpen(false);
    }
  };

  const defaultTrigger = (
    <Button className="gap-2 bg-green-600 hover:bg-green-700">
      <Plus size={16} />
      Add Job
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              placeholder="e.g. Tech Company Inc."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g. Remote / New York, NY"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary">Salary</Label>
            <Input
              id="salary"
              value={formData.salary}
              onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
              placeholder="e.g. $80,000 - $120,000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Job URL</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://example.com/job-posting"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional notes about this job..."
              className="min-h-[80px]"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              Save Job
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
