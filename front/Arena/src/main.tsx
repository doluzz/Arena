import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@radix-ui/themes/styles.css";
import App from './App.tsx'
import { Gallery } from './App.tsx'
import { Page } from './Resume.tsx'
import { Theme, ThemePanel  } from "@radix-ui/themes";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme accentColor="lime" appearance="dark">
      <Page />
    </Theme>
  </StrictMode>,
)
