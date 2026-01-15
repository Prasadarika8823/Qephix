
export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface Persona {
  role: string;
  needs: string;
}

// --- DATABASE TYPES ---

export interface UserProfile {
  id: string;
  full_name: string | null;
  daily_goal_minutes: number;
  minutes_focused_today: number;
  daily_intent: string | null;
  current_streak: number;
  last_active_date: string | null;
  total_sessions_count: number;
  average_focus_score: number;
  discipline_index: number;
  peak_focus_start: string | null;
  peak_focus_end: string | null;
}

export interface UserSession {
  id: number;
  user_id: string;
  title: string;
  duration: number;
  actual_duration?: number;
  focus_rating?: number;
  type: 'pomodoro' | 'deep_work' | 'freestyle';
  status: 'scheduled' | 'completed';
  scheduled_at: string;
}

export interface Achievement {
  id: number;
  user_id: string;
  badge_type: string;
  unlocked_at: string;
}

export interface Ally {
  profile_id: string;
  full_name: string;
}
