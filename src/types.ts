// src/types.ts

export interface Font {
    family: string;
    variants: string;
    letterSpacing: string;
    fontWeight: string;
    url: string;
  }
  
  export interface ButtonStyle {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
    letterSpacing: string;
    textTransform: string;
    textDecoration: string;
    textAlign: string;
    color: string;
    backgroundColor: string;
    borderColor: string;
    borderWidth: string;
    borderRadius: string;
  }
  
  export interface ScrapeResult {
    fonts: Font[];
    primaryButton: ButtonStyle;
  }
  