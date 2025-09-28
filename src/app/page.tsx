import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, Layout, Smartphone, ShieldCheck, TrendingUp, Clock, Smile } from "lucide-react";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { defaultBusinessConfig } from "@/config/business";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type TextProps = React.HTMLAttributes<HTMLParagraphElement>;

function Heading({ className, ...props }: HeadingProps) {
  return <h2 className={cn("text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl", className)} {...props} />;
}

function Text({ className, ...props }: TextProps) {
  return <p className={cn("text-sm leading-relaxed text-slate-600", className)} {...props} />;
}

const features = [
  {
    title: "Interface limpa",
    description: "Layouts fluidos que valorizam o conteudo e facilitam a leitura em qualquer tela.",
    icon: Sparkles,
  },
  {
    title: "Arquitetura clara",
    description: "Cada secao tem um objetivo: explicar, mostrar beneficio e convidar para a acao.",
    icon: Layout,
  },
  {
    title: "Mobile first",
    description: "Componentes responsivos garantem que a experiencia funcione bem no celular.",
    icon: Smartphone,
  },
  {
    title: "Confianca",
    description: "Depoimentos e dados organizados ajudam o visitante a sentir seguranca na oferta.",
    icon: ShieldCheck,
  },
];

const testimonials = [
  {
    name: "Ana Rocha",
    role: "Consultora",
    quote: "A landing ficou pronta em poucos dias e os visitantes entendem rapido o que eu faco.",
  },
  {
    name: "Pedro Alves",
    role: "Fundador da NextFit",
    quote: "O time usou termos simples, organizou os beneficios e o CTA trouxe mais leads.",
  },
  {
    name: "Luiza Ramos",
    role: "Marketing Freelancer",
    quote: "Os componentes do ShadCN deram o visual minimalista que eu queria, sem pesar no codigo.",
  },
];

const metrics = [
  {
    value: "+120",
    label: "sites e landing pages publicados",
    icon: TrendingUp,
  },
  {
    value: "3 dias",
    label: "prazo medio para entregar uma landing page",
    icon: Clock,
  },
  {
    value: "98%",
    label: "clientes dizem compreender cada etapa do projeto",
    icon: Smile,
  },
];

const caseStudies = [
  {
    title: "FinanControl - app financeiro gamificado",
    description:
      "Aplicacao com login claro, funil de registro e ilustracao amigavel. Criamos toda a camada visual, textos e configuracoes de conversao.",
    image: "https://s.wordpress.com/mshots/v1/https://financontrol-beta.vercel.app/login?w=1200",
    href: "https://financontrol-beta.vercel.app/login",
    cta: "Abrir FinanControl",
  },
  {
    title: "Portfolio pessoal",
    description:
      "Conheca mais projetos, stack utilizada e bastidores do meu trabalho com presenca digital e sites sob medida.",
    image: "https://s.wordpress.com/mshots/v1/https://portfolio-next-mvqg.vercel.app/?w=1200",
    href: "https://portfolio-next-mvqg.vercel.app/",
    cta: "Ver portfolio completo",
  },
];

const footerLinks = [
  { label: "Servicos", href: "#features" },
  { label: "Resultados", href: "#metrics" },
  { label: "Planos", href: "#pricing" },
  { label: "Portfolio", href: "https://portfolio-next-mvqg.vercel.app/" },
  { label: "Politica de privacidade", href: "#" },
];

