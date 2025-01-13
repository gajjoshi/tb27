"use client";
import React, { useEffect, useState } from 'react';

function Page() {
  const [email, setEmail] = useState('');

  // Fetch the email from localStorage when the component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem('username');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div>
      <h1>Email: {email || "No email found"}</h1> {/* Display email or a fallback message */}
    </div>
  );
}

export default Page;
