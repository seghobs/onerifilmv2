"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  genres: z.string().min(1, "En az bir tür seçmelisiniz"),
  year: z.string().optional(),
  actors: z.string().optional(),
  additional: z.string().optional(),
});

interface PreferenceFormProps {
  onSubmit: (preferences: string) => void;
  isLoading: boolean;
}

export function PreferenceForm({ onSubmit, isLoading }: PreferenceFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      genres: "",
      year: "",
      actors: "",
      additional: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const preferences = `
      Türler: ${values.genres}
      ${values.year ? `Yıl: ${values.year}` : ""}
      ${values.actors ? `Oyuncular: ${values.actors}` : ""}
      ${values.additional ? `Ek tercihler: ${values.additional}` : ""}
    `;
    onSubmit(preferences);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 bg-card p-6 rounded-lg shadow-sm">
        <FormField
          control={form.control}
          name="genres"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Film Türü</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Bir tür seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="aksiyon">Aksiyon</SelectItem>
                  <SelectItem value="komedi">Komedi</SelectItem>
                  <SelectItem value="dram">Dram</SelectItem>
                  <SelectItem value="bilim-kurgu">Bilim Kurgu</SelectItem>
                  <SelectItem value="romantik">Romantik</SelectItem>
                  <SelectItem value="gerilim">Gerilim</SelectItem>
                  <SelectItem value="korku">Korku</SelectItem>
                  <SelectItem value="animasyon">Animasyon</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yıl Aralığı (Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="Örn: 2000-2023" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="actors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oyuncular (Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="Örn: Tom Hanks, Leonardo DiCaprio" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additional"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ek Tercihler (Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="Örn: Oscar ödüllü, IMDb puanı 8+ vb." {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Film Önerileri Alınıyor..." : "Film Önerisi Al"}
        </Button>
      </form>
    </Form>
  );
}