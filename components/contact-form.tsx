"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check } from "lucide-react"

interface AttachmentPayload {
  name: string
  type: string
  base64: string
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })

  const [attachments, setAttachments] = useState<File[]>([])
  const [attachmentError, setAttachmentError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const readFileAsBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        const base64 = result.split(",")[1] || ""
        resolve(base64)
      }
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(file)
    })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const attachmentsPayload: AttachmentPayload[] = await Promise.all(
        attachments.map(async (file) => ({
          name: file.name,
          type: file.type,
          base64: await readFileAsBase64(file),
        }))
      )

      const payload = {
        ...formData,
        attachments: attachmentsPayload,
      }

      const response = await fetch("https://5b45hsir08.execute-api.us-east-1.amazonaws.com/dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (response.ok) {
        console.log("Message sent successfully:", result)
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        })
        setIsSuccess(true)

        // Hide success message after 3 seconds
        setTimeout(() => {
          setIsSuccess(false)
        }, 3000)
      } else {
        console.error("Submission error:", result.error)
      }
    } catch (error) {
      console.error("Network error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-2">Send Us a Message</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { id: "fullName", label: "Full Name", type: "text", placeholder: "John Smith" },
          { id: "email", label: "Email", type: "email", placeholder: "john@example.com" },
          { id: "phone", label: "Phone Number", type: "text", placeholder: "555-123-4567" },
          { id: "company", label: "Company", type: "text", placeholder: "Company Inc." },
          { id: "service", label: "Service Interested In", type: "text", placeholder: "e.g. Resume help" },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium mb-1">
              {field.label}
            </label>
            <Input
              id={field.id}
              name={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={(formData as any)[field.id]}
              onChange={handleChange}
              required={["fullName", "email", "phone", "message"].includes(field.id)}
            />
          </div>
        ))}

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

        <div>
          <label htmlFor="attachments" className="block text-sm font-medium mb-1">
            Attachments
          </label>
          <input
            id="attachments"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
            onChange={(e) => {
              setAttachmentError(null)
              const selectedFiles = Array.from(e.target.files || [])
              const allowedTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "image/png",
                "image/jpeg",
                "text/plain",
              ]

              const invalidFile = selectedFiles.find(
                (file) => !allowedTypes.includes(file.type)
              )
              if (invalidFile) {
                setAttachmentError("Only PDF, DOC, DOCX, PNG, JPG, JPEG, and TXT files are allowed.")
                return
              }

              const tooLarge = selectedFiles.find((file) => file.size > 5 * 1024 * 1024)
              if (tooLarge) {
                setAttachmentError("Each attachment must be smaller than 5MB.")
                return
              }

              if (selectedFiles.length > 5) {
                setAttachmentError("You can upload up to 5 attachments.")
                return
              }

              setAttachments(selectedFiles)
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white"
          />
          {attachmentError && (
            <p className="text-sm text-red-600 mt-1">{attachmentError}</p>
          )}
          {attachments.length > 0 && (
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between gap-2 rounded-md bg-gray-50 p-2">
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== index))}
                    className="text-sm text-primary hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button type="submit" className="w-full py-2 cursor-pointer" disabled={isSubmitting || isSuccess}>
          {isSubmitting ? (
            <span className="flex items-center gap-1">
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending...</span>
            </span>
          ) : isSuccess ? (
            <span className="flex items-center gap-1">
              <Check className="h-4 w-4" />
              Submitted!
            </span>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </div>
  )
}
