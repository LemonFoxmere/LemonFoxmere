const textColors: Record<Color.Text, string> = {
	primary: "#27100C",
	secondary: "#7C5746",
	tertiary: "#AA8675",
	quaternary: "#C4ACA2",
	accent: "#DFD1CC",
	invert: "#F8EDE9"
};

export function textHex(clr: Color.Text): string {
	return textColors[clr];
}
