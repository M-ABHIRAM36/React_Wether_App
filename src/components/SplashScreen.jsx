import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Cloud, Sun, CloudRain } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons = [Sun, Cloud, CloudRain];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 500);

    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearInterval(iconInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  const CurrentIcon = icons[currentIcon];

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: (theme) => theme.zIndex.modal + 100,
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, repeatType: "reverse" }
            }}
          >
            <CurrentIcon size={80} />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                mt: 3,
                background: 'linear-gradient(45deg, #ffffff, #e3f2fd)',
                backgroundClip: 'text',
                color: 'transparent',
                textAlign: 'center',
              }}
            >
              WeatherScope
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                mt: 1,
                opacity: 0.9,
                textAlign: 'center',
              }}
            >
              Your Personal Weather Companion
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{ marginTop: '2rem' }}
          >
            <CircularProgress 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)' 
              }} 
              size={40} 
            />
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default SplashScreen;
