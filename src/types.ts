export interface CaseStudy {
  id: string;
  client: string;
  stage: string;
  title: string;
  metric: string;
  summary: string;
  deliverables: string[];
  deliverablesDetail: string;
  accentNote: string;
}

export interface BookingFormState {
  fullName: string;
  workEmail: string;
  startupName: string;
  stage: 'Idea / Pre-seed' | 'Seed' | 'Series A' | 'Bootstrapped';
  primaryNeed: '0-to-1 MVP' | 'Fundraising Pitch & Demo' | 'Design System' | 'Growth Redesign';
  preferredDate: string;
  notes: string;
}
