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

export interface InquiryFormState {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  budget: string;
  timeline: string;
  notes: string;
}

export interface BookingFormState extends InquiryFormState {}
