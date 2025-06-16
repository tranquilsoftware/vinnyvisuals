/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // og green (#2)
        // background: { // 6F7159 is sacredvision
        //   DEFAULT: "#477751",      // Deep forest green
        //   secondary: "#5A8F5D",    // Lighter variant (base + golden ratio shift)
        //   dark: "#3A5E43"  
        // },
        // primary: {
        //   DEFAULT: "#5B8A5E",        // Muted sage green
        //   light: "#7BAE7F",          // Soft sage
        //   foreground: "#FFFFFF"
        // },
        // accent: {
        //   DEFAULT: "#6da664",        // Muted clay
        //   light: "#C4B094",          // Soft clay
        //   foreground: "#FFFFFF"
        // },

        // #1.
        // background: {
        //   DEFAULT: "#477751",      // Deep forest green was 477751
        //   dark: "#48684E",          // Darker forest green was  2A3D2E
        //   secondary: "#354A3C"      // Muted green-gray
        // },
        // primary: {
        //   DEFAULT: "#597159",        // Muted sage green -- USED AS GLOW AND HIGHLIGHT ON QUICKCATEGORY
        //   light: "#7BAE7F",          // Soft sage
        //   dark: "#3D6B41",           // Deep forest
        //   foreground: "#FFFFFF"
        // },
        // accent: {
        //   DEFAULT: "#6da664",        // Muted clay
        //   light: "#C4B094",          // Soft clay
        //   dark: "#8A6D47",           // Deep clay
        //   foreground: "#FFFFFF"
        // },

        // #3. Desert Tan
        // background: {
        //   DEFAULT: "#D2B48C",      // Classic tan base
        //   secondary: "#C19A6B",    // Slightly deeper tan
        //   dark: "#8B7355"          // Darker brown-tan
        // },
        // primary: {
        //   DEFAULT: "#BC8F8F",        // Rosy brown
        //   light: "#D2B48C",         // Light tan
        //   dark: "#8B7355",           // Dark tan-brown
        //   foreground: "#FFFFFF"
        // },
        // accent: {
        //   DEFAULT: "#CD853F",        // Peru (warm brown-orange)
        //   light: "#DAA520",          // Golden rod
        //   dark: "#8B4513",           // Saddle brown
        //   foreground: "#FFFFFF"
        // },

// // #4. Rainforest Theme - Dark & Lush
// background: {
//   DEFAULT: "#1A3A2F",      // Deep forest green (base)
//   secondary: "#2D5A4B",    // Slightly lighter forest
//   dark: "#0F261F",          // Almost black-green
//   light: "#3D6D5E"          // Muted teal for secondary elements
// },
// primary: {
//   DEFAULT: "#2E8B57",        // Sea Green (main accent)
//   light: "#3CB371",          // Medium Sea Green (lighter accent)
//   dark: "#1E5A3B",           // Dark Sea Green
//   foreground: "#FFFFFF"
// },
// accent: {
//   DEFAULT: "#5F9EA0",        // Cadet Blue (complementary accent)
//   light: "#8FBC8F",          // Dark Sea Green (softer accent)
//   dark: "#4A7B7D",           // Darker Cadet Blue
//   foreground: "#FFFFFF"
// },
// content: {
//   DEFAULT: "#E8F5E9",        // Very light mint (for text on dark)
//   serious: "#A5D6A7",         // Soft green (for important elements)
//   white: "#FFFFFF",
//   primary: "#2E8B57",         // Same as primary.DEFAULT
//   secondary: "#81C784",      // Light green
//   tertiary: "#A5D6A7",        // Soft green (same as serious)
//   muted: "#B2DFDB"            // Muted teal for subtle text
// },
// border: {
//   DEFAULT: "#2D5A4B",        // Slightly lighter than background
//   light: "#3D6D5E",          // For subtle borders
//   dark: "#1A3A2F"            // For strong borders
// },


// Dark Theme with Blue Accents
background: {
  DEFAULT: "#0F172A",      // Dark blue-gray (base)
  secondary: "#1E293B",    // Slightly lighter dark blue-gray
  dark: "#0B1120",         // Almost black
  light: "#334155"         // Lighter gray for secondary elements
},
primary: {
  DEFAULT: "#3B82F6",      // Bright blue (main accent)
  light: "#60A5FA",        // Lighter blue
  dark: "#2563EB",         // Darker blue
  foreground: "#FFFFFF"    // White text on primary
},
accent: {
  DEFAULT: "#60A5FA",      // Light blue (complementary accent)
  light: "#93C5FD",        // Lighter accent
  dark: "#3B82F6",         // Darker accent
  foreground: "#FFFFFF"     // White text on accent
},
content: {
  DEFAULT: "#F1F5F9",      // Light gray for text on dark
  white: "#FFFFFF",        // Pure white
  primary: "#F8FAFC",      // Slightly off-white for primary text
  secondary: "#E2E8F0",    // Light gray for secondary text
  tertiary: "#CBD5E1",     // Muted gray for tertiary text
  muted: "#94A3B8"         // Muted blue-gray for subtle text
},
border: {
  DEFAULT: "#1E293B",      // Default border (slightly lighter than background)
  light: "#334155",        // Lighter border
  dark: "#0F172A"          // Darker border (matches background)
}



