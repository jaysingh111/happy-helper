import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner, toast } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const BARBA_NAPOLI_URL = "/barba-napoli/Barba%20Napoli%20Shirts%20%E2%80%93%20Vangelis.html";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={BARBA_NAPOLI_URL} replace />} />
          <Route path="/app" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <button
          type="button"
          onClick={() => toast("hii welcome to figure model")}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-background bg-background shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Welcome"
        >
          <img
            src="/logo-BAwvdGpg.png"
            alt="Logo"
            className="h-full w-full object-cover"
          />
        </button>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
