import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { ProductsTab } from "./components/products/tab"
import { TabsSkeleton } from "./components/products/skeleton"
import { Toaster } from "sonner"

const App = () => {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <div className="mx-3">
          <Suspense fallback={<TabsSkeleton />}>
            <ProductsTab />
          </Suspense>
        </div>
        <Footer />
      </div>
      <Toaster />
    </ThemeProvider>
  )
}


export default App
