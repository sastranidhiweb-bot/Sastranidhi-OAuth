import { useState } from 'react';

/**
 * Reproduces the original inline script behaviour for forms with class "demo":
 *   f.onsubmit = e => {
 *     e.preventDefault();
 *     const m = f.querySelector('.message');
 *     m.textContent = 'Thank you. This local demonstration is working.';
 *     m.style.display = 'block';
 *   }
 */
export function useDemoForm() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Thank you. This local demonstration is working.');
  };

  return { message, handleSubmit };
}
