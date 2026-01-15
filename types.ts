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