"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TabEstudo } from "@/components/dashboard/tabs/TabEstudo";
import { TabResultados } from "@/components/dashboard/tabs/TabResultados";
import { TabCruzada } from "@/components/dashboard/tabs/TabCruzada";
import { TabConclusao } from "@/components/dashboard/tabs/TabConclusao";
import { API_URL } from "@/lib/constants";
import { fetchData } from "@/lib/aggregations";

function DashboardInner() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: () => fetchData(API_URL),
    refetchOnWindowFocus: false,
  });

  const rows = data ?? [];
  const total = rows.length;

  return (
    <main className="min-h-screen bg-cream-light text-primary-dark">
      {/* NavBar */}
      <section>
        <div className="mx-auto w-full max-w-[1400px] px-8 py-6">
          <div className="flex items-center justify-between w-full">
            <div className="gap-4 sm:gap-6 flex items-center tracking-tighter">
              <div className="flex gap-3 items-center">
                <a 
                href="https://aloshealth.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cursor-pointer flex items-center gap-1 transition-opacity"
                >
                <img 
                    src="/alos-logo.svg" 
                    alt="Alos Health Logo" 
                    className="w-auto h-[32px] object-contain shrink-0" 
                />
                
                {/* Added `leading-none` and `translate-y-[2px]` for perfect optical alignment */}
                <span className="tracking-tight text-xl font-serif leading-none translate-y-[2px]">
                    Alos <span className="italic">Health</span>
                </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Header */}
      <section className="bg-gradient-to-tl from-white via-alos-green-light to-alos-green">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-20 space-y-2">
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl font-serif">
            O Paradigma Digital na Nutrição Clínica
          </h1>
          <span className="mt-4 max-w-4xl text-xl font-regular leading-tight tracking-tight text-white">
            Questionário
          </span>
        </div>
      </section>

      {/* Main Content Area */}
      {isError ? (
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
            Não foi possível carregar os dados.{" "}
            <button className="underline" onClick={() => refetch()}>
              Tentar novamente
            </button>
          </div>
        </div>
      ) : (
        <section className="mx-auto max-w-6xl px-6 py-10 mb-8">
          <Tabs defaultValue="estudo" className="w-full">
            <TabsList className="mb-8 w-full overflow-x-auto whitespace-nowrap flex-nowrap">
              <TabsTrigger value="estudo">O Estudo</TabsTrigger>
              <TabsTrigger value="resultados">Resultados Preliminares</TabsTrigger>
              <TabsTrigger value="cruzada">Análise Cruzada</TabsTrigger>
              <TabsTrigger value="conclusao">Conclusão</TabsTrigger>
            </TabsList>
            <TabsContent value="estudo"><TabEstudo total={total} isLoading={isLoading} /></TabsContent>
            <TabsContent value="resultados"><TabResultados rows={rows} isLoading={isLoading} /></TabsContent>
            <TabsContent value="cruzada"><TabCruzada rows={rows} isLoading={isLoading} /></TabsContent>
            <TabsContent value="conclusao"><TabConclusao rows={rows} total={total} isLoading={isLoading} /></TabsContent>
          </Tabs>
        </section>
      )}
    </main>
  );
}

// Next.js requires QueryClient to be instantiated inside the component tree 
// to avoid sharing cache across users during SSR.
export default function ResearchDashboardClient() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardInner />
    </QueryClientProvider>
  );
}