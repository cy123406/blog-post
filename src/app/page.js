import ThreeDScene from '../components/ThreeDScene'
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from "next/link";
import PostList from '@/components/PostList';
import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', mt: 15 }}>
      <Box sx={{ flexGrow: 1 }}>
        <ThreeDScene path={'/dog.glb'} />
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant='h5' component={'span'}>欢迎来到我的知识库</Typography>
          <span className="footer-text-icon antialiased animate-myFace inline-block text-sm mx-2">
            ღゝ◡╹)ノ♡
          </span>
        </Box>
        <Box sx={{ mt: 10 }}>
          <PostList />
        </Box>
      </Box>
      <Box sx={{ padding: '16px', textAlign: 'center' }}>
        <div >
          <div className="font-longCang text-center">
            <Link href="https://github.com/cy123406"><GitHubIcon /></Link><span className="mx-2"></span>
            [ 不畏艰险
            <span>
              <span className="icon-key footer-text-icon antialiased animate-heartAnimate inline-block text-[16px] mx-[15px] text-red-500">
              </span>
            </span>
            乘风破浪 ]
          </div>
          <div className="font-[family-name:var(--font-geist-mono)] truncate my-3">
            Copyright © 2024 Cheney Powered by next.js 14.2.18
          </div>
        </div>
      </Box>
    </Box>
  );
}