// Warm Tan & Brown Theme #5
// background: {
//   DEFAULT: "#E6D5B8",      // Creamy light tan (base)
//   secondary: "#D4B483",    // Warm medium tan
//   dark: "#FFC49B",          // Muted brown-tan
//   light: "#F5E6D3"          // Very light cream
// },
// primary: {
//   DEFAULT: "#C19A6B",        // Warm tan-brown
//   light: "#D4B483",         // Lighter tan
//   dark: "#8B5A2B",           // Rich brown
//   foreground: "#FFFFFF"
// },
// accent: {
//   DEFAULT: "#D4A76A",        // Bright golden tan
//   light: "#E6C294",          // Light golden tan
//   dark: "#B8860B",           // Dark golden brown
//   foreground: "#FFFFFF"
// },
// content: {
//   DEFAULT: "#5D4037",        // Dark brown for text
//   serious: "#3E2723",         // Darker brown for important elements
//   white: "#FFFFFF",
//   primary: "#5D4037",         // Matching primary text
//   secondary: "#8D6E63",       // Muted brown
//   tertiary: "#A1887F",        // Light muted brown
//   muted: "#BCAAA4"            // Very light brown for subtle text
// },
// border: {
//   DEFAULT: "#D4B483",        // Medium tan for borders
//   light: "#E6D5B8",          // Light tan for subtle borders
//   dark: "#8B5A2B"            // Dark brown for strong borders
// },

// Warm Tan & Dark Green Theme #6
// background: {
//   DEFAULT: "#1E3C2A",          // Deep forest green (base)
//   secondary: "#2D5A3F",        // Slightly lighter forest green
//   dark: "#0F261F",              // Almost black-green
//   light: "#3D6D5E"              // Muted teal for secondary elements
// },
// primary: {
//   DEFAULT: "#8B5A2B",           // Warm brown (from original)
//   light: "#D4B483",             // Light tan (from original)
//   dark: "#5D3A21",              // Darker brown
//   foreground: "#F5E6D3"          // Cream for text on dark
// },
// accent: {
//   DEFAULT: "#A5D6A7",           // Soft green
//   light: "#C8E6C9",             // Lighter green
//   dark: "#689F38",               // Darker green
//   foreground: "#1E3C2A"          // Dark green for text on accent
// },
// content: {
//   DEFAULT: "#E8F5E9",           // Very light mint (for text on dark)
//   serious: "#A5D6A7",           // Soft green (for important elements)
//   white: "#FFFFFF",
//   primary: "#F5E6D3",            // Cream for primary text
//   secondary: "#D4B483",          // Tan for secondary text
//   tertiary: "#A1887F",           // Muted brown for tertiary text
//   muted: "#8D9E8B"               // Muted green for subtle text
// },
// border: {
//   DEFAULT: "#2D5A3F",           // Medium green for borders
//   light: "#3D6D5E",             // Light green for subtle borders
//   dark: "#1E3C2A"               // Dark green for strong borders
// },

        // background: { // Pastel brown base
        //   DEFAULT: "#F5F0E6",      // Very light pastel beige
        //   secondary: "#EDE0D4",    // Slightly warmer pastel beige
        //   dark: "#E6D5C3"          // Soft pastel tan
        // },
        // primary: {
        //   DEFAULT: "#D4B996",        // Warm pastel brown
        //   light: "#E6D5B8",         // Lighter pastel tan
        //   foreground: "#5D4037"     // Dark brown for text
        // },
        // accent: {
        //   DEFAULT: "#A5D6A7",        // Muted pastel green
        //   light: "#C8E6C9",         // Lighter pastel sage
        //   foreground: "#2E7D32"     // Darker green for contrast
        // },
        /*
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          secondary: "rgba(255, 255, 255, 0.04)"
        },
        content: {
          DEFAULT: "#F5F9F5",        // Off-white with green tint
          // serious: "rgb(180, 235, 175)", // FOR 1
          // serious: "rgb(101, 252, 0)", // FOR 2
          serious: "#D88AD8", // FOR 3 (tan/brown)

          white: "#FFFFFF",

          primary: "#5B8A5E",        // Deep forest green
          secondary: "#D6E2D6",      // Pale sage
          muted: "#9BB09C"           // Muted green-gray
        }*/
      }
    }
  },
  // plugins: [
  //   plugin(function({ addBase }) {
  //     addBase({
  //       ':root': {
  //         '--primary': '#5B8A5E',     // Muted sage green
  //         '--secondary': '#A68A64',   // Muted clay
  //         '--accent': '#C4B094',      // Soft clay
  //         // '--background': '#477751',  // Deep forest green
  //       }
  //     })
  //   })
  // ]
}
