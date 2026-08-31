'use client';

import { FormEvent, useState } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

export function CommandBar({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [value, setValue] = useState('');

  function submit(event: FormEvent) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue('');
  }

  return (
    <div className="command-area">
      <div className="suggestions">
        <button onClick={() => onSubmit('Find MH12AB1234')}>Search a vehicle</button>
        <button onClick={() => onSubmit('Show traffic intelligence')}>Explore traffic</button>
        <button onClick={() => onSubmit('Investigate an alert')}>Investigate an alert</button>
      </div>
      <form className="command-bar" onSubmit={submit}>
        <Sparkles size={18} />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask Central AI..."
          aria-label="Ask Central AI"
        />
        <button className="send" aria-label="Send" type="submit"><ArrowUp size={18} /></button>
      </form>
    </div>
  );
}
