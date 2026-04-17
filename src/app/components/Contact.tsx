import { useState } from "react";
import { Phone, MapPin, Clock, Mail, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "../data";
// import electro from "../../assets/electro.png";
import electro from '../../assets/logooo.png';


interface ContactProps {
  compact?: boolean; // true = versión /home
}

export default function Contact({ compact = false }: ContactProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    servicio: "",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola! Me gustaría solicitar un presupuesto:\n\nNombre: ${formData.nombre}\nEmail: ${formData.email}\nTeléfono: ${formData.telefono}\nServicio: ${formData.servicio}\nMensaje: ${formData.mensaje}`;
    window.open(
      `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contacto"
      className={compact ? "py-16 bg-white" : "py-20 bg-white"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-gray-900">Contáctenos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos listos para asesorarte y brindarte un presupuesto sin
            compromiso
          </p>
        </div>

        {/* Quick contact buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent("Hola! Quisiera consultar sobre sus servicios.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-medium transition-colors text-lg"
          >
            <FaWhatsapp className="w-6 h-6" />
            Consultar por WhatsApp
          </a>
          <a
            href={`tel:${CONTACT.phones[0].href.replace("tel:", "")}`}
            className="inline-flex items-center justify-center gap-3 bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-xl font-medium transition-colors text-lg"
          >
            <Phone className="w-5 h-5" />
            Llamar Ahora
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          {/* <div className="bg-gray-50 rounded-xl p-8"> */}
          <div className="bg-gray-50 rounded-xl p-8 flex flex-col h-full">
            <h3 className="text-2xl mb-6 text-gray-900">
              Solicitar Presupuesto
            </h3>
            <div className="flex flex-col h-full">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium mb-1.5 text-gray-700"
                  >
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1.5 text-gray-700"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="telefono"
                      className="block text-sm font-medium mb-1.5 text-gray-700"
                    >
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="servicio"
                    className="block text-sm font-medium mb-1.5 text-gray-700"
                  >
                    Servicio de Interés
                  </label>
                  <select
                    id="servicio"
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-white"
                  >
                    <option value="">Seleccione un servicio</option>
                    <option value="Perforaciones">Perforaciones</option>
                    <option value="Reparación de Electrobombas">
                      Reparación de Electrobombas
                    </option>
                    <option value="Bobinados">Bobinados</option>
                    <option value="Filmaciones">Filmaciones</option>
                    <option value="Limpieza de Perforación">
                      Limpieza de Perforación
                    </option>
                    <option value="Pesca de Electrobombas">
                      Pesca de Electrobombas
                    </option>
                    <option value="Estudios Geológicos">
                      Estudios Geológicos
                    </option>
                    <option value="Venta de Bombas">Venta de Bombas</option>
                    <option value="Asesoramiento">Asesoramiento</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-sm font-medium mb-1.5 text-gray-700"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Cuéntenos sobre su proyecto..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Enviar Consulta por WhatsApp
                </button>
              </form>
              {/* Logo centrado */}
              {/* <div className="mt-6 flex justify-center"> */}
              <div className="mt-auto pt-6 flex justify-center ">
                <img
                  src={electro}
                  alt="Arenas Perforaciones"
                  className="h-30 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-700 to-red-900 rounded-xl p-8 text-white">
              <h3 className="text-2xl mb-8">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-lg p-3 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Teléfonos</h4>
                    {CONTACT.phones.map((p) => (
                      <div key={p.label}>
                        <a
                          href={p.href}
                          className="text-white/90 hover:text-white text-sm block"
                        >
                          {p.number}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-lg p-3 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Dirección</h4>
                    <p className="text-white/90 text-sm">{CONTACT.address}</p>
                  </div>
                </div> */}
                <a
                  href={CONTACT.mapEmbedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="bg-white/20 rounded-lg p-3 flex-shrink-0 group-hover:bg-white/30 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Dirección</h4>
                    <p className="text-white/90 text-sm group-hover:text-white transition-colors">
                      {CONTACT.address}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-lg p-3 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Horarios</h4>
                    <p className="text-white/90 text-sm">
                      {CONTACT.hours.weekdays}
                    </p>
                    <p className="text-white/90 text-sm">
                      {CONTACT.hours.saturday}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-lg p-3 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-white/90 hover:text-white text-sm"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-lg p-3 flex-shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">LinkedIn</h4>
                    <a
                      href={CONTACT.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 hover:text-white text-sm"
                    >
                      Sergio Antonio Arenas
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <h4 className="font-medium mb-3">Zonas de Cobertura</h4>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
                  {CONTACT.zones.map((z) => (
                    <span key={z} className="w-[45%]">
                      • {z}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Map centrado */}
            <div className="w-full flex justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.683766311607!2d-68.78745612469731!3d-32.93295237359884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0d6058c59e1f%3A0x7ec900e164996530!2sARENAS%20ELECTROBOMBAS!5e0!3m2!1ses-419!2sar!4v1775514526561!5m2!1ses-419!2sar"
                width="600"
                height="450"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
