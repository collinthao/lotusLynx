"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"

export default function Home() {
  // Form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailState, setEmailState] = useState<"default" | "success" | "error">("default")
  const [passwordState, setPasswordState] = useState<"default" | "success" | "error">("default")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [buttonState, setButtonState] = useState<"default" | "loading" | "success" | "error">("default")

  // Validate email
  const validateEmail = (value: string) => {
    if (!value) {
      setEmailState("error")
      setEmailError("Email is required")
      return false
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailState("error")
      setEmailError("Please enter a valid email")
      return false
    } else {
      setEmailState("success")
      setEmailError("")
      return true
    }
  }

  // Validate password
  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordState("error")
      setPasswordError("Password is required")
      return false
    } else if (value.length < 6) {
      setPasswordState("error")
      setPasswordError("Password must be at least 6 characters")
      return false
    } else {
      setPasswordState("success")
      setPasswordError("")
      return true
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)

    if (isEmailValid && isPasswordValid) {
      setButtonState("loading")

      // Simulate API call
      setTimeout(() => {
        if (email === "test@example.com" && password === "password123") {
          setButtonState("success")
        } else {
          setButtonState("error")
          setEmailState("error")
          setPasswordState("error")
          setEmailError("Invalid credentials")
          setPasswordError("Invalid credentials")
        }
      }, 1500)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 flex items-center justify-center py-16">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-[#282041]">Sign in</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email/Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (emailState !== "default") validateEmail(e.target.value)
                  }}
                  onBlur={(e) => validateEmail(e.target.value)}
                  className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-1 ${
                    emailState === "success"
                      ? "border-green-500 focus:ring-green-500"
                      : emailState === "error"
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#282041]"
                  }`}
                />
                {emailState === "success" && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                {emailState === "error" && (
                  <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                )}
              </div>
              {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (passwordState !== "default") validatePassword(e.target.value)
                  }}
                  onBlur={(e) => validatePassword(e.target.value)}
                  className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-1 ${
                    passwordState === "success"
                      ? "border-green-500 focus:ring-green-500"
                      : passwordState === "error"
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#282041]"
                  }`}
                />
                {passwordState === "success" && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                {passwordState === "error" && (
                  <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                )}
              </div>
              {passwordError && <p className="mt-1 text-sm text-red-500">{passwordError}</p>}
            </div>
            <div className="mb-6">
              <Link href="/forgot-password" className="text-[#0696dd] text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={buttonState === "loading"}
              className={`w-full flex justify-center items-center py-2 px-4 rounded-md transition-colors ${
                buttonState === "success"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : buttonState === "error"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-[#282041] hover:bg-opacity-90 text-white"
              }`}
            >
              {buttonState === "loading" ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Loading...
                </>
              ) : buttonState === "success" ? (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Success
                </>
              ) : buttonState === "error" ? (
                <>
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Error
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
