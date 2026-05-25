import * as React from "react";

const { useCallback, useState } = React;

interface FormData {
  email: string;
  message: string;
  name: string;
  phone: string;
}

interface FormErrors {
  email?: string;
  message?: string;
  name?: string;
  phone?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    message: "",
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor ingresa un email válido";
    }

    // Validar teléfono (opcional, pero si se provee debe ser válido)
    const phoneRegex = /^[\d\s\-+()]+$/u;
    if (formData.phone.trim()) {
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Por favor ingresa un número telefónico válido";
      } else if (formData.phone.replaceAll(/\D/gu, "").length < 10) {
        newErrors.phone = "El número debe tener al menos 10 dígitos";
      }
    }

    // Validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      // Limpiar error cuando el usuario empieza a escribir
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
    [errors]
  );

  const clearMessages = useCallback(() => {
    setSuccessMessage("");
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSuccessMessage("");
      setErrorMessage("");

      if (!validateForm()) {
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch("/api/contact", {
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || "Error al enviar el formulario");
        }

        // Guardar en localStorage por respaldo
        try {
          const submissions = JSON.parse(
            localStorage.getItem("contactSubmissions") || "[]"
          ) as (FormData & { createdAt: string; status: string })[];
          submissions.push({
            ...formData,
            createdAt: new Date().toISOString(),
            status: "pending",
          });
          localStorage.setItem(
            "contactSubmissions",
            JSON.stringify(submissions)
          );
        } catch {
          // Ignorar fallos de localStorage
        }

        setSuccessMessage(
          "¡Tu mensaje ha sido enviado exitosamente! Nos pondremos en contacto pronto."
        );
        setFormData({
          email: "",
          message: "",
          name: "",
          phone: "",
        });

        // Limpiar mensaje de éxito después de 5 segundos
        setTimeout(clearMessages, 5000);
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : "Error desconocido";
        setErrorMessage(errorMsg);
      } finally {
        setIsLoading(false);
      }
    },
    [clearMessages, formData, validateForm]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          {successMessage}
        </div>
      )}

      {/* Mensaje de error */}
      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {errorMessage}
        </div>
      )}

      {/* Nombre */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-foreground"
        >
          Nombre
        </label>
        <input
          id="name"
          aria-label="Nombre de contacto"
          className={`w-full border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
            errors.name ? "border-red-500" : "border-border"
          }`}
          disabled={isLoading}
          name="name"
          placeholder="Jose Hernandez"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          id="email"
          aria-label="Email de contacto"
          className={`w-full border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
            errors.email ? "border-red-500" : "border-border"
          }`}
          disabled={isLoading}
          name="email"
          placeholder="example@gmail.com"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* Teléfono */}
      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-foreground"
        >
          Numero telefonico
        </label>
        <input
          id="phone"
          aria-label="Número telefónico de contacto"
          className={`w-full border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
            errors.phone ? "border-red-500" : "border-border"
          }`}
          disabled={isLoading}
          name="phone"
          placeholder="+52 234 234 8923"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
      </div>

      {/* Mensaje */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground"
        >
          Como podemos ayudarte en tu negocio?
        </label>
        <textarea
          id="message"
          aria-label="Mensaje de contacto"
          className={`w-full border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 resize-none ${
            errors.message ? "border-red-500" : "border-border"
          }`}
          disabled={isLoading}
          name="message"
          placeholder="Cuéntanos sobre tus metas, dificultades o que te gustaría que este en la aplicación"
          rows={5}
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {isLoading ? "Enviando..." : "ENVIAR"}
      </button>
    </form>
  );
}
