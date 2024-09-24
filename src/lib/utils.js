const COLORS = {
    green: {
        bg: "bg-[#ecf7d4]",
        badge: "bg-[#d6f497]",
    },
    orange: {
        bg: "bg-[#f9efe1]",
        badge: "bg-[#f7e0b8]",
    },
    red: {
        bg: 'bg-[#fbe5e7]',
        badge: 'bg-[#fdc6c7]',
    },
};

export const getRandomColor = () => {
    const colorNames = Object.keys(COLORS);
    const randomIndex = Math.floor(Math.random() * colorNames.length);
    const randomColorName = colorNames[randomIndex];
    return COLORS[randomColorName]
}