'use client'

import React from 'react';

const AboutPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background text-foreground dotted-background p-4">
      <div className="max-w-lg w-full p-8 border border-border rounded-lg shadow-lg bg-card text-card-foreground">
        <h1 className="text-center text-2xl font-bold mb-6">About Guy Danter</h1>
        <p className="mb-4">
          Hello! I&apos;m Guy Danter, a passionate photographer from Surrey.
        </p>
        <p className="mb-4">
          I specialize in capturing the beauty of cars and trees, and I have a particular love for greyscale photography.
        </p>
        <p className="mb-4">
          My work is driven by a desire to showcase the elegance and simplicity of the world around us through my lens.
        </p>
        <p className="mb-4">
          Thank you for visiting my page. I hope you enjoy exploring my photography as much as I enjoy creating it!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;