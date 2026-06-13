import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Gamepad2, Search, ShoppingCart, Heart, Star, ChevronRight, ChevronLeft,
  ChevronDown, Menu, X, Moon, Sun, Play, Zap, Trophy, Users, Shield,
  Mail, Phone, Globe, Twitter, Youtube, Instagram, Tag, Clock, ArrowRight,
  Award, Check, AlertCircle, Loader2, MessageSquare, Filter, Ghost, Car,
  Brain, Sword, Download, Send, MapPin, Headphones, TrendingUp, Crown,
  Flame, Package, Percent, Eye, ThumbsUp, Hash, ArrowUpDown
} from "lucide-react";

// ── Types ───────────────────────────────────────────────────────────────────

type Page = "home" | "games" | "categories" | "store" | "game-details" | "about" | "contact";

interface Game {
  id: number;
  title: string;
  genre: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  banner: string;
  badge?: string;
  description: string;
  longDescription: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  tags: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  screenshots: string[];
  requirements: { os: string; cpu: string; ram: string; gpu: string; storage: string };
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  count: number;
  description: string;
  gradient: string;
  image: string;
}

// ── Data ────────────────────────────────────────────────────────────────────

const GAMES: Game[] = [
  {
    id: 1, title: "Cyber Nexus 2077", genre: "Action RPG", price: 59.99, originalPrice: 79.99,
    rating: 4.8, reviews: 12847,
    image: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=400&h=560&fit=crop&auto=format",
    banner: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=1200&h=500&fit=crop&auto=format",
    badge: "HOT",
    description: "Navigate a sprawling neon megacity where corporations battle street rebels for dominance.",
    longDescription: "In the year 2077, NovaCorp has turned Neo-Angeles into a corporate fiefdom. You play as Kira Sato, a black-market data courier who stumbles onto a conspiracy that could topple the entire power structure. Customize your mercenary build across 8 augmentation trees, infiltrate heavily secured arcologies, and forge fragile alliances with underground factions. With 120+ hours of main and side content, every choice carves a different path through a living city that remembers what you did.",
    developer: "NexusDev Studios", publisher: "Horizon Games", releaseDate: "2024-03-15",
    tags: ["Open World", "Sci-Fi", "Story Rich", "Mature"],
    isFeatured: true, isTrending: true,
    screenshots: [
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1672872476232-da16b45c9001?w=800&h=450&fit=crop&auto=format",
    ],
    requirements: { os: "Windows 11 64-bit", cpu: "Intel Core i7-12700K", ram: "16 GB DDR5", gpu: "NVIDIA RTX 3080 10GB", storage: "120 GB SSD" },
  },
  {
    id: 2, title: "Shadow Realm: Origins", genre: "Horror", price: 39.99, originalPrice: 49.99,
    rating: 4.5, reviews: 8234,
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400&h=560&fit=crop&auto=format",
    banner: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200&h=500&fit=crop&auto=format",
    badge: "SALE",
    description: "Descend into a town where the boundary between the living and the dead has shattered.",
    longDescription: "Blackwood, Oregon — population 3,200 — went dark in November 1987. You are Dr. Elena Marsh, a paranormal investigator hired to find out why. What you uncover is a decades-old pact with something ancient and hungry. Every shadow conceals a decision point; every candle you light costs precious resources. Shadow Realm uses a dynamic fear system that tracks your character's psychological state, altering the world's appearance as sanity frays.",
    developer: "DarkForge Interactive", publisher: "Phantom Publishing", releaseDate: "2024-01-20",
    tags: ["Horror", "Survival", "Atmospheric", "Single Player"],
    isFeatured: true, isTrending: false,
    screenshots: [
      "https://images.unsplash.com/photo-1557515126-1bf9ada5cb93?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1535391879778-3bae11d29a24?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?w=800&h=450&fit=crop&auto=format",
    ],
    requirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-10600K", ram: "16 GB", gpu: "NVIDIA RTX 2070 8GB", storage: "60 GB SSD" },
  },
  {
    id: 3, title: "Galactic Conquest", genre: "Strategy", price: 49.99,
    rating: 4.7, reviews: 6891,
    image: "https://images.unsplash.com/photo-1672872476232-da16b45c9001?w=400&h=560&fit=crop&auto=format",
    banner: "https://images.unsplash.com/photo-1672872476232-da16b45c9001?w=1200&h=500&fit=crop&auto=format",
    badge: "NEW",
    description: "Command fleets across 10,000 star systems in a grand strategy epic spanning centuries.",
    longDescription: "The Terran Hegemony is crumbling and six alien civilizations smell blood. You lead one of seven unique factions — each with asymmetric mechanics, ship designs, and ideological victory conditions — through a procedurally generated galaxy that never plays the same way twice. Research 400 technologies, deploy political agents, and execute devastating fleet engagements in pausable real-time combat.",
    developer: "Stellar Minds", publisher: "Cosmic Interactive", releaseDate: "2024-05-10",
    tags: ["Strategy", "Space", "Turn-Based", "4X"],
    isFeatured: false, isTrending: true,
    screenshots: [
      "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62?w=800&h=450&fit=crop&auto=format",
    ],
    requirements: { os: "Windows 10 64-bit", cpu: "Intel Core i7-10700", ram: "16 GB", gpu: "NVIDIA GTX 1080 8GB", storage: "40 GB SSD" },
  },
  {
    id: 4, title: "Velocity Rush X", genre: "Racing", price: 34.99, originalPrice: 44.99,
    rating: 4.3, reviews: 5421,
    image: "https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62?w=400&h=560&fit=crop&auto=format",
    banner: "https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62?w=1200&h=500&fit=crop&auto=format",
    badge: "SALE",
    description: "Race through 60 neon-lit tracks across six continents at unreal speeds.",
    longDescription: "Unlock 220 licensed and fictional vehicles across 12 manufacturer classes, from sub-compact hyper-karts to 1500 hp prototype monsters. Physics-first handling model rewards mechanical mastery — slip angles, weight transfer, and aero balance all matter. Ranked online multiplayer supports 32 players per lobby, with a weekly touring-car championship that broadcasts to 500K spectators on GameVerse Live.",
    developer: "Turbo Labs", publisher: "Turbo Labs", releaseDate: "2023-11-05",
    tags: ["Racing", "Simulation", "Multiplayer", "Vehicles"],
    isFeatured: false, isTrending: true,
    screenshots: [
      "https://images.unsplash.com/photo-1557515126-1bf9ada5cb93?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1535391879778-3bae11d29a24?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800&h=450&fit=crop&auto=format",
    ],
    requirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-9600K", ram: "8 GB", gpu: "NVIDIA GTX 1070 8GB", storage: "55 GB SSD" },
  },
  {
    id: 5, title: "Legends of Aethoria", genre: "RPG", price: 54.99,
    rating: 4.9, reviews: 23156,
    image: "https://images.unsplash.com/photo-1557515126-1bf9ada5cb93?w=400&h=560&fit=crop&auto=format",
    banner: "https://images.unsplash.com/photo-1557515126-1bf9ada5cb93?w=1200&h=500&fit=crop&auto=format",
    badge: "HOT",
    description: "An 80-hour fantasy RPG where ancient magic and political intrigue collide.",
    longDescription: "The Aethorian Compact is fracturing. As a Loreseeker — one of the realm's rarest arcanists — you hold the power to bind nations or burn them. Choose from 12 character classes with 60-node skill trees. Recruit 15 party members, each with interconnected loyalty arcs. Your decisions leave visible scars on the world map: cities rebuild or stay ruined, alliances hold or collapse based on dialogue choices you made hours earlier.",
    developer: "Epic Realm Studios", publisher: "Meridian Games", releaseDate: "2024-02-28",
    tags: ["RPG", "Fantasy", "Story Rich", "Open World"],
    isFeatured: true, isTrending: true,
    screenshots: [
      "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1672872476232-da16b45c9001?w=800&h=450&fit=crop&auto=format",
    ],
    requirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-11700K", ram: "16 GB", gpu: "NVIDIA RTX 3070 8GB", storage: "90 GB SSD" },
  },
  {
    id: 6, title: "Warfront Alliance", genre: "Co-op", price: 44.99,
    rating: 4.6, reviews: 9872,
    image: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=400&h=560&fit=crop&auto=format",
    banner: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=1200&h=500&fit=crop&auto=format",
    badge: "NEW",
    description: "Unite with up to 4 players in intense tactical squad operations across 50 missions.",
    longDescription: "A relentlessly co-operative tactical shooter where communication is the weapon. Each mission supports 1–4 players with no AI teammates — if a squadmate goes down, you carry them or you leave them. 50 missions scale procedurally based on squad size and difficulty rating. The loadout system features 140 authentic weapons and 300 attachments. Monthly mission packs are free forever.",
    developer: "Tactical Games Co.", publisher: "Alliance Interactive", releaseDate: "2024-04-22",
    tags: ["Co-op", "Tactical", "Shooter", "Team"],
    isFeatured: false, isTrending: false,
    screenshots: [
      "https://images.unsplash.com/photo-1535391879778-3bae11d29a24?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1557515126-1bf9ada5cb93?w=800&h=450&fit=crop&auto=format",
    ],
    requirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-10400", ram: "8 GB", gpu: "NVIDIA GTX 1660 Super 6GB", storage: "45 GB SSD" },
  },
  {
    id: 7, title: "Ocean's Abyss", genre: "Adventure", price: 29.99, originalPrice: 39.99,
    rating: 4.4, reviews: 4567,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=560&fit=crop&auto=format",
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=500&fit=crop&auto=format",
    badge: "SALE",
    description: "Pilot your submersible into an alien ocean world where leviathans rule the deep.",
    longDescription: "Planet Thalassa's oceans are 40 km deep and teeming with bioluminescent megafauna. You are Dr. Yuna Park, sent to retrieve a crashed research probe. What you find instead are the ruins of a civilization that lived beneath the waves for 10,000 years. Craft oxygen recyclers, upgrade your submersible's sonar and armor, and navigate territory battles between creatures the size of skyscrapers.",
    developer: "Blue Horizon Games", publisher: "Blue Horizon Games", releaseDate: "2023-09-14",
    tags: ["Adventure", "Exploration", "Survival", "Atmospheric"],
    isFeatured: false, isTrending: false,
    screenshots: [
      "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=450&fit=crop&auto=format",
    ],
    requirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-8600K", ram: "8 GB", gpu: "NVIDIA GTX 1060 6GB", storage: "35 GB SSD" },
  },
  {
    id: 8, title: "Champions Arena Pro", genre: "Sports", price: 49.99,
    rating: 4.2, reviews: 7234,
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=400&h=560&fit=crop&auto=format",
    banner: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=1200&h=500&fit=crop&auto=format",
    description: "The most authentic sports simulation ever built — 28 sports, 1,400 real athletes.",
    longDescription: "Photogrammetry-captured stadiums, AI-driven crowd reactions, and a physics engine refined over five years of motion-capture data. Champions Arena Pro simulates 28 sports from Premier League football to Olympic-level athletics. Career mode follows your athlete from undrafted prospect to hall-of-fame legend. Draft, trade, and manage your franchise across 30 seasons in franchise mode.",
    developer: "SportMax Interactive", publisher: "Arena Sports Digital", releaseDate: "2024-06-01",
    tags: ["Sports", "Simulation", "Multiplayer", "Competitive"],
    isFeatured: false, isTrending: false,
    screenshots: [
      "https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1557515126-1bf9ada5cb93?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800&h=450&fit=crop&auto=format",
    ],
    requirements: { os: "Windows 10 64-bit", cpu: "Intel Core i7-10700K", ram: "16 GB", gpu: "NVIDIA RTX 2080 8GB", storage: "80 GB SSD" },
  },
  {
    id: 9, title: "Phantom Protocol", genre: "Drama", price: 24.99,
    rating: 4.5, reviews: 3891,
    image: "https://images.unsplash.com/photo-1693929291343-f38cb7519d5d?w=400&h=560&fit=crop&auto=format",
    banner: "https://images.unsplash.com/photo-1693929291343-f38cb7519d5d?w=1200&h=500&fit=crop&auto=format",
    badge: "NEW",
    description: "A gripping interactive spy thriller with 18 distinct endings shaped by your choices.",
    longDescription: "You are Agent Mira Vassiliev, three years deep undercover inside a Zurich-based arms syndicate. Control your cover identity, manage relationships with five key contacts, and decide how far you're willing to go for the mission. Every interrogation, every seduction, every double-cross ripples outward. Phantom Protocol has 18 fully realised endings — none of them morally clean.",
    developer: "Narrative Forge", publisher: "Story Arc Games", releaseDate: "2024-05-30",
    tags: ["Drama", "Narrative", "Choices Matter", "Thriller"],
    isFeatured: false, isTrending: false,
    screenshots: [
      "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1535391879778-3bae11d29a24?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?w=800&h=450&fit=crop&auto=format",
    ],
    requirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-8400", ram: "8 GB", gpu: "NVIDIA GTX 1060 6GB", storage: "25 GB SSD" },
  },
  {
    id: 10, title: "Nexus Siege: Battlegrounds", genre: "Multiplayer", price: 0,
    rating: 4.1, reviews: 45923,
    image: "https://images.unsplash.com/photo-1549614614-b8f90c10b52e?w=400&h=560&fit=crop&auto=format",
    banner: "https://images.unsplash.com/photo-1549614614-b8f90c10b52e?w=1200&h=500&fit=crop&auto=format",
    badge: "FREE",
    description: "The world's fastest-growing free-to-play battle royale with 100 players per match.",
    longDescription: "Drop into 6 rotating maps with 100 players. Scavenge, build, and fight across a shrinking zone using 80 weapons with real ballistics. Seasonal Battle Passes unlock 100 tiers of cosmetics — every item earnable without paying. Cross-platform play connects PC, console, and mobile players in unified ranked queues. Season 14 introduces the Mech Siege mode: 50 vs 50 with vehicle combat.",
    developer: "NexusDev Studios", publisher: "NexusDev Studios", releaseDate: "2023-07-01",
    tags: ["Battle Royale", "Free to Play", "Multiplayer", "Competitive"],
    isFeatured: true, isTrending: true,
    screenshots: [
      "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1672872476232-da16b45c9001?w=800&h=450&fit=crop&auto=format",
    ],
    requirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-7600K", ram: "8 GB", gpu: "NVIDIA GTX 970 4GB", storage: "50 GB SSD" },
  },
  {
    id: 11, title: "Crimson Blade: Reforged", genre: "Action", price: 39.99,
    rating: 4.7, reviews: 8102,
    image: "https://images.unsplash.com/photo-1535391879778-3bae11d29a24?w=400&h=560&fit=crop&auto=format",
    banner: "https://images.unsplash.com/photo-1535391879778-3bae11d29a24?w=1200&h=500&fit=crop&auto=format",
    badge: "TRENDING",
    description: "Visceral combo-based combat meets a crumbling gothic world overrun by demonic forces.",
    longDescription: "The Crimson Rite was supposed to seal the Void Gate. It failed. Now Asha Drenthe, disgraced knight and sole survivor of the Rite, must fight her way through a world that has already begun to dissolve. Master 15 weapon forms — each with 30-hit combo trees — and stylize your kills for Soul Meter charge. New to Reforged: a Nightmare Forge mode where you build your own boss encounters and share them online.",
    developer: "Iron Will Games", publisher: "Iron Will Games", releaseDate: "2024-01-08",
    tags: ["Action", "Combat", "Dark Fantasy", "Boss Rush"],
    isFeatured: false, isTrending: true,
    screenshots: [
      "https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1557515126-1bf9ada5cb93?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=450&fit=crop&auto=format",
    ],
    requirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-10400", ram: "8 GB", gpu: "NVIDIA GTX 1070 8GB", storage: "30 GB SSD" },
  },
  {
    id: 12, title: "Stellar Odyssey", genre: "Adventure", price: 44.99,
    rating: 4.6, reviews: 6734,
    image: "https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?w=400&h=560&fit=crop&auto=format",
    banner: "https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?w=1200&h=500&fit=crop&auto=format",
    badge: "NEW",
    description: "A hand-crafted space adventure spanning 50 star systems and six alien civilizations.",
    longDescription: "The Stellar Signal began broadcasting from the galactic core 72 hours ago. Every species received it simultaneously — and its message is catastrophic. As Captain Ren Ito of the free-trader Aokigahara, you have the only ship fast enough to reach the source before the great powers turn the signal into a casus belli for war. 50 star systems to explore, 200 characters with full voice acting, and a branching diplomatic web that reshapes the ending.",
    developer: "Cosmos Craft Studios", publisher: "Cosmos Craft Studios", releaseDate: "2024-06-10",
    tags: ["Adventure", "Space", "Exploration", "Story Rich"],
    isFeatured: false, isTrending: false,
    screenshots: [
      "https://images.unsplash.com/photo-1672872476232-da16b45c9001?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62?w=800&h=450&fit=crop&auto=format",
    ],
    requirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-9600K", ram: "16 GB", gpu: "NVIDIA GTX 1660 Ti 6GB", storage: "45 GB SSD" },
  },
];

