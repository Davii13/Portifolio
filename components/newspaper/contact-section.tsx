"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, FormEvent } from "react"
import { Mail, MapPin, Phone, Github, Linkedin, Send, Loader2 } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"
import emailjs from '@emailjs/browser'

export function ContactSection() {
  const { lang } = useLanguage()
  const t = texts.contact

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  // Estados do formulário e carregamento
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Disparo do email com as suas chaves reais atualizadas!
await emailjs.send(
  'service_pywzf2q',
  'template_2jhz9qn',
  {
    from_name: formData.name,
    reply_to: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_email: "davinunescarvalho35@gmail.com" // <- necessário
  },
  'Y5OZIjICTnbDNX_Xl'
)
      alert(lang === 'pt' ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!')
      setFormData({ name: "", email: "", subject: "", message: "" }) // Limpa os campos
    } catch (error) {
      console.error(error)
      alert(lang === 'pt' ? 'Erro ao enviar a mensagem. Tente novamente.' : 'Error sending message. Try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "davinunescarvalho35@gmail.com",
      href: "davinunescarvalho35@gmail.com",
    },
    {
      icon: Phone,
      label: lang === "pt" ? "Telefone" : "Phone",
      value: "+55 (31) 99614-6933",
      href: "tel:+5531996146933",
    },
    {
      icon: MapPin,
      label: lang === "pt" ? "Localização" : "Location",
      value: lang === "pt" ? "Minas Gerais, MG - Brasil" : "Minas Gerais , MG - Brazil",
      href: "#",
    },
  ]

  const socials = [
    { icon: Github, label: "GitHub", value: "github.com/davii13/", href: "github.com/davii13/" },
    { icon: Linkedin, label: "LinkedIn", value: "www.linkedin.com/in/davi-nunes-carvalho", href: "#" },
  ]

  return (
    <section id="contato" className="relative bg-card py-28 md:py-40" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              08 / {lang === "pt" ? "CONTATO" : "CONTACT"}
            </span>
            <div className="h-px flex-1 bg-border max-w-[120px]" />
          </div>

          <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-card-foreground uppercase leading-[0.85] tracking-[-0.02em]">
            {t.titleLine1[lang]}
            <br />
            <span className="text-card-foreground/15">
              {t.titleLine2[lang]}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5"
          >
            <p className="font-serif text-xl md:text-2xl text-card-foreground leading-relaxed mb-10">
              {t.intro[lang]}
            </p>

            <div className="flex flex-col gap-6 mb-10">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="group flex items-start gap-4"
                >
                  <div className="p-2.5 border border-border group-hover:border-primary group-hover:text-primary transition-colors">
                    <item.icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-card-foreground/40">
                      {item.label}
                    </p>
                    <p className="font-sans text-sm text-card-foreground group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="border-t border-border pt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-card-foreground/40 mb-4">
                {t.socialTitle[lang]}
              </p>

              <div className="flex flex-col gap-4">
                {socials.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    className="group flex items-center gap-3 text-card-foreground hover:text-primary transition-colors"
                    whileHover={{ x: 6 }}
                  >
                    <item.icon size={16} />
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em]">
                      {item.value}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-7"
          >
            <div className="border border-border p-8 md:p-10">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-8">
                {t.formTitle[lang]}
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-card-foreground/40 block mb-2">
                      {t.fields.name[lang]}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t.placeholders.name[lang]}
                      className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-card-foreground focus:border-primary outline-none transition-colors placeholder:text-card-foreground/25"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-card-foreground/40 block mb-2">
                      {t.fields.email[lang]}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t.placeholders.email[lang]}
                      className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-card-foreground focus:border-primary outline-none transition-colors placeholder:text-card-foreground/25"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-card-foreground/40 block mb-2">
                    {t.fields.subject[lang]}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={t.placeholders.subject[lang]}
                    className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-card-foreground focus:border-primary outline-none transition-colors placeholder:text-card-foreground/25"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-card-foreground/40 block mb-2">
                    {t.fields.message[lang]}
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t.placeholders.message[lang]}
                    className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-card-foreground focus:border-primary outline-none transition-colors resize-none placeholder:text-card-foreground/25"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-mono text-[10px] uppercase tracking-[0.15em] self-start disabled:opacity-70 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                >
                  {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  {isSubmitting ? (lang === 'pt' ? 'Enviando...' : 'Sending...') : t.button[lang]}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}