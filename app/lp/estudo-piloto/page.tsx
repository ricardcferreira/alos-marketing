export const metadata = {
  title: "Estudo-Piloto | Alos Health",
  robots: {
    index: false,
    follow: false, // Keeps the ad landing page hidden from Google / search indexing
  },
};

export default function EstudoPilotoPage() {
  return (
    <main className="min-h-screen bg-[#FCFAF8] text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-serif font-bold text-[#1A2E22] mb-4">
          Estudo-Piloto: Inovação em Nutrição Clínica
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Participe na validação da nossa plataforma clínica e ajude a desenhar o futuro das decisões nutricionais.
        </p>
        
        {/* Scheduler / Cal.com / Calendly embed will go here */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm min-h-[400px] flex items-center justify-center">
          <p className="text-gray-400">Scheduler Component Placeholder</p>
        </div>
      </div>
    </main>
  );
}