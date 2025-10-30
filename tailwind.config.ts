import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],

	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "2rem",
				"3xl": "10rem",
				"4xl": "12rem",
				"5xl": "15rem",
			},
		},

		extend: {
			boxShadow: {
				"custom-full": "0px -1px 10px 0px rgba(0, 0, 0, 0.1)",
			},

			borderWidth: {
				0.5: "0.5px",
			},

			fontSize: {
				base: "18px"
			},

			screens: {
				xs: "400px",
				"3xl": "1600px"
			},

			translate: {
				"1/5": "20%",
			},

			aspectRatio: {
				"vertical-video": "9 / 16",
			},

			colors: {
				"text-primary": "var(--text-primary)",
				primary: {
					// DEFAULT: "hsl(var(--primary))",
					DEFAULT: "#585C3B",
					foreground: "hsl(var(--primary-foreground))",
				},
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
			},



			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},

				shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
			},

			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				shine: 'shine 5s linear infinite',
			},

		},
	},

	plugins: [animate],
} satisfies Config;
