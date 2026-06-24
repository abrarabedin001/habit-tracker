import {
  BookOpen,
  Dumbbell,
  Moon,
  GraduationCap,
  Image as ImageIcon,
  Code,
  Droplet,
  Heart,
  PenLine,
  CircleCheck,
  type LucideIcon,
} from "lucide-react";

/** Map of stored icon keys → lucide components. Extend as needed. */
const ICONS: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  dumbbell: Dumbbell,
  moon: Moon,
  "graduation-cap": GraduationCap,
  image: ImageIcon,
  code: Code,
  droplet: Droplet,
  heart: Heart,
  "pen-line": PenLine,
  "circle-check": CircleCheck,
};

export function HabitIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const Icon = ICONS[icon] ?? CircleCheck;
  return <Icon className={className} />;
}
