'use client'

import React, { useState } from 'react';
import { Input } from '../../components/ui/input'; // Adjust the import path as necessary
import { Button } from '../../components/ui/button'; // Adjust the import path as necessary

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background text-foreground dotted-background">
      <div className="max-w-lg w-full p-8 border border-border rounded-lg shadow-lg bg-card text-card-foreground">
        <h1 className="text-center text-2xl font-bold mb-6">Contact</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name:</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 bg-input text-foreground"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email:</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 bg-input text-foreground"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 bg-input text-foreground"
            />
          </div>
          <Button type="submit" variant="default" size="default" className="w-full">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;