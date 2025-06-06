
import { useState, useEffect } from 'react';
import { JobListing } from '@/types/job';

const STORAGE_KEY = 'catleya-job-listings';

export const useJobListings = () => {
  const [jobListings, setJobListings] = useState<JobListing[]>([]);

  useEffect(() => {
    const savedListings = localStorage.getItem(STORAGE_KEY);
    if (savedListings) {
      try {
        setJobListings(JSON.parse(savedListings));
      } catch (error) {
        console.error('Failed to parse saved job listings:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobListings));
  }, [jobListings]);

  const addJobListing = (listing: Omit<JobListing, 'id' | 'dateAdded'>) => {
    const newListing: JobListing = {
      ...listing,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
    };
    setJobListings(prev => [newListing, ...prev]);
  };

  const updateJobListing = (id: string, updates: Partial<JobListing>) => {
    setJobListings(prev =>
      prev.map(listing =>
        listing.id === id ? { ...listing, ...updates } : listing
      )
    );
  };

  const deleteJobListing = (id: string) => {
    setJobListings(prev => prev.filter(listing => listing.id !== id));
  };

  return {
    jobListings,
    addJobListing,
    updateJobListing,
    deleteJobListing,
  };
};
