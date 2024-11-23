"use client";
import { ExpandCircleDownSharp } from "@mui/icons-material";
import { Button, Drawer, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import { Box } from "@react-three/drei";
import Link from "next/link";
import { useState } from "react";

const list = (data) => {
    return (
        data.map(r => (
            <Link href={`#heading-${r.id}`}>
            <ListItem key={r.id} button>
                {space(r.level)}
                <ListItemText primary={r.text} />
            </ListItem>
            </Link>
        ))
    )
}

const space = (count) => (
    <Typography component='span'>
        {Array.from({ length: count }).map((_, index) => (
            <Typography component='span'
                sx={{ ml: 2 }}
            />
        ))}
    </Typography>
)

const ShrinkDrawer = ({ data }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(open ? false : true);
    }
    return (
        <Box >
            <Button onClick={toggleDrawer} sx={{
                position: 'fixed',  // 固定在页面上
                bottom: 0,         // 距离底部 16px
                left: {
                    xs: open ? 240 : 0,
                    sm: open ? 240 : 0,
                    md: open ? 300 : 0,
                    lg: open ? 360 : 0
                },  // 如果抽屉打开，图标距离左侧360px，否则16px
                zIndex: 1,          // 确保图标在其他元素上方
            }}>
                <ExpandCircleDownSharp sx={{
                    transform: open ? 'rotate(90deg)' : 'rotate(-90deg)', // 根据状态控制旋转角度
                    transition: 'transform 0.3s ease', // 旋转动画
                }} />
            </Button>

            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                sx={{
                    width: {
                        xs: open ? 240 : 0,
                        sm: open ? 240 : 0,
                        md: open ? 300 : 0,
                        lg: open ? 360 : 0
                    },
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: {
                            xs: open ? 240 : 0,
                            sm: open ? 240 : 0,
                            md: open ? 300 : 0,
                            lg: open ? 360 : 0
                        },
                        boxSizing: 'border-box',
                        top: theme.mixins.toolbar.minHeight,  // AppBar高度
                        zIndex: 1,    // 确保抽屉在AppBar下方
                    },
                }}
            >
                <Box >
                    <List sx={{ pt: 6 }}>
                        {list(data)}
                    </List>
                </Box>
            </Drawer>
        </Box>
    )
}

export default ShrinkDrawer;