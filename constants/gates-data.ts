// 12 Gates of The 33rd House + Gate 0 (The Threshold)

export interface Gate {
  id: number;
  name: string;
  zodiac: string;
  element: string;
  planet: string;
  duration: string;
  difficulty: string;
  description: string;
  purpose: string;
  practices: string[];
}

export const GATES_DATA: Gate[] = [
  {
    id: 0,
    name: "The Threshold",
    zodiac: "Sagittarius",
    element: "Fire",
    planet: "Jupiter",
    duration: "1-3 months",
    difficulty: "Beginner",
    description:
      "The Threshold is the beginning of the journey. It is the space between the old world and the new, where you stand at the edge of transformation. This Gate teaches you to pause, to listen, and to prepare for what lies ahead.",
    purpose:
      "To prepare the practitioner for the journey ahead. To create sacred space and intention. To release the old and welcome the new.",
    practices: [
      "Meditation on intention",
      "Journaling: What am I leaving behind?",
      "Ritual bath for purification",
      "Create a sacred altar",
      "Set journey intentions",
    ],
  },
  {
    id: 1,
    name: "The Warrior",
    zodiac: "Aries",
    element: "Fire",
    planet: "Mars",
    duration: "3-6 months",
    difficulty: "Intermediate",
    description:
      "The Warrior Gate awakens your inner strength and courage. Here you learn to fight for what matters, to stand your ground, and to wield your power with integrity. The warrior's path is one of discipline, honor, and fierce compassion.",
    purpose:
      "To develop courage, discipline, and the ability to fight for what is right. To learn healthy aggression and boundary-setting.",
    practices: [
      "Physical training (martial arts, yoga, running)",
      "Boundary-setting exercises",
      "Shadow work on anger",
      "Warrior breath (Kapalabhati)",
      "Daily courage challenges",
    ],
  },
  {
    id: 2,
    name: "The Builder",
    zodiac: "Taurus",
    element: "Earth",
    planet: "Venus",
    duration: "6-12 months",
    difficulty: "Intermediate",
    description:
      "The Builder Gate teaches you to create lasting structures in your life. This is the realm of manifestation, where dreams become reality through patience, persistence, and practical action. You learn to work with the material world.",
    purpose:
      "To develop patience, persistence, and the ability to manifest in the physical world. To build sustainable foundations.",
    practices: [
      "Daily routine building",
      "Financial planning and budgeting",
      "Gardening or plant care",
      "Body awareness practices",
      "Manifestation rituals",
    ],
  },
  {
    id: 3,
    name: "The Messenger",
    zodiac: "Gemini",
    element: "Air",
    planet: "Mercury",
    duration: "3-6 months",
    difficulty: "Beginner",
    description:
      "The Messenger Gate opens the channels of communication. You learn to speak your truth, to listen deeply, and to bridge worlds through language. This is the realm of ideas, information, and connection.",
    purpose:
      "To develop clear communication, active listening, and the ability to translate between different perspectives.",
    practices: [
      "Daily writing practice",
      "Active listening exercises",
      "Learning a new language",
      "Breathwork for clarity",
      "Truth-telling rituals",
    ],
  },
  {
    id: 4,
    name: "The Nurturer",
    zodiac: "Cancer",
    element: "Water",
    planet: "Moon",
    duration: "6-12 months",
    difficulty: "Intermediate",
    description:
      "The Nurturer Gate teaches you to care for yourself and others with deep compassion. This is the realm of emotional intelligence, where you learn to feel deeply, to hold space, and to create safety.",
    purpose:
      "To develop emotional intelligence, self-care, and the ability to nurture without losing yourself.",
    practices: [
      "Self-care routines",
      "Emotional check-ins",
      "Inner child work",
      "Cooking nourishing meals",
      "Creating safe spaces",
    ],
  },
  {
    id: 5,
    name: "The Heart",
    zodiac: "Leo",
    element: "Fire",
    planet: "Sun",
    duration: "12+ months",
    difficulty: "Advanced",
    description:
      "The Heart Gate is the center of the journey. Here you awaken the dragon within—your authentic power, your creative fire, your sovereign self. This is the realm of self-love, self-expression, and radiant presence.",
    purpose:
      "To awaken your authentic self, to express your unique gifts, and to embody your sovereignty.",
    practices: [
      "Heart-opening meditation",
      "Creative expression (art, music, dance)",
      "Self-love rituals",
      "Dragon breath practices",
      "Authentic self-expression",
    ],
  },
  {
    id: 6,
    name: "The Healer",
    zodiac: "Virgo",
    element: "Earth",
    planet: "Mercury",
    duration: "6-12 months",
    difficulty: "Intermediate",
    description:
      "The Healer Gate teaches you to mend what is broken—in yourself, in others, and in the world. This is the realm of service, where you learn to use your gifts to help others without sacrificing yourself.",
    purpose:
      "To develop healing skills, discernment, and the ability to serve without martyrdom.",
    practices: [
      "Herbalism or energy healing",
      "Service to others",
      "Body-mind integration",
      "Purification practices",
      "Healthy boundaries in service",
    ],
  },
  {
    id: 7,
    name: "The Lover",
    zodiac: "Libra",
    element: "Air",
    planet: "Venus",
    duration: "6-12 months",
    difficulty: "Intermediate",
    description:
      "The Lover Gate opens your heart to connection, beauty, and relationship. You learn to love deeply while maintaining your center, to create harmony without losing yourself.",
    purpose:
      "To develop the capacity for deep intimacy, partnership, and balanced relationships.",
    practices: [
      "Relationship work",
      "Beauty rituals",
      "Tantra or sacred sexuality",
      "Heart-to-heart communication",
      "Balance practices",
    ],
  },
  {
    id: 8,
    name: "The Transformer",
    zodiac: "Scorpio",
    element: "Water",
    planet: "Pluto",
    duration: "12+ months",
    difficulty: "Advanced",
    description:
      "The Transformer Gate is the death and rebirth. Here you face your deepest shadows, your greatest fears, and emerge completely transformed. This is the most intense Gate of the journey.",
    purpose:
      "To face and integrate the shadow, to die to the old self, and to be reborn in truth.",
    practices: [
      "Deep shadow work",
      "Death meditation",
      "Tantric practices",
      "Facing fears directly",
      "Rebirth rituals",
    ],
  },
  {
    id: 9,
    name: "The Sage",
    zodiac: "Sagittarius",
    element: "Fire",
    planet: "Jupiter",
    duration: "6-12 months",
    difficulty: "Intermediate",
    description:
      "The Sage Gate is where you integrate all you have learned and begin to teach. You become the wise one, the guide, the one who has walked the path and can now show others the way.",
    purpose:
      "To integrate wisdom, to teach what you have learned, and to expand your perspective.",
    practices: [
      "Teaching or mentoring",
      "Philosophical study",
      "Vision quests",
      "Wisdom journaling",
      "Sharing your story",
    ],
  },
  {
    id: 10,
    name: "The Master",
    zodiac: "Capricorn",
    element: "Earth",
    planet: "Saturn",
    duration: "12+ months",
    difficulty: "Advanced",
    description:
      "The Master Gate is where you claim your mastery. You have walked the path, faced the trials, and emerged victorious. Now you build your legacy and step into leadership.",
    purpose:
      "To claim mastery, to build a legacy, and to step into authentic leadership.",
    practices: [
      "Legacy building",
      "Leadership development",
      "Mastery of chosen craft",
      "Discipline and structure",
      "Mentoring others",
    ],
  },
  {
    id: 11,
    name: "The Sovereign",
    zodiac: "Aquarius",
    element: "Air",
    planet: "Uranus",
    duration: "12+ months",
    difficulty: "Advanced",
    description:
      "The Sovereign Gate is where you claim your throne. You are no longer subject to external authority—you are the authority. You break the oaths, reclaim your power, and stand in complete sovereignty.",
    purpose:
      "To claim complete sovereignty, to break free from all external control, and to stand in your power.",
    practices: [
      "Breaking oaths and contracts",
      "Sovereignty rituals",
      "Economic freedom work",
      "Community building",
      "Revolutionary action",
    ],
  },
  {
    id: 12,
    name: "The Mystic",
    zodiac: "Pisces",
    element: "Water",
    planet: "Neptune",
    duration: "Ongoing",
    difficulty: "Master",
    description:
      "The Mystic Gate is the return to Source. You dissolve into the infinite, merge with the divine, and become one with all that is. This is the completion of the journey and the beginning of a new cycle.",
    purpose:
      "To merge with the divine, to dissolve the ego, and to return to Source while remaining embodied.",
    practices: [
      "Deep meditation",
      "Mystical experiences",
      "Ego dissolution",
      "Service to all beings",
      "Living as the divine",
    ],
  },
];

export const getGateById = (id: number): Gate | undefined => {
  return GATES_DATA.find((gate) => gate.id === id);
};

export const getGateByZodiac = (zodiac: string): Gate | undefined => {
  return GATES_DATA.find((gate) => gate.zodiac === zodiac);
};
