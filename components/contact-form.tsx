"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formData)
    try {
      const response = await fetch('https://5b45hsir08.execute-api.us-east-1.amazonaws.com/dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Job posted successfully:', result);
      } else {
        console.error('Error posting job:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-2">Send Us a Message</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="John Smith"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            placeholder="John Smith"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1">
            Company
          </label>
          <Input
            id="company"
            name="company"
            placeholder="john@example.com"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-1">
            Service Interested In
          </label>
          <Input
            id="service"
            name="service"
            placeholder="ex. Resume help"
            value={formData.service}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your recruitment needs..."
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full py-2">
          Send Message
        </Button>
      </form>
    </div>
  )
}
