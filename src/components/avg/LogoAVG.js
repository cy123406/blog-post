import { Box } from "@mui/material";

const Logo = () => {
    const texts = [
        { text: 'C', color: '#FF9F00' },
        { text: 'h', color: '#FF000C' },
        { text: 'e', color: '#2AF806' },
        { text: 'n', color: '#E0E618' },
        { text: 'e', color: '#2AF806' },
        { text: 'y', color: '#FF000C' },
    ]

    const svgText = texts.map(r => {
        return (
            <svg key={r.text} height='50' width='20'>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                    fontSize="40" fill="none" stroke={r.color} strokeWidth="0.6"
                    strokeDasharray="400"
                    className="font-longCang animate-lineLogo">
                    {r.text}
                </text>
            </svg>
        )
    })
    return (
        <Box sx={{ display: 'flex' }}>
            {svgText}
        </Box>
    )
}

export default Logo;