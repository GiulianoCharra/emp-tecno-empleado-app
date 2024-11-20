"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Car, Recycle, Zap, Leaf, Info, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

const formSchema = z.object({
  transportationMode: z.string(),
  commuteDistance: z.number().min(0),
  energyUsage: z.number().min(0),
  waterUsage: z.number().min(0),
  recycledItems: z.array(z.string()),
  meatConsumption: z.string(),
});

const newsItems = [
  {
    title: "Nueva política de reciclaje en la oficina",
    content:
      "A partir del próximo mes, implementaremos un sistema de reciclaje más eficiente...",
    image: "/images/nueva-politica.png",
  },
  {
    title: "Desafío de transporte sostenible",
    content:
      "Únete a nuestro desafío mensual de usar transporte sostenible para reducir emisiones...",
    image: "/images/desafio.png",
  },
  {
    title: "Taller de eficiencia energética",
    content:
      "No te pierdas nuestro próximo taller sobre cómo reducir el consumo de energía en casa y en la oficina...",
    image: "/images/taller.png",
  },
];

const ecoTips = [
  "Apaga las luces y dispositivos electrónicos cuando no los uses.",
  "Utiliza una botella de agua reutilizable en lugar de botellas de plástico desechables.",
  "Considera el uso de transporte público o compartir coche para reducir emisiones.",
  "Recicla papel, plástico y vidrio siempre que sea posible.",
  "Utiliza bolsas reutilizables para tus compras.",
];

const mockCarbonFootprintData = [
  { month: "Ene", footprint: 5.2 },
  { month: "Feb", footprint: 5.1 },
  { month: "Mar", footprint: 4.9 },
  { month: "Abr", footprint: 5.0 },
  { month: "May", footprint: 4.8 },
  { month: "Jun", footprint: 4.7 },
];

export default function EmployeeDashboard() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [carbonFootprint, setCarbonFootprint] = useState(4.7);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transportationMode: "",
      commuteDistance: 0,
      energyUsage: 0,
      waterUsage: 0,
      recycledItems: [],
      meatConsumption: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsUpdating(false);
    // Simulated carbon footprint update
    setCarbonFootprint((prevFootprint) => Math.max(prevFootprint * 0.95, 0));
  }

  return (
    <div className="container  py-6 px-1 md:px-6 space-y-6">
      <h1 className="text-2xl font-bold text-green-700">EcoHuella Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Tu Huella de Carbono</CardTitle>
          <CardDescription>
            Impacto ambiental estimado basado en tus hábitos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <p className="text-3xl font-bold text-green-700 mb-2">
              {carbonFootprint.toFixed(2)} toneladas CO2e/año
            </p>
            <Progress
              value={(carbonFootprint / 10) * 100}
              className="w-full h-2 mb-2"
            />
            <p className="text-sm text-gray-600">
              0 toneladas CO2e/año ← Promedio: 5 toneladas CO2e/año → 10+
              toneladas CO2e/año
            </p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={mockCarbonFootprintData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="footprint"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {isUpdating ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="transportationMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Car className="inline-block mr-2 h-4 w-4" />
                    Modo de Transporte Principal
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un modo de transporte" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="car">Automóvil</SelectItem>
                      <SelectItem value="public">Transporte Público</SelectItem>
                      <SelectItem value="bicycle">Bicicleta</SelectItem>
                      <SelectItem value="walk">Caminando</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commuteDistance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Car className="inline-block mr-2 h-4 w-4" />
                    Distancia de Commute (km por día)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="energyUsage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Zap className="inline-block mr-2 h-4 w-4" />
                    Consumo de Energía (kWh por día)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waterUsage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Droplet className="inline-block mr-2 h-4 w-4" />
                    Consumo de Agua (litros por día)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recycledItems"
              render={() => (
                <FormItem>
                  <FormLabel>
                    <Recycle className="inline-block mr-2 h-4 w-4" />
                    Materiales Reciclados
                  </FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Papel",
                      "Plástico",
                      "Vidrio",
                      "Metal",
                      "Electrónicos",
                      "Orgánicos",
                    ].map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="recycledItems"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meatConsumption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Leaf className="inline-block mr-2 h-4 w-4" />
                    Consumo de Carne
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu consumo de carne" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="daily">Diariamente</SelectItem>
                      <SelectItem value="weekly">Semanalmente</SelectItem>
                      <SelectItem value="monthly">Mensualmente</SelectItem>
                      <SelectItem value="never">
                        Nunca (Vegetariano/Vegano)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800"
            >
              Guardar Cambios
            </Button>
          </form>
        </Form>
      ) : (
        <Button
          onClick={() => setIsUpdating(true)}
          className="w-full bg-green-700 hover:bg-green-800"
        >
          Actualizar Datos
        </Button>
      )}

      <Accordion
        type="single"
        collapsible
        className="w-full"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center">
              <Info className="mr-2 h-4 w-4" />
              Noticias y Eventos
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {newsItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                      <p className="text-xs text-gray-500">{item.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex items-center">
              <Leaf className="mr-2 h-4 w-4" />
              Eco-Tips
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2">
              {ecoTips.map((tip, index) => (
                <li
                  key={index}
                  className="text-sm"
                >
                  {tip}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
