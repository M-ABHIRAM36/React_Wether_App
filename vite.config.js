// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return defineConfig({
    plugins: [react()],
    define: {
      'process.env': env, // Allows using process.env.MY_VAR in the code
    },
  });
};
