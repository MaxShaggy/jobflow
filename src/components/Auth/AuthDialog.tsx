"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useActionState } from "react";
import { signIn, signUp } from "@/lib/supabase/auth";
import { Mail, Key, User } from "lucide-react";
import Image from "next/image";

type AuthMode = "login" | "signup";

const faceClass =
  "flex items-center justify-center absolute inset-0 rounded-full backface-hidden gradientLogin-bg ring-3 ring-white/30  focus-within:shadow-[0_0_60px_rgba(255,255,255,0.25)] transition-shadow duration-300";

const formClass = "flex flex-col gap-5";

const fieldIconClass =
  "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-cyan-300";

const inputClass =
  "pl-10 bg-white/10 placeholder:text-white/60 border-2 border-white/20 focus-visible:border-cyan-400/70 focus-visible:ring-0";

const submitClass =
  "w-2/3 rounded-xl uppercase text-white bg-gradient-to-r from-cyan-500 via-sky-600 to-indigo-400 bg-[length:200%_auto] bg-left hover:bg-right border border-white/20 shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:shadow-[0_0_22px_rgba(34,211,238,0.55)] hover:scale-[1.02] will-change-transform active:scale-[0.98] transition-[background-position,box-shadow,transform] duration-300 ease-out flex items-center gap-2.5 cursor-pointer";

const switchButtonClass = "text-cyan-300 cursor-pointer";

export function AuthDialog() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [signInState, signInAction, isSignInPending] = useActionState(signIn, {
    error: null,
    message: null,
  });
  const [signUpState, signUpAction, isSignUpPending] = useActionState(signUp, {
    error: null,
    message: null,
  });

  return (
    <Dialog open>
      <DialogContent showCloseButton={false} className="justify-items-center w-auto max-w-none p-0 bg-transparent ring-0">
        <Image
                src="/images/logo.svg"
                alt="JobFlow"
                width={225}
                height={63}
                priority
                className="self-center pt-4"
              />
        <div className="perspective-distant">
          <div
            className={cn(
              "relative size-100 transform-3d transition-transform duration-700",
              mode === "signup" && "rotate-y-180"
            )}
          >
            <div inert={mode === "signup"} className={faceClass}>
              <form action={signInAction} className={formClass}>
                <div className="self-center">
                  <h2 className="mb-1 text-center text-2xl font-extrabold">Login</h2>
                  <span className="text-white/70">Sign in to your account</span>
                </div>

                <div className="relative group">
                  <Mail className={fieldIconClass} aria-hidden="true" />
                  <Label htmlFor="login-email" className="sr-only">Email</Label>
                  <Input
                    type="email"
                    id="login-email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="relative group">
                  <Key className={fieldIconClass} aria-hidden="true" />
                  <Label htmlFor="login-password" className="sr-only">Password</Label>
                  <Input
                    type="password"
                    id="login-password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    aria-invalid={!!signInState.error}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2 items-center">
                  <Button type="submit" disabled={isSignInPending} className={submitClass}>
                    sign in
                  </Button>
                  <div>
                    <span className="text-white/70 mr-1">Don&apos;t have an account?</span>
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className={switchButtonClass}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div inert={mode === "login"} className={cn(faceClass, "rotate-y-180")}>
              <form action={signUpAction} className={formClass}>
                <div className="self-center">
                  <h2 className="mb-1 text-center text-2xl font-extrabold">Sign Up</h2>
                  <span className="text-white/70">Create your account</span>
                </div>

                <div className="relative group">
                  <User className={fieldIconClass} aria-hidden="true" />
                  <Label htmlFor="signup-nickname" className="sr-only">Nickname</Label>
                  <Input
                    type="text"
                    id="signup-nickname"
                    name="nickname"
                    autoComplete="nickname"
                    placeholder="Nickname"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="relative group">
                  <Mail className={fieldIconClass} aria-hidden="true" />
                  <Label htmlFor="signup-email" className="sr-only">Email</Label>
                  <Input
                    type="email"
                    id="signup-email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="relative group">
                  <Key className={fieldIconClass} aria-hidden="true" />
                  <Label htmlFor="signup-password" className="sr-only">Password</Label>
                  <Input
                    type="password"
                    id="signup-password"
                    name="password"
                    autoComplete="new-password"
                    placeholder="Password"
                    minLength={6}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2 items-center">
                  <Button type="submit" disabled={isSignUpPending} className={submitClass}>
                    create account
                  </Button>
                  <div>
                    <span className="text-white/70 mr-1">Already have an account?</span>
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className={switchButtonClass}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}