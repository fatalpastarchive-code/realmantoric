"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Sparkles, CheckCircle2, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 18, {
    message: "You must be 18 years or older to join our community.",
  }),
  motivation: z.string().min(100, {
    message: "Please describe yourself and your goals in more detail (at least 100 characters).",
  }),
  interest: z.string().min(1, {
    message: "Please select an area of interest.",
  }),
  description: z.string().max(100, {
    message: "Short bio must not exceed 100 characters.",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms of service.",
  }),
});

export default function ApplicationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      motivation: "",
      interest: "",
      description: "",
      terms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center animate-fade-in">
        <div className="space-y-8 max-w-lg">
          <div className="mx-auto h-20 w-20 rounded-[28px] bg-accent/10 flex items-center justify-center border border-accent/20">
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white">Application Received</h1>
            <p className="text-lg text-muted-foreground font-medium">
              Thank you for your interest in our community. We will contact you as soon as possible.
            </p>
          </div>
          <Button
            onClick={() => router.push("/")}
            variant="ghost"
            className="rounded-2xl text-muted-foreground hover:text-white"
          >
            Back to Homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-40 px-6 bg-background">
      <div className="max-w-3xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/30 text-[10px] font-bold tracking-widest uppercase text-accent">
            <Leaf className="w-3 h-3" />
            A New Beginning
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white">
            Join <span className="text-accent">Us.</span>
          </h1>
          <p className="text-muted-foreground font-medium max-w-md mx-auto leading-relaxed">
            Mantoric is a digital sanctuary where you can grow, learn new things, and share experiences.
          </p>
        </div>

        {/* Form Area */}
        <div className="soft-card p-8 md:p-12 border-border/50">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Your Age</FormLabel>
                      <FormControl>
                        <Input placeholder="18+" className="h-14 rounded-2xl bg-secondary/20 border-border/50 focus:border-accent/30 transition-all px-6 text-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Area of Interest</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-14 rounded-2xl bg-secondary/20 border-border/50 focus:border-accent/30 transition-all px-6 text-white/80">
                            <SelectValue placeholder="What excites you?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-secondary border-border rounded-2xl text-white">
                          <SelectItem value="languages">Language Learning</SelectItem>
                          <SelectItem value="habits">Habit Development</SelectItem>
                          <SelectItem value="reading">Books & Reading</SelectItem>
                          <SelectItem value="experience">Shared Experience</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Short Introduction</FormLabel>
                    <FormControl>
                      <Input placeholder="Introduce yourself in a single sentence..." className="h-14 rounded-2xl bg-secondary/20 border-border/50 focus:border-accent/30 transition-all px-6 text-white" {...field} />
                    </FormControl>
                    <FormDescription className="text-[10px] text-muted-foreground/40 italic">Let us get to know you.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="motivation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Your Goals</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What do you aim to achieve in Mantoric? In which areas do you want to grow?"
                        className="min-h-[150px] rounded-3xl bg-secondary/20 border-border/50 focus:border-accent/30 transition-all p-6 leading-relaxed text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-2xl border border-border/50 p-6 bg-secondary/10">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 border-border/50 data-[state=checked]:bg-accent data-[state=checked]:text-black"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-xs font-medium leading-relaxed text-muted-foreground">
                        By submitting this application, I accept the community rules and <span className="text-accent underline">our privacy policy</span>.
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-16 rounded-[28px] bg-white text-black font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl group"
              >
                Complete Application
                <Sparkles className="ml-2 w-4 h-4 transition-transform group-hover:scale-110" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
