import "./Landing.css";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Mission from "./Mission";
import Footer from "./Footer";

export default function LandingPage() {
    return (
        <div className="bg-background text-on-background min-h-screen flex flex-col antialiased">
            <Navbar />

            <main className="flex-grow pt-24">
                <Hero />
                <Features />
                <Mission />
            </main>

            <Footer />
        </div>
    );
}
