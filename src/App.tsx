import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner, toast } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const RedirectToVangelis = () => {
  window.location.href = "https://vangelisclothing.com/collections/barba-napoli-shirts";
  return null;
};

const queryClient = new QueryClient();

const FLOATING_ICON_Z = 50;
const EMBEDDED_OVERLAY_Z = 2147483647;

const ProductOptionsModal = ({ embedOnProductPage = false }: { embedOnProductPage?: boolean }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isProductPage = pathname.includes("/products/");
  const zButton = embedOnProductPage ? EMBEDDED_OVERLAY_Z : FLOATING_ICON_Z;

  const handleFloatingButtonClick = () => {
    setOpen(true);
  };

  const buttonClass =
    "w-full justify-start text-foreground bg-background border-border hover:bg-accent hover:text-accent-foreground";

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-md overflow-visible border border-border bg-background text-foreground shadow-lg"
          style={embedOnProductPage ? { zIndex: EMBEDDED_OVERLAY_Z } : undefined}
          overlayClassName={embedOnProductPage ? "z-[2147483647]" : undefined}
        >
          <DialogHeader>
            <DialogTitle className="text-foreground">Assistant</DialogTitle>
          </DialogHeader>
          <div className="flex min-h-[180px] flex-col justify-center gap-3 overflow-visible pt-2">
            <Button
              variant="outline"
              className={buttonClass}
              onClick={() => {
                setOpen(false);
                // TODO: Virtual try-on
              }}
            >
              Virtual try-on
            </Button>
            <Button
              variant="outline"
              className={buttonClass}
              onClick={() => {
                setOpen(false);
                // TODO: Size recommendation
              }}
            >
              Size recommendation
            </Button>
            <Button
              variant="outline"
              className={buttonClass}
              onClick={() => {
                setOpen(false);
                // TODO: Outfit builder
              }}
            >
              Outfit builder
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <button
        type="button"
        onClick={handleFloatingButtonClick}
        className={`fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-background text-foreground shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${embedOnProductPage ? "pointer-events-auto" : ""}`}
        style={{ zIndex: zButton }}
        aria-label={isProductPage ? "Open assistant" : "Open assistant"}
      >
        <img
          src="/logo-BAwvdGpg.png"
          alt="Assistant"
          className="h-full w-full object-cover rounded-full"
        />
      </button>
    </>
  );
};

const AppContent = () => {
  const { pathname } = useLocation();
  const isProductPage = pathname.includes("/products/");
  const isEmbeddedStaticPage = pathname.includes("/barba-napoli/");

  if (isProductPage || isEmbeddedStaticPage) {
    return (
      <div className="pointer-events-none fixed inset-0 z-[2147483647]">
        <ProductOptionsModal embedOnProductPage />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<RedirectToVangelis />} />
        <Route path="/app" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ProductOptionsModal />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
