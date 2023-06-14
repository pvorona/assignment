'use client';

import { useEffect, useState } from 'react';

type FormProps = {
  title: string;
  initialName: string;
  onSubmit: (name: string) => void;
};

export function CustomerForm({ title, onSubmit, initialName }: FormProps) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onSubmit(name);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="container d-flex flex-column justify-content-center align-items-center h-100"
      style={{ width: 380 }}
    >
      <h1 className="text-center mb-4 h2">{title}</h1>
      <div className="mb-3 w-100">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          autoFocus
          autoComplete="false"
          type="text"
          className="form-control w-100"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={name.length === 0}
        className="btn btn btn-primary w-100"
      >
        Submit
      </button>
    </form>
  );
}
