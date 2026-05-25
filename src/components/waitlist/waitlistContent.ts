export interface WaitlistFooterGroup {
  links: readonly WaitlistLink[];
  title: string;
}

export interface WaitlistLink {
  href: string;
  label: string;
}

export interface WaitlistNavigationLink extends WaitlistLink {
  hasSubmenu?: boolean;
}

export const waitlistFooterGroups: readonly WaitlistFooterGroup[] = [
  {
    links: [
      { href: "#funcionalidades", label: "Funcionalidades" },
      { href: "#precios", label: "Precios" },
      { href: "#casos-de-uso", label: "Casos de uso" },
    ],
    title: "Producto",
  },
  {
    links: [
      { href: "#sobre-nosotros", label: "Sobre nosotros" },
      { href: "#contacto", label: "Contacto" },
      { href: "#lista-espera", label: "Lista de espera" },
    ],
    title: "Nosotros",
  },
  {
    links: [
      { href: "#terminos", label: "Términos de servicio" },
      { href: "#privacidad", label: "Políticas de privacidad" },
      { href: "/404", label: "404" },
    ],
    title: "Recursos",
  },
];

export const waitlistNavigationLinks: readonly WaitlistNavigationLink[] = [
  { hasSubmenu: true, href: "#producto", label: "Producto" },
  { href: "#precios", label: "Precios" },
  { href: "#acerca-de", label: "Acerca de" },
  { hasSubmenu: true, href: "#recursos", label: "Recursos" },
  { href: "#waitlist", label: "Waitlist" },
];

export const waitlistSocialLinks: readonly WaitlistLink[] = [
  { href: "https://wa.me/", label: "WhatsApp" },
  { href: "https://github.com/", label: "GitHub" },
  { href: "https://www.youtube.com/", label: "YouTube" },
];
