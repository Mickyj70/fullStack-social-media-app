import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/auth": {
  //       target: "http://localhost:3500",
  //       secure: false,
  //     },
  //   },
  // },
});
