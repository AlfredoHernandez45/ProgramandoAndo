/**
 * Configuración y Scripts Interactivos - Portafolio José Alfredo López Hernández
 * Programando Ando
 */

// Configuración de Tailwind CSS
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#2563EB",
                "primary-dark": "#1D4ED8",
                "accent-pink": "#EC4899",
                "accent-emerald": "#10B981",
                "background-light": "#F8FAFC",
                "background-dark": "#0B1120",
                "surface-light": "#FFFFFF",
                "surface-dark": "#1E293B",
            },
            fontFamily: {
                display: ["Plus Jakarta Sans", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.75rem",
            },
        },
    },
};

document.addEventListener("DOMContentLoaded", () => {
    // 1. Manejo del Tema Claro / Oscuro con persistencia en localStorage
    const themeToggleBtn = document.getElementById("theme-toggle");
    const mobileThemeToggleBtn = document.getElementById("mobile-theme-toggle");

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    if (themeToggleBtn) themeToggleBtn.addEventListener("click", toggleTheme);
    if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener("click", toggleTheme);

    // 2. Menú Móvil
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
            });
        });
    }

    // 3. Filtrado de Proyectos por Categoría
    const filterButtons = document.querySelectorAll(".project-filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category.includes(filter)) {
                    card.classList.remove("hidden");
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        card.classList.add("hidden");
                    }, 200);
                }
            });
        });
    });

    // 4. Copiar al portapapeles con Toast de notificación
    window.copyToClipboard = function(text, elementId) {
        navigator.clipboard.writeText(text).then(() => {
            const toast = document.getElementById("copy-toast");
            if (toast) {
                toast.classList.remove("opacity-0", "pointer-events-none", "translate-y-4");
                toast.classList.add("opacity-100", "translate-y-0");
                setTimeout(() => {
                    toast.classList.remove("opacity-100", "translate-y-0");
                    toast.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
                }, 2200);
            }
        }).catch(err => {
            console.error("Error al copiar texto:", err);
        });
    };
});
