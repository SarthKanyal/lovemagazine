import { Alex_Brush, Archivo_Black, Geist, Geist_Mono } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const archivoBlack = Archivo_Black({
  style: "normal",
  weight:"400",

});


export const alex_Brush = Alex_Brush({
  style: "normal",
  weight: "400",
});