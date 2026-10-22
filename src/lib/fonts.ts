import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });

export const fontVariables = `${geistSans.variable} ${geistMono.variable} ${display.variable}`;
