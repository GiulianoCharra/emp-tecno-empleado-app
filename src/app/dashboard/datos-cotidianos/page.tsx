"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Car, Zap, Droplet, Recycle, Utensils, Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  date: z.string({ required_error: "Por favor selecciona una fecha." }),
  transportMode: z
    .array(z.string())
    .nonempty("Selecciona al menos un modo de transporte."),
  commuteDistance: z.number().min(0, "La distancia no puede ser negativa."),
  energyUsage: z
    .number()
    .min(0, "El consumo de energía no puede ser negativo."),
  waterUsage: z.number().min(0, "El consumo de agua no puede ser negativo."),
  recycledItems: z.array(z.string()),
  meatConsumption: z.string(),
  steps: z.number().min(0).optional(),
});

export default function DatosCotidianos() {
  const [showModal, setShowModal] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      transportMode: [],
      commuteDistance: 0,
      energyUsage: 0,
      waterUsage: 0,
      recycledItems: [],
      meatConsumption: "",
      steps: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setShowModal(true);
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Registrar Actividades Diarias
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="mr-2 h-5 w-5" />
                Transporte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="transportMode"
                render={() => (
                  <FormItem>
                    <FormLabel>Modos de Transporte Utilizados</FormLabel>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "Caminata",
                        "Bicicleta",
                        "Auto Compartido",
                        "Transporte Público",
                        "Auto Personal",
                        "Moto",
                      ].map((mode) => (
                        <FormField
                          key={mode}
                          control={form.control}
                          name="transportMode"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={mode}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(mode)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, mode])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== mode
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {mode}
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
                name="commuteDistance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distancia Total Recorrida (km)</FormLabel>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Consumo de Energía
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="energyUsage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consumo de Energía (kWh)</FormLabel>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Droplet className="mr-2 h-5 w-5" />
                Consumo de Agua
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="waterUsage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consumo de Agua (litros)</FormLabel>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Recycle className="mr-2 h-5 w-5" />
                Reciclaje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="recycledItems"
                render={() => (
                  <FormItem>
                    <FormLabel>Materiales Reciclados</FormLabel>
                    <div className="grid grid-cols-2 gap-4">
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Utensils className="mr-2 h-5 w-5" />
                Alimentación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="meatConsumption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consumo de Carne</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu consumo de carne hoy" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">Sin carne</SelectItem>
                        <SelectItem value="low">Bajo (1 porción)</SelectItem>
                        <SelectItem value="medium">
                          Medio (2 porciones)
                        </SelectItem>
                        <SelectItem value="high">
                          Alto (3+ porciones)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Footprints className="mr-2 h-5 w-5" />
                Actividad Física
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="steps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pasos Caminados Hoy</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={20000}
                        step={100}
                        value={[field.value || 0]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <div className="text-center mt-2">
                      {field.value || 0} pasos
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800"
          >
            Guardar Datos
          </Button>
        </form>
      </Form>

      <Dialog
        open={showModal}
        onOpenChange={setShowModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Datos Guardados</DialogTitle>
            <DialogDescription>
              Tus datos han sido registrados correctamente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowModal(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