const CATEGORIES: Category[] = [
  { id: "action", name: "Action Games", icon: Sword, count: 243, description: "Fast-paced combat and explosive gameplay", gradient: "from-red-500 to-orange-500", image: "https://images.unsplash.com/photo-1535391879778-3bae11d29a24?w=400&h=240&fit=crop&auto=format" },
  { id: "coop", name: "Co-op Games", icon: Users, count: 127, description: "Team up for shared adventures", gradient: "from-emerald-500 to-teal-500", image: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=400&h=240&fit=crop&auto=format" },
  { id: "drama", name: "Drama Games", icon: MessageSquare, count: 89, description: "Emotional narratives and character arcs", gradient: "from-pink-500 to-rose-600", image: "https://images.unsplash.com/photo-1693929291343-f38cb7519d5d?w=400&h=240&fit=crop&auto=format" },
  { id: "rpg", name: "RPG Games", icon: Crown, count: 312, description: "Epic quests and world-building journeys", gradient: "from-amber-500 to-yellow-500", image: "https://images.unsplash.com/photo-1557515126-1bf9ada5cb93?w=400&h=240&fit=crop&auto=format" },
  { id: "adventure", name: "Adventure Games", icon: Globe, count: 198, description: "Explore vast worlds and uncover mysteries", gradient: "from-blue-500 to-cyan-500", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=240&fit=crop&auto=format" },
  { id: "horror", name: "Horror Games", icon: Ghost, count: 76, description: "Terrifying experiences beyond imagination", gradient: "from-violet-900 to-slate-900", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400&h=240&fit=crop&auto=format" },
  { id: "racing", name: "Racing Games", icon: Car, count: 94, description: "High-speed thrills and precision driving", gradient: "from-yellow-400 to-orange-600", image: "https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62?w=400&h=240&fit=crop&auto=format" },
  { id: "sports", name: "Sports Games", icon: Trophy, count: 143, description: "Authentic simulations of real sports", gradient: "from-lime-500 to-green-600", image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=400&h=240&fit=crop&auto=format" },
  { id: "strategy", name: "Strategy Games", icon: Brain, count: 167, description: "Outsmart opponents with tactical mastery", gradient: "from-indigo-500 to-blue-700", image: "https://images.unsplash.com/photo-1672872476232-da16b45c9001?w=400&h=240&fit=crop&auto=format" },
  { id: "multiplayer", name: "Multiplayer Games", icon: Gamepad2, count: 284, description: "Compete with players worldwide", gradient: "from-cyan-500 to-blue-600", image: "https://images.unsplash.com/photo-1549614614-b8f90c10b52e?w=400&h=240&fit=crop&auto=format" },
];

const REVIEWS = [
  { id: 1, author: "Alex Chen", rating: 5, date: "2024-05-12", text: "Absolutely mind-blowing. The open world feels genuinely alive — NPCs remember you, the weather changes economy, and side quests rival the main story. GOTY for me.", avatar: "AC" },
  { id: 2, author: "Priya Sharma", rating: 4, date: "2024-04-28", text: "Incredible depth. A few performance issues at launch, but three patches later it runs flawlessly. The narrative choices have real weight — I was genuinely shocked by Act 3.", avatar: "PS" },
  { id: 3, author: "Marcus Webb", rating: 5, date: "2024-03-20", text: "This is the game I've been waiting 10 years for. Every system is deep, every corner of the city tells a story, and the soundtrack is phenomenal.", avatar: "MW" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-600"}
        />
      ))}
    </div>
  );
}

const BADGE_STYLES: Record<string, string> = {
  HOT: "bg-red-500/90 text-white",
  NEW: "bg-cyan-500/90 text-black",
  SALE: "bg-amber-500/90 text-black",
  FREE: "bg-emerald-500/90 text-black",
  TRENDING: "bg-purple-500/90 text-white",
};

function Badge({ label }: { label: string }) {
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-widest ${BADGE_STYLES[label] ?? "bg-slate-700 text-white"}`}>
      {label}
    </span>
  );
}

function SectionHeader({ title, sub, action, onAction }: { title: string; sub?: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-slate-400 text-transparent bg-clip-text">{title}</h2>
        {sub && <p className="text-muted-foreground mt-1 text-sm">{sub}</p>}
      </div>
      {action && (
        <button onClick={onAction} className="flex items-center gap-1 text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
          {action} <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}

// ── GameCard ──────────────────────────────────────────────────────────────────

function GameCard({ game, onSelect, onAddToCart, onToggleWishlist, cart, wishlist }: {
  game: Game;
  onSelect: (g: Game) => void;
  onAddToCart: (id: number) => void;
  onToggleWishlist: (id: number) => void;
  cart: number[];
  wishlist: number[];
}) {
  const inCart = cart.includes(game.id);
  const inWishlist = wishlist.includes(game.id);
  const discount = game.originalPrice ? Math.round((1 - game.price / game.originalPrice) * 100) : 0;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(0,212,255,0.12)] transition-all duration-300"
      onClick={() => onSelect(game)}
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-slate-900">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        {game.badge && (
          <div className="absolute top-3 left-3">
            <Badge label={game.badge} />
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-amber-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
            -{discount}%
          </div>
        )}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pb-4 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onAddToCart(game.id)}
            className={`w-3/4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
              inCart
                ? "bg-emerald-500 text-black"
                : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_16px_rgba(0,212,255,0.5)]"
            }`}
          >
            {inCart ? <span className="flex items-center justify-center gap-1"><Check size={14} /> In Cart</span> : game.price === 0 ? "Play Free" : `Add to Cart`}
          </button>
          <button
            onClick={() => onToggleWishlist(game.id)}
            className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${
              inWishlist
                ? "border-pink-500 bg-pink-500/20 text-pink-400"
                : "border-white/20 bg-black/40 text-white/70 hover:border-pink-500/50"
            }`}
          >
            <Heart size={12} className={inWishlist ? "fill-pink-400" : ""} />
            {inWishlist ? "Wishlisted" : "Wishlist"}
          </button>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-cyan-400 font-medium uppercase tracking-wider">{game.genre}</span>
          <div className="flex items-center gap-1">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <span className="text-xs text-slate-300">{game.rating}</span>
          </div>
        </div>
        <h3 className="font-bold text-sm text-foreground leading-tight line-clamp-1">{game.title}</h3>
        <div className="flex items-center gap-2 mt-0.5">
          {game.originalPrice && (
            <span className="text-xs text-slate-500 line-through font-mono">${game.originalPrice.toFixed(2)}</span>
          )}
          <span className={`text-sm font-bold font-mono ${game.price === 0 ? "text-emerald-400" : "text-white"}`}>
            {game.price === 0 ? "FREE" : `$${game.price.toFixed(2)}`}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ page, navigate, isDark, setIsDark, cartCount, onCartOpen, mobileOpen, setMobileOpen }: {
  page: Page; navigate: (p: Page) => void; isDark: boolean; setIsDark: (v: boolean) => void;
  cartCount: number; onCartOpen: () => void; mobileOpen: boolean; setMobileOpen: (v: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks: { label: string; p: Page }[] = [
    { label: "Home", p: "home" }, { label: "Games", p: "games" },
    { label: "Categories", p: "categories" }, { label: "Store", p: "store" },
    { label: "About", p: "about" }, { label: "Contact", p: "contact" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-border" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("home")} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-[0_0_14px_rgba(0,212,255,0.5)]">
              <Gamepad2 size={16} className="text-black" />
            </div>
            <span className="font-display font-bold text-xl tracking-wide">
              <span className="text-cyan-400">Game</span><span className="text-white">Verse</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, p }) => (
              <button
                key={p}
                onClick={() => navigate(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  page === p
                    ? "text-cyan-400 bg-cyan-500/10"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-cyan-500/40 transition-all duration-200"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={onCartOpen}
              className="relative w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
            >
              <ShoppingCart size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            className="fixed inset-x-0 top-16 z-40 bg-black/95 backdrop-blur-xl border-b border-border p-4 flex flex-col gap-1"
          >
            {navLinks.map(({ label, p }) => (
              <button
                key={p}
                onClick={() => navigate(p)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  page === p ? "text-cyan-400 bg-cyan-500/10" : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── CartSidebar ───────────────────────────────────────────────────────────────

function CartSidebar({ cartGames, removeFromCart, onClose, navigate }: {
  cartGames: Game[]; removeFromCart: (id: number) => void;
  onClose: () => void; navigate: (p: Page) => void;
}) {
  const total = cartGames.reduce((s, g) => s + g.price, 0);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-card border-l border-border z-50 flex flex-col"
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Shopping Cart</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {cartGames.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-16 gap-4">
              <ShoppingCart size={48} className="text-muted-foreground/40" />
              <p className="text-muted-foreground">Your cart is empty.</p>
              <button onClick={() => { navigate("games"); onClose(); }} className="text-cyan-400 text-sm hover:underline">
                Browse Games
              </button>
            </div>
          ) : (
            cartGames.map((game) => (
              <div key={game.id} className="flex gap-3 p-3 bg-secondary/50 rounded-xl">
                <img src={game.image} alt={game.title} className="w-14 h-20 object-cover rounded-lg bg-slate-800" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{game.title}</p>
                  <p className="text-xs text-muted-foreground">{game.genre}</p>
                  <p className="text-sm font-bold text-cyan-400 font-mono mt-1">{game.price === 0 ? "FREE" : `$${game.price.toFixed(2)}`}</p>
                </div>
                <button onClick={() => removeFromCart(game.id)} className="self-start text-muted-foreground hover:text-red-400 transition-colors mt-1">
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>
        {cartGames.length > 0 && (
          <div className="p-5 border-t border-border flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal ({cartGames.length} items)</span>
              <span className="font-bold text-foreground font-mono">${total.toFixed(2)}</span>
            </div>
            <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(0,212,255,0.4)]">
              Proceed to Checkout
            </button>
            <button onClick={() => { navigate("store"); onClose(); }} className="w-full py-2.5 border border-border text-muted-foreground hover:text-foreground hover:border-cyan-500/40 rounded-xl text-sm transition-all">
              Continue Shopping
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}

// ── HomePage ──────────────────────────────────────────────────────────────────

function HomePage({ navigate, cart, wishlist, addToCart, toggleWishlist }: {
  navigate: (p: Page, g?: Game) => void; cart: number[]; wishlist: number[];
  addToCart: (id: number) => void; toggleWishlist: (id: number) => void;
}) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const featured = GAMES.filter((g) => g.isFeatured);
  const trending = GAMES.filter((g) => g.isTrending).slice(0, 4);
  const latest = GAMES.filter((g) => g.badge === "NEW").slice(0, 4);
  const [featuredIdx, setFeaturedIdx] = useState(0);

  const heroGame = featured[featuredIdx];

  return (
    <div className="pt-0">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={featuredIdx}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <img
              src={heroGame.banner}
              alt={heroGame.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Glow orbs */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredIdx}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/25 rounded-full px-4 py-1.5 mb-6 text-cyan-400 text-xs font-medium tracking-wide">
                  <Zap size={12} />
                  FEATURED — {heroGame.genre.toUpperCase()}
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none mb-4">
                  <span className="block text-white">{heroGame.title.split(" ").slice(0, -1).join(" ")}</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
                    {heroGame.title.split(" ").slice(-1)}
                  </span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-lg leading-relaxed">{heroGame.description}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("game-details", heroGame)}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all duration-200 shadow-[0_0_24px_rgba(0,212,255,0.45)] hover:shadow-[0_0_32px_rgba(0,212,255,0.65)]"
              >
                <Play size={16} /> Play Now
              </button>
              <button
                onClick={() => navigate("games")}
                className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white hover:bg-white/8 hover:border-cyan-500/40 rounded-xl transition-all duration-200"
              >
                Explore All <ChevronRight size={16} />
              </button>
            </div>

            {/* Hero nav dots */}
            <div className="flex gap-2 mt-8">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFeaturedIdx(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${i === featuredIdx ? "w-8 bg-cyan-400" : "w-4 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setFeaturedIdx((i) => (i + 1) % featured.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-200"
        >
          <ChevronRight size={18} />
        </button>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-[10px] tracking-widest animate-bounce">
          <ChevronDown size={16} />
        </div>
      </section>

      {/* Stats Bar */}
      <div className="border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { icon: Package, value: "50,000+", label: "Games Available" },
            { icon: Users, value: "50M+", label: "Active Players" },
            { icon: Trophy, value: "12K+", label: "Tournaments Hosted" },
            { icon: Star, value: "4.9 / 5", label: "Average Rating" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Icon size={18} className="text-cyan-400" />
              </div>
              <div>
                <div className="font-display font-bold text-lg text-white">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader title="Trending Now" sub="The games everyone is playing this week" action="See All" onAction={() => navigate("games")} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trending.map((game) => (
            <GameCard key={game.id} game={game} onSelect={(g) => navigate("game-details", g)} cart={cart} wishlist={wishlist} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader title="Browse Categories" sub="Find your perfect genre" action="All Categories" onAction={() => navigate("categories")} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate("categories")}
                className="group relative overflow-hidden rounded-xl aspect-video bg-slate-900 border border-border hover:border-cyan-500/40 transition-all duration-300"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80" />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-30 group-hover:opacity-50 transition-opacity`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                  <cat.icon size={20} className="text-white" />
                  <span className="text-white text-xs font-bold text-center leading-tight px-2">{cat.name.replace(" Games", "")}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Releases */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader title="Latest Releases" sub="Fresh titles just dropped on GameVerse" action="View All" onAction={() => navigate("games")} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {latest.map((game) => (
            <GameCard key={game.id} game={game} onSelect={(g) => navigate("game-details", g)} cart={cart} wishlist={wishlist} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/5 via-purple-600/5 to-cyan-500/5 border-y border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-[0_0_24px_rgba(0,212,255,0.4)]">
            <Mail size={24} className="text-black" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Stay in the Game</h2>
          <p className="text-muted-foreground mb-8">Get exclusive deals, early access announcements, and weekly curated picks delivered to your inbox.</p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-emerald-400">
              <Check size={18} /> <span className="font-medium">You're subscribed! Welcome to GameVerse.</span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/60 transition-colors"
              />
              <button
                onClick={() => { if (email.includes("@")) setSubscribed(true); }}
                className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ── GamesPage ─────────────────────────────────────────────────────────────────

const GENRES = ["All", "Action", "RPG", "Strategy", "Horror", "Racing", "Adventure", "Sports", "Drama", "Co-op", "Multiplayer"];
const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
];

function GamesPage({ navigate, cart, wishlist, addToCart, toggleWishlist }: {
  navigate: (p: Page, g?: Game) => void; cart: number[]; wishlist: number[];
  addToCart: (id: number) => void; toggleWishlist: (id: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = GAMES
    .filter((g) => {
      const matchSearch = g.title.toLowerCase().includes(search.toLowerCase()) || g.genre.toLowerCase().includes(search.toLowerCase());
      const matchGenre = genre === "All" || g.genre.toLowerCase().includes(genre.toLowerCase());
      return matchSearch && matchGenre;
    })
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "newest") return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      return b.reviews - a.reviews;
    });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => { setPage(1); }, [search, genre, sort]);

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Game Catalog</h1>
        <p className="text-muted-foreground">Explore {GAMES.length} titles across all genres</p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search games by title or genre…"
            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="relative">
          <ArrowUpDown size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none bg-card border border-border rounded-xl pl-9 pr-8 py-3 text-sm text-foreground focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Genre Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {GENRES.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              genre === g
                ? "bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,212,255,0.4)]"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-cyan-500/30"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Results */}
      {paged.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          <Search size={48} className="text-muted-foreground/30" />
          <p className="text-foreground font-medium">No games found for "{search}"</p>
          <button onClick={() => { setSearch(""); setGenre("All"); }} className="text-cyan-400 text-sm hover:underline">Clear filters</button>
        </div>
      ) : (
        <>
          <div className="text-xs text-muted-foreground mb-4">{filtered.length} results</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {paged.map((game) => (
              <GameCard key={game.id} game={game} onSelect={(g) => navigate("game-details", g)} cart={cart} wishlist={wishlist} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                    n === page ? "bg-cyan-500 text-black" : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── CategoriesPage ────────────────────────────────────────────────────────────

function CategoriesPage({ navigate }: { navigate: (p: Page, g?: Game) => void }) {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/25 rounded-full px-4 py-1.5 mb-4 text-purple-400 text-xs tracking-wide">
            <Filter size={12} /> BROWSE BY GENRE
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Game Categories</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Discover titles across every genre. From heart-pounding action to emotional story-driven dramas.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate("games")}
              className="group relative overflow-hidden rounded-2xl border border-border hover:border-cyan-500/40 bg-card transition-all duration-300 text-left hover:shadow-[0_0_24px_rgba(0,212,255,0.10)]"
            >
              <div className="relative h-40 overflow-hidden bg-slate-900">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70" />
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-40`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
                    <cat.icon size={18} className="text-white" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{cat.count} games</span>
                </div>
                <h3 className="font-bold text-lg text-white mb-1">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
                <div className="flex items-center gap-1 mt-4 text-cyan-400 text-xs font-medium group-hover:gap-2 transition-all">
                  Browse <ArrowRight size={12} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── StorePage ─────────────────────────────────────────────────────────────────

function StorePage({ navigate, cart, wishlist, addToCart, toggleWishlist }: {
  navigate: (p: Page, g?: Game) => void; cart: number[]; wishlist: number[];
  addToCart: (id: number) => void; toggleWishlist: (id: number) => void;
}) {
  const deals = GAMES.filter((g) => g.originalPrice).slice(0, 4);
  const bestSellers = GAMES.sort((a, b) => b.reviews - a.reviews).slice(0, 6);
  const newArrivals = GAMES.filter((g) => g.badge === "NEW" || g.badge === "HOT");
  const featuredDeal = deals[0];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 rounded-full px-4 py-1.5 mb-4 text-amber-400 text-xs tracking-wide">
            <Flame size={12} /> GAMEVERSE STORE
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">The Store</h1>
          <p className="text-muted-foreground">Exclusive deals, bundles, and the best prices in gaming</p>
        </div>

        {/* Featured Deal Banner */}
        {featuredDeal && (
          <div className="relative overflow-hidden rounded-2xl mb-12 border border-border group cursor-pointer" onClick={() => navigate("game-details", featuredDeal)}>
            <div className="h-64 sm:h-80 bg-slate-900">
              <img src={featuredDeal.banner} alt={featuredDeal.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
            </div>
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge label="DEAL OF THE WEEK" />
                  <span className="text-xs text-muted-foreground">{featuredDeal.genre}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{featuredDeal.title}</h2>
                <p className="text-slate-300 max-w-md text-sm mb-5 hidden sm:block">{featuredDeal.description}</p>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-slate-500 line-through font-mono text-sm">${featuredDeal.originalPrice?.toFixed(2)}</span>
                    <span className="text-cyan-400 font-bold font-mono text-2xl ml-2">${featuredDeal.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(featuredDeal.id); }}
                    className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-sm transition-all shadow-[0_0_16px_rgba(0,212,255,0.4)]"
                  >
                    {cart.includes(featuredDeal.id) ? "In Cart ✓" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Daily Deals */}
        <div className="mb-14">
          <SectionHeader title="Daily Deals" sub="Offers expire in 23:47:12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deals.map((game) => {
              const disc = Math.round((1 - game.price / (game.originalPrice ?? game.price)) * 100);
              return (
                <div key={game.id} className="bg-card border border-border rounded-xl overflow-hidden hover:border-amber-500/40 transition-all duration-200 cursor-pointer group" onClick={() => navigate("game-details", game)}>
                  <div className="relative h-40 bg-slate-900">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded-md">-{disc}%</div>
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm text-white truncate">{game.title}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <span className="text-slate-500 line-through text-xs font-mono">${game.originalPrice?.toFixed(2)}</span>
                        <span className="text-cyan-400 font-bold font-mono ml-2">${game.price.toFixed(2)}</span>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); addToCart(game.id); }} className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500 hover:text-black transition-all">
                        {cart.includes(game.id) ? <Check size={12} /> : "Add"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Best Sellers */}
        <div className="mb-14">
          <SectionHeader title="Best Sellers" sub="The titles players can't stop buying" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {bestSellers.map((game, i) => (
              <div key={game.id} className="cursor-pointer group" onClick={() => navigate("game-details", game)}>
                <div className="relative aspect-[3/4] bg-slate-900 rounded-xl overflow-hidden mb-2">
                  <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center text-amber-400 text-xs font-bold font-mono">
                    {i + 1}
                  </div>
                </div>
                <p className="text-xs font-semibold text-white truncate">{game.title}</p>
                <p className="text-xs font-bold text-cyan-400 font-mono">{game.price === 0 ? "FREE" : `$${game.price.toFixed(2)}`}</p>
              </div>
            ))}
          </div>
        </div>

        {/* New Arrivals */}
        <div>
          <SectionHeader title="New Arrivals" sub="Fresh releases on GameVerse" action="View All" onAction={() => navigate("games")} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {newArrivals.map((game) => (
              <GameCard key={game.id} game={game} onSelect={(g) => navigate("game-details", g)} cart={cart} wishlist={wishlist} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── GameDetailsPage ───────────────────────────────────────────────────────────

function GameDetailsPage({ game, navigate, cart, wishlist, addToCart, toggleWishlist }: {
  game: Game; navigate: (p: Page, g?: Game) => void;
  cart: number[]; wishlist: number[]; addToCart: (id: number) => void; toggleWishlist: (id: number) => void;
}) {
  const [tab, setTab] = useState<"description" | "requirements" | "reviews">("description");
  const [activeShot, setActiveShot] = useState(0);
  const inCart = cart.includes(game.id);
  const inWishlist = wishlist.includes(game.id);

  return (
    <div className="pt-16">
      {/* Banner */}
      <div className="relative h-72 sm:h-96 bg-slate-900">
        <img src={game.banner} alt={game.title} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <button
          onClick={() => navigate("games")}
          className="absolute top-6 left-6 flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10"
        >
          <ChevronLeft size={14} /> Back to Games
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-24 relative z-10 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: cover + buy */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-slate-900 shadow-[0_0_40px_rgba(0,0,0,0.5)] mb-4">
              <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
            </div>
            {game.badge && <div className="mb-3"><Badge label={game.badge} /></div>}
            <div className="flex items-end gap-3 mb-4">
              {game.originalPrice && <span className="text-slate-500 line-through font-mono text-base">${game.originalPrice.toFixed(2)}</span>}
              <span className="text-3xl font-bold text-white font-mono">{game.price === 0 ? "FREE" : `$${game.price.toFixed(2)}`}</span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => addToCart(game.id)}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                  inCart
                    ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400"
                    : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_28px_rgba(0,212,255,0.6)]"
                }`}
              >
                {inCart ? <span className="flex items-center justify-center gap-2"><Check size={16} /> Added to Cart</span> : game.price === 0 ? "Play for Free" : "Buy Now — Add to Cart"}
              </button>
              <button
                onClick={() => toggleWishlist(game.id)}
                className={`w-full py-3 rounded-xl text-sm font-medium border transition-all duration-200 flex items-center justify-center gap-2 ${
                  inWishlist
                    ? "border-pink-500/50 bg-pink-500/10 text-pink-400"
                    : "border-border text-muted-foreground hover:border-pink-500/40 hover:text-pink-400"
                }`}
              >
                <Heart size={15} className={inWishlist ? "fill-pink-400" : ""} />
                {inWishlist ? "In Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>

          {/* Right: info */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-cyan-400 text-sm font-medium">{game.genre}</span>
              <span className="text-muted-foreground text-xs">•</span>
              <span className="text-muted-foreground text-xs">{game.developer}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{game.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <StarRating rating={game.rating} size={16} />
                <span className="text-white font-bold">{game.rating}</span>
                <span className="text-muted-foreground text-sm">({game.reviews.toLocaleString()} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} /> Released {new Date(game.releaseDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {game.tags.map((t) => (
                <span key={t} className="text-xs px-3 py-1 bg-secondary border border-border rounded-full text-muted-foreground">{t}</span>
              ))}
            </div>

            {/* Screenshots */}
            <div className="mb-8">
              <div className="rounded-xl overflow-hidden bg-slate-900 aspect-video mb-2">
                <img src={game.screenshots[activeShot]} alt="Screenshot" className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-2">
                {game.screenshots.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveShot(i)}
                    className={`flex-1 aspect-video rounded-lg overflow-hidden border-2 transition-all ${i === activeShot ? "border-cyan-400" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-card rounded-xl p-1 border border-border">
              {(["description", "requirements", "reviews"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    tab === t ? "bg-cyan-500 text-black" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "description" && (
              <div>
                <p className="text-slate-300 leading-relaxed text-sm">{game.longDescription}</p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-card border border-border rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">Developer</p>
                    <p className="text-sm font-medium text-white">{game.developer}</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">Publisher</p>
                    <p className="text-sm font-medium text-white">{game.publisher}</p>
                  </div>
                </div>
              </div>
            )}

            {tab === "requirements" && (
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {Object.entries(game.requirements).map(([key, val]) => (
                  <div key={key} className="flex gap-4 px-5 py-3 border-b border-border last:border-b-0">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider w-20 flex-shrink-0">{key.toUpperCase()}</span>
                    <span className="text-sm text-white font-mono">{val}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === "reviews" && (
              <div className="flex flex-col gap-4">
                {REVIEWS.map((r) => (
                  <div key={r.id} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">{r.avatar}</div>
                      <div>
                        <p className="text-sm font-medium text-white">{r.author}</p>
                        <p className="text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                      </div>
                      <StarRating rating={r.rating} size={13} />
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{r.text}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-cyan-400 transition-colors">
                        <ThumbsUp size={12} /> Helpful
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── AboutPage ─────────────────────────────────────────────────────────────────

function AboutPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-600/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/25 rounded-full px-4 py-1.5 mb-6 text-cyan-400 text-xs tracking-wide">
              <Award size={12} /> ABOUT GAMEVERSE
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-5 leading-tight">
              Built for<br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">True Gamers</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              GameVerse was founded on a simple belief: every gamer deserves access to the best titles at fair prices, with a community that celebrates the art form.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Founder */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 blur-2xl rounded-2xl" />
              <div className="relative bg-card border border-border rounded-2xl p-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-2xl font-bold text-black mb-5 shadow-[0_0_24px_rgba(0,212,255,0.4)]">
                  MI
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">Mohamed Ibrahim Abdelsalam</h2>
                <p className="text-cyan-400 text-sm font-medium mb-5">Founder & CEO, GameVerse</p>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  A lifelong gamer and technology entrepreneur, Mohamed built GameVerse after realizing that the gaming industry lacked a platform that genuinely put players first. With a background in software engineering and a passion for interactive storytelling, he assembled a team of fellow gamers to create the destination he always wished existed.
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  <a href="tel:01211684714" className="flex items-center gap-2 text-muted-foreground hover:text-cyan-400 transition-colors">
                    <Phone size={14} /> 01211684714
                  </a>
                  <a href="mailto:madimade444@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-cyan-400 transition-colors">
                    <Mail size={14} /> madimade444@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            <p className="text-slate-300 leading-relaxed">
              Gaming is the most immersive art form ever invented — yet most platforms treat it like a simple transaction. GameVerse exists to change that. We curate, celebrate, and connect. Every title on our platform is hand-reviewed. Every deal is genuine. Every feature is built to serve players, not algorithms.
            </p>
            <p className="text-slate-300 leading-relaxed">
              We believe in fair pricing, transparent reviews, and a community where every voice — from the casual weekend player to the hardcore speedrunner — is heard and respected.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { value: "2019", label: "Year Founded" },
                { value: "50M+", label: "Players Served" },
                { value: "140+", label: "Countries" },
                { value: "50K+", label: "Games Catalogued" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-card border border-border rounded-xl p-4">
                  <div className="text-2xl font-bold text-cyan-400 font-display">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <SectionHeader title="What We Stand For" sub="The principles that guide every decision we make" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Shield, title: "Player First", desc: "Every feature, every deal, every editorial decision is made with one question: does this serve our players?", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
              { icon: Trophy, title: "Quality Curation", desc: "We hand-review every title before listing it. No shovelware, no unfinished cash grabs — only games worth your time.", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
              { icon: Users, title: "Real Community", desc: "GameVerse is built around player reviews, tournament hosting, and forums — not follower counts or influencer deals.", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
              { icon: Globe, title: "Global Access", desc: "Localized pricing in 140 countries ensures that where you live never determines whether you can afford great games.", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
              { icon: Headphones, title: "Always On Support", desc: "Real human support agents, 24/7, with an average response time of 8 minutes. Your issues are ours to solve.", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
              { icon: TrendingUp, title: "Dev Partnership", desc: "We take 15% — not 30% — and offer every indie studio free marketing tools, analytics, and launch support.", color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-5 hover:border-cyan-500/30 transition-all duration-200">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${bg}`}>
                  <Icon size={18} className={color} />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <SectionHeader title="Frequently Asked Questions" />
          <div className="flex flex-col gap-3 max-w-3xl">
            {[
              { q: "Is GameVerse free to join?", a: "Yes — creating a GameVerse account is completely free. You only pay when you purchase a game, and free-to-play titles cost nothing at all." },
              { q: "How does GameVerse ensure game quality?", a: "Every title goes through a 12-point editorial review covering gameplay, stability, value, and content accuracy before it's listed in our catalog." },
              { q: "Can I get a refund if I'm not satisfied?", a: "We offer a 2-hour playtime / 14-day purchase window refund policy — no questions asked, processed within 48 hours." },
              { q: "Does GameVerse support indie developers?", a: "Absolutely. We charge a 15% revenue share (versus the industry standard 30%) and provide free launch marketing, analytics dashboards, and community promotion for indie studios." },
              { q: "How do I contact support?", a: "Our support team is available 24/7 via the live chat widget on this site, or by email at support@gameverse.gg. Average response time is 8 minutes." },
            ].map(({ q, a }, i) => (
              <FAQItem key={i} q={q} a={a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-200">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-medium text-white text-sm">{q}</span>
        <ChevronDown size={16} className={`text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-slate-300 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── ContactPage ───────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");
    // Simulated submission — wire to EmailJS or Formspree in production
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
  };

  const field = (key: keyof typeof form, label: string, type = "text", as: "input" | "textarea" = "input") => (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">{label}</label>
      {as === "input" ? (
        <input
          type={type}
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className={`w-full bg-card border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${errors[key] ? "border-red-500/60 focus:border-red-500" : "border-border focus:border-cyan-500/60"}`}
          placeholder={label}
        />
      ) : (
        <textarea
          rows={5}
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className={`w-full bg-card border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors resize-none ${errors[key] ? "border-red-500/60 focus:border-red-500" : "border-border focus:border-cyan-500/60"}`}
          placeholder={label}
        />
      )}
      {errors[key] && (
        <p className="flex items-center gap-1 mt-1.5 text-xs text-red-400">
          <AlertCircle size={11} /> {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/25 rounded-full px-4 py-1.5 mb-4 text-cyan-400 text-xs tracking-wide">
          <Mail size={12} /> GET IN TOUCH
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Contact Us</h1>
        <p className="text-muted-foreground">We're here to help. Reach out anytime.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Info */}
        <div className="flex flex-col gap-4">
          {[
            { icon: Phone, label: "Phone", value: "01211684714", href: "tel:01211684714" },
            { icon: Mail, label: "Email", value: "madimade444@gmail.com", href: "mailto:madimade444@gmail.com" },
            { icon: Globe, label: "Website", value: "gameverse.gg", href: "#" },
            { icon: MapPin, label: "Location", value: "Egypt — Available Worldwide", href: "#" },
          ].map(({ icon: Icon, label, value, href }) => (
            <a key={label} href={href} className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:border-cyan-500/40 transition-all duration-200 group">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">{value}</p>
              </div>
            </a>
          ))}

          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Follow Us</p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Youtube, label: "YouTube" },
                { icon: Instagram, label: "Instagram" },
              ].map(({ icon: Icon, label }) => (
                <button key={label} title={label} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200">
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Check size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Thanks for reaching out. Mohamed will get back to you at <span className="text-cyan-400">{form.email}</span> within 24 hours.
                </p>
                <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }} className="mt-2 text-sm text-cyan-400 hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {field("name", "Full Name")}
                  {field("email", "Email Address", "email")}
                </div>
                {field("subject", "Subject")}
                {field("message", "Message", "text", "textarea")}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(0,212,255,0.35)]"
                >
                  {status === "loading" ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending…</>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  Your message will be sent directly to <span className="text-cyan-400">madimade444@gmail.com</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer className="border-t border-border bg-card/30 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 lg:col-span-1">
            <button onClick={() => navigate("home")} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-[0_0_10px_rgba(0,212,255,0.4)]">
                <Gamepad2 size={16} className="text-black" />
              </div>
              <span className="font-display font-bold text-lg">
                <span className="text-cyan-400">Game</span><span className="text-white">Verse</span>
              </span>
            </button>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Your ultimate gaming destination. 50,000+ titles, exclusive deals, and a global community of 50 million players.
            </p>
            <div className="flex gap-2">
              {[Twitter, Youtube, Instagram].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/40 transition-all">
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {[
            { title: "Platform", links: [{ l: "Home", p: "home" }, { l: "Games", p: "games" }, { l: "Categories", p: "categories" }, { l: "Store", p: "store" }] },
            { title: "Company", links: [{ l: "About", p: "about" }, { l: "Contact", p: "contact" }, { l: "Careers", p: "about" }, { l: "Press", p: "about" }] },
            { title: "Support", links: [{ l: "Help Center", p: "contact" }, { l: "Refund Policy", p: "about" }, { l: "Privacy Policy", p: "about" }, { l: "Terms of Service", p: "about" }] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">{title}</p>
              <div className="flex flex-col gap-2">
                {links.map(({ l, p }) => (
                  <button key={l} onClick={() => navigate(p as Page)} className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors text-left">
                    {l}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2024 GameVerse. Built by Mohamed Ibrahim Abdelsalam. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Contact:</span>
            <a href="mailto:madimade444@gmail.com" className="text-cyan-400 hover:underline">madimade444@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── LiveChat widget ───────────────────────────────────────────────────────────

function LiveChat() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([{ from: "bot", text: "Hey! Welcome to GameVerse support. How can I help you today?" }]);

  const send = () => {
    if (!msg.trim()) return;
    setMsgs((m) => [...m, { from: "user", text: msg }, { from: "bot", text: "Thanks for your message! Our team will get back to you shortly. Average response time is 8 minutes." }]);
    setMsg("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="w-72 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border-b border-border px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-white">GameVerse Support</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors"><X size={14} /></button>
            </div>
            <div className="h-48 overflow-y-auto p-3 flex flex-col gap-2">
              {msgs.map((m, i) => (
                <div key={i} className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${m.from === "bot" ? "bg-secondary text-foreground self-start" : "bg-cyan-500 text-black self-end"}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type a message…"
                className="flex-1 bg-secondary border border-border rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <button onClick={send} className="w-8 h-8 bg-cyan-500 rounded-xl flex items-center justify-center text-black hover:bg-cyan-400 transition-colors">
                <Send size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.45)] hover:shadow-[0_0_28px_rgba(0,212,255,0.65)] transition-all duration-200"
      >
        {open ? <X size={20} className="text-white" /> : <MessageSquare size={20} className="text-white" />}
      </button>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [isDark, setIsDark] = useState(true);
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const navigate = (p: Page, game?: Game) => {
    setPage(p);
    if (game) setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  };

  const addToCart = (id: number) => setCart((c) => (c.includes(id) ? c : [...c, id]));
  const removeFromCart = (id: number) => setCart((c) => c.filter((i) => i !== id));
  const toggleWishlist = (id: number) => setWishlist((w) => (w.includes(id) ? w.filter((i) => i !== id) : [...w, id]));

  const cartGames = GAMES.filter((g) => cart.includes(g.id));

  const sharedProps = { navigate, cart, wishlist, addToCart, toggleWishlist };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar
          page={page} navigate={navigate} isDark={isDark} setIsDark={setIsDark}
          cartCount={cart.length} onCartOpen={() => setIsCartOpen(true)}
          mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
        />

        <main>
          {page === "home" && <HomePage {...sharedProps} />}
          {page === "games" && <GamesPage {...sharedProps} />}
          {page === "categories" && <CategoriesPage navigate={navigate} />}
          {page === "store" && <StorePage {...sharedProps} />}
          {page === "game-details" && selectedGame && (
            <GameDetailsPage game={selectedGame} {...sharedProps} />
          )}
          {page === "about" && <AboutPage navigate={navigate} />}
          {page === "contact" && <ContactPage />}
        </main>

        <Footer navigate={navigate} />
        <LiveChat />

        <AnimatePresence>
          {isCartOpen && (
            <CartSidebar
              cartGames={cartGames}
              removeFromCart={removeFromCart}
              onClose={() => setIsCartOpen(false)}
              navigate={navigate}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