const pricingPlans = defaultBusinessConfig.pricing ?? [];
const whatsappUrl = `https://wa.me/${defaultBusinessConfig.whatsapp}?text=${encodeURIComponent(
  "Quero criar um site com a VFS Consultoria"
)}`;

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(148, 163, 184, 0.18) 0%, transparent 60%), radial-gradient(circle at 90% 10%, rgba(226, 232, 240, 0.35) 0%, transparent 55%)",
        }}
      />

      <header className="border-b border-slate-200 bg-white/70 backdrop-blur">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link href="#hero" className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-700">
            {defaultBusinessConfig.name.split(" - ")[0] ?? "VFS Consultoria"}
          </Link>
          <ul className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <li><Link href="#features" className="transition hover:text-slate-900">Servicos</Link></li>
            <li><Link href="#metrics" className="transition hover:text-slate-900">Resultados</Link></li>
            <li><Link href="#cases" className="transition hover:text-slate-900">Portfolio</Link></li>
            <li><Link href="#pricing" className="transition hover:text-slate-900">Planos</Link></li>
            <li><Link href="#testimonials" className="transition hover:text-slate-900">Depoimentos</Link></li>
            <li><Link href="/templates" className="transition hover:text-slate-900">Templates</Link></li>
          </ul>
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="outline" className="rounded-full border-slate-300 px-4 text-sm text-slate-700" asChild>
              <Link href={whatsappUrl} target="_blank" rel="noreferrer">
                Falar no WhatsApp
              </Link>
            </Button>
            <Button className="rounded-full bg-slate-900 px-5 text-sm font-semibold text-slate-50 hover:bg-slate-800" asChild>
              <Link href={defaultBusinessConfig.calendlyUrl ?? "#"} target="_blank" rel="noreferrer">
                Agendar conversa
              </Link>
            </Button>
          </div>
          <Button variant="outline" size="icon" className="md:hidden" aria-label="Abrir menu">
            <span className="size-1.5 rounded-full bg-slate-900" />
          </Button>
        </nav>
      </header>

      <main>
        <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-50">
          <div className="container mx-auto grid min-h-[70vh] max-w-6xl place-items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
            <div className="space-y-6">
              <Heading className="text-4xl font-bold sm:text-5xl">
                {defaultBusinessConfig.name}: presenca digital e sites com foco em resultado
              </Heading>
              <Text className="max-w-xl">{defaultBusinessConfig.description}</Text>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-full bg-slate-900 px-6 text-sm font-semibold text-white hover:bg-slate-800" asChild>
                  <Link href={defaultBusinessConfig.calendlyUrl ?? "#"} target="_blank" rel="noreferrer">
                    Quero planejar meu site
                  </Link>
                </Button>
                <Button variant="outline" className="rounded-full border-slate-400 px-6 text-sm text-slate-700" asChild>
                  <Link href="https://portfolio-next-mvqg.vercel.app/" target="_blank" rel="noreferrer">
                    Ver portfolio completo
                  </Link>
                </Button>
                <Button variant="outline" className="rounded-full border-slate-400 px-6 text-sm text-slate-700" asChild>
                  <Link href="/templates">Ver templates prontos</Link>
                </Button>
              </div>
              <div className="grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-100/80 p-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">O que fazemos</span>
                  <p className="mt-2 text-sm text-slate-700">
                    Montamos sites e landing pages que conectam com o cliente, com copy simples e foco em conversao.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-100/80 p-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Como entregamos</span>
                  <p className="mt-2 text-sm text-slate-700">
                    Processo guiado: briefing rapido, prototipo comentado, ajustes finais e publicacao assistida.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full max-w-md flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
                &quot;Voce envia logo, cores e ideia; nos cuidamos do layout, conteudo e configuracoes tecnicas.&quot; - VFS Consultoria
              </div>
              <div className="grid gap-3 text-xs text-slate-500">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">CTA claro</span>
                  <p className="mt-2 font-medium text-slate-700">Botao principal sempre visivel, pronto para WhatsApp ou agendamento.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Cards alinhados</span>
                  <p className="mt-2 font-medium text-slate-700">Grid responsivo com espacamento equilibrado, otimo para explicar servicos.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-slate-200 bg-white py-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
            <Heading className="text-center text-3xl font-semibold">Servicos explicados de forma simples</Heading>
            <Text className="mx-auto mt-3 max-w-2xl text-center">
              Sites rapidinhos, consultorias pontuais e pacotes completos para quem quer aparecer no Google, receber contatos e vender online sem complicacao.
            </Text>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {features.map((feature) => (
                <Card key={feature.title} className="border-slate-200 bg-slate-50/60 shadow-sm">
                  <CardContent className="flex items-start gap-4 p-6">
                    <span className="flex size-12 items-center justify-center rounded-full bg-slate-900/90 text-white">
                      <feature.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                      <Text className="mt-1 max-w-md text-slate-600">{feature.description}</Text>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="metrics" className="border-t border-slate-200 bg-slate-100 py-20">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
            <Heading className="text-center text-3xl font-semibold">Resultados em numeros</Heading>
            <Text className="mx-auto mt-3 max-w-xl text-center">
              Dados coletados dos projetos entregues nos ultimos meses. Cada pagina publicada recebe setup de analytics e relatorios simples.
            </Text>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {metrics.map((item) => (
                <Card key={item.label} className="border-slate-200 bg-white/90">
                  <CardContent className="flex flex-col items-start gap-3 p-6">
                    <span className="flex size-12 items-center justify-center rounded-full bg-slate-900 text-white">
                      <item.icon className="size-5" />
                    </span>
                    <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
                    <Text>{item.label}</Text>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="cases" className="border-t border-slate-200 bg-white py-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
            <Heading className="text-center text-3xl font-semibold">Veja na pratica</Heading>
            <Text className="mx-auto mt-3 max-w-2xl text-center">
              Dois exemplos recentes: um produto SaaS com foco em organizacao financeira e meu portfolio com bastidores dos projetos.
            </Text>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {caseStudies.map((item) => (
                <Card key={item.title} className="flex h-full flex-col border-slate-200 bg-slate-50">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <CardContent className="flex flex-1 flex-col gap-4 p-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                      <Text className="mt-2 text-slate-600">{item.description}</Text>
                    </div>
                    <Button className="mt-auto rounded-full bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800" asChild>
                      <Link href={item.href} target="_blank" rel="noreferrer">
                        {item.cta}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="border-t border-slate-200 bg-white py-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
            <Heading className="text-center text-3xl font-semibold">Planos transparentes</Heading>
            <Text className="mx-auto mt-3 max-w-2xl text-center">
              Escolha o formato certo para sua fase. Nao escondemos taxas: cada plano mostra o que entregamos, prazos e suporte.
            </Text>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`flex h-full flex-col border ${plan.highlight ? "border-slate-900 shadow-lg" : "border-slate-200"} bg-slate-50/70`}
                >
                  <CardContent className="flex flex-1 flex-col gap-4 p-6">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{plan.name}</span>
                      <p className="mt-3 text-3xl font-bold text-slate-900">{plan.priceMonthly}</p>
                      <Text className="mt-2 text-slate-600">{plan.description}</Text>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {plan.features?.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span className="mt-1 size-1.5 rounded-full bg-slate-900" aria-hidden />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-auto rounded-full bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800" asChild>
                      <Link href={plan.paymentLink ?? "#"} target="_blank" rel="noreferrer">
                        Conversar sobre este plano
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="border-t border-slate-200 bg-slate-100 py-20">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
            <Heading className="text-center text-3xl font-semibold">Quem ja aprovou</Heading>
            <Text className="mx-auto mt-3 max-w-xl text-center">
              Depoimentos curtos, com foto e descricao profissional. O objetivo e transmitir confianca sem poluir a tela.
            </Text>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((item) => (
                <Card key={item.name} className="border-slate-200 bg-white/80">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="bg-slate-200">
                        <AvatarFallback>{item.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                        <Text className="text-xs text-slate-500">{item.role}</Text>
                      </div>
                    </div>
                    <Text className="text-sm text-slate-600">&quot;{item.quote}&quot;</Text>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="border-t border-slate-200 bg-white py-10">
        <div className="container mx-auto flex flex-col gap-6 px-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{defaultBusinessConfig.name}</p>
            <p className="mt-2 text-xs">
              {defaultBusinessConfig.email} - {defaultBusinessConfig.phone}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-slate-700">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
}
