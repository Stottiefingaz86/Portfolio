export const RINGSAWAY_PROMPTS = [
  {
    id: 'business',
    label: 'Can you tell me more about the business?',
    response:
      'We are a modern Italian restaurant in the city centre, open Tuesday to Sunday, lunch and dinner service.',
  },
  {
    id: 'book',
    label: "I'd like to book an appointment",
    response:
      'Of course. What day works for you, and how many guests should I expect?',
  },
  {
    id: 'availability',
    label: "What's your availability?",
    response:
      'We have tables tonight at 7:30 PM and 9:00 PM, or I can check tomorrow afternoon if you prefer.',
  },
  {
    id: 'cost',
    label: 'How much does it cost?',
    response:
      'Tasting menus start at €45 per person. À la carte mains are typically between €18 and €32.',
  },
  {
    id: 'location',
    label: 'Where are you located?',
    response:
      'We are on Calle Mayor 12, five minutes from the marina, with valet parking after 7 PM.',
  },
  {
    id: 'reschedule',
    label: 'Can I reschedule my appointment?',
    response:
      'Happy to help. I can move your booking to Friday at 8:15 PM. Shall I confirm that for you?',
  },
] as const;

export const RINGSAWAY_PHONE = '+34 919 93 52 38';

export const RINGSAWAY_CALL_LINES = [
  'Connecting to RingsAway…',
  'Hi, thanks for calling. How can I help you today?',
  'Perfect, I have a table for four at 7:30 PM.',
  'Booking confirmed. We will send a text reminder.',
] as const;
