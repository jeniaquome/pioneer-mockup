/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		// Add custom breakpoints for better responsive design
		screens: {
			'xs': '475px',
			// Default Tailwind breakpoints will still be available
		},
  		colors: {
  			// Pittsburgh Tomorrow Brand Colors
  			brand: {
  				'reflex-blue': '#2E3192',
  				'pms-2985': '#68CCE8',
  				'pms-285': '#4987C6',
  				'pms-290': '#D2EDF6',
  				'pms-267': '#954D9E',
  				'pms-265': '#B17BB5',
  				'pms-263-1': '#DFC4DF',
  				'pms-354': '#08A576',
  				'pms-382': '#98CC70',
  				'pms-263-2': '#D5E04D',
  				'pms-179': '#F15647',
  				'pms-129': '#F4B33D',
  				'pms-3955': '#FCE51A',
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			// Pittsburgh Tomorrow Brand Typography - Geologica Variable Font
  			'brand-heading': ['Geologica', 'system-ui', 'sans-serif'], // Primary headings (weights: 800-900 for bold, italic available)
  			'brand-subheading': ['Geologica', 'system-ui', 'sans-serif'], // Subheadings (weights: 600-700 for semibold/bold)
  			'brand-accent': ['Geologica', 'system-ui', 'sans-serif'], // Body and accent text (weights: 400-500 for regular/medium)
  			'sans': ['Geologica', 'system-ui', 'sans-serif'], // Default sans-serif font
  		},
  		fontSize: {
  			// Brand typography scale with Geologica variable font weights
  			'brand-hero': ['4rem', { lineHeight: '1.1', fontWeight: '900' }], // Extra bold for hero
  			'brand-h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '800' }], // Extra bold for h1
  			'brand-h2': ['2rem', { lineHeight: '1.3', fontWeight: '700' }], // Bold for h2
  			'brand-h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }], // Semibold for h3
  			'brand-h4': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }], // Semibold for h4
  		},
  		fontWeight: {
  			// Geologica variable font weight scale
  			'thin': '100',
  			'extralight': '200',
  			'light': '300',
  			'normal': '400',
  			'medium': '500',
  			'semibold': '600',
  			'bold': '700',
  			'extrabold': '800',
  			'black': '900',
  		},
    		keyframes: {
    			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
				'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
				},
        // Subtle animated gradient for CTA buttons
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        // Smooth color translation with ~10s pause at base color
        // 0-20%: transition to light color (~3.33s)
        // 20-40%: transition back to base (~3.33s)
        // 40-100%: hold base color (~10s)
        'cta-color-shift': {
          '0%': { backgroundColor: '#954D9E' },
          '20%': { backgroundColor: '#DFC4DF' },
          '40%': { backgroundColor: '#954D9E' },
          '100%': { backgroundColor: '#954D9E' }
        }
  		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
        'gradient-x': 'gradient-x 3s ease-in-out infinite',
        'cta-color-shift': 'cta-color-shift 16.667s ease-in-out infinite'
    		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

