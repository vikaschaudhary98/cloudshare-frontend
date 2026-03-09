import { CreditCard, Files, LayoutDashboard, Receipt, Upload } from "lucide-react";

export const features = [
  {
    iconName: "ArrowUpCircle",
    iconColor: "text-purple-500",
    title: "Easy File Upload",
    description:
      "Quickly Upload your files with our intuitive drag-and-drop interface.",
  },
  {
    iconName: "Shield",
    iconColor: "text-purple-500",
    title: "Secure Storage",
    description:
      "Quickly Upload your files with our intuitive drag-and-drop interface.",
  },
  {
    iconName: "Share2",
    iconColor: "text-purple-500",
    title: "Simple Sharing",
    description:
      "Quickly Upload your files with our intuitive drag-and-drop interface.",
  },
  {
    iconName: "CreditCard",
    iconColor: "text-purple-500",
    title: "Flexible Credits",
    description:
      "Quickly Upload your files with our intuitive drag-and-drop interface.",
  },
  {
    iconName: "FileText",
    iconColor: "text-purple-500",
    title: "file Management",
    description:
      "Quickly Upload your files with our intuitive drag-and-drop interface.",
  },
  {
    iconName: "Clock",
    iconColor: "text-purple-500",
    title: "Transctions History",
    description:
      "Quickly Upload your files with our intuitive drag-and-drop interface.",
  },
];
export const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    cta: "Get Started",
    features: ["5 Uploads", "Basic Support", "Secure Storage"],
  },
  {
    name: "Premium",
    price: "$500",
    cta: "Get Premium",
    features: ["Unlimited Uploads", "Priority Support", "Advanced Sharing"],
  },
  {
    name: "Untimate",
    price: "$2500",
    cta: "Go Ultimate,",
    features: ["Unlimited Everything", "Dedicated Support", "Custom Features"],
  },
];
export const testimonialsSection = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director.",
    rating:"5",
    company: "Tech Solutions Pvt Ltd",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback:
      "CloudShare made file sharing extremely simple and secure. The user interface is clean and very easy to use.",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "UI/UX Designer",
    company: "Design Studio",
    rating:"5",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback:
      "I love the drag-and-drop feature. Uploading and managing files has never been this smooth.",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Project Manager",
    company: "Innovate Tech",
    rating:"4",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    feedback:
      "The security features and fast upload speed impressed our entire team. Highly recommended!",
  },
];


export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Upload",
    icon: Upload,
    path: "/upload",
  },
  {
    id: "03",
    label: "My Files",
    icon: Files,
    path: "/my-files",
  },
  {
    id: "04",
    label: "Subscriptions",
    icon: CreditCard,
    path: "/subscriptions",
  },
  {
    id: "05",
    label: "Transactions",
    icon: Receipt,
    path: "/transactions",
  }
];