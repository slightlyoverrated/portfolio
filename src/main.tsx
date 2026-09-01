import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PortfolioExperience } from '@/src/components/PortfolioExperience';
import '@/app/globals.css';

const root = document.getElementById('root');

if (!root) throw new Error('Portfolio root element was not found.');

createRoot(root).render(
  <StrictMode>
    <PortfolioExperience />
  </StrictMode>,
);
