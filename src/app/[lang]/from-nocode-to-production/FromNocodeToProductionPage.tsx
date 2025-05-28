'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, XCircle, Zap, Shield, Gauge, Code, Rocket, Users, AlertCircle, GitBranch, Lock, Palette } from 'lucide-react';
import SectionDivider from '@/components/SectionDivider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FromNocodeToProductionPage() {
  const t = useTranslations('FromNocodeToProduction');

  const limitations = [
    {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      bgColor: 'bg-white dark:bg-gray-800',
      borderColor: 'border-gray-200 dark:border-gray-700',
      title: t('limitations.backend'),
      description: t('limitations.backendDesc'),
    },
    {
      icon: <Gauge className="w-6 h-6 text-orange-500" />,
      bgColor: 'bg-white dark:bg-gray-800',
      borderColor: 'border-gray-200 dark:border-gray-700',
      title: t('limitations.scale'),
      description: t('limitations.scaleDesc'),
    },
    {
      icon: <Lock className="w-6 h-6 text-yellow-500" />,
      bgColor: 'bg-white dark:bg-gray-800',
      borderColor: 'border-gray-200 dark:border-gray-700',
      title: t('limitations.security'),
      description: t('limitations.securityDesc'),
    },
    {
      icon: <Palette className="w-6 h-6 text-purple-500" />,
      bgColor: 'bg-white dark:bg-gray-800',
      borderColor: 'border-gray-200 dark:border-gray-700',
      title: t('limitations.customization'),
      description: t('limitations.customizationDesc'),
    },
  ];

  const solutions = [
    {
      icon: <Code className="w-8 h-8" />,
      iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      title: t('solutions.backend'),
      description: t('solutions.backendDesc'),
      features: [
        t('solutions.backendFeature1'),
        t('solutions.backendFeature2'),
        t('solutions.backendFeature3'),
      ],
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
      title: t('solutions.performance'),
      description: t('solutions.performanceDesc'),
      features: [
        t('solutions.performanceFeature1'),
        t('solutions.performanceFeature2'),
        t('solutions.performanceFeature3'),
      ],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      title: t('solutions.security'),
      description: t('solutions.securityDesc'),
      features: [
        t('solutions.securityFeature1'),
        t('solutions.securityFeature2'),
        t('solutions.securityFeature3'),
      ],
    },
  ];

  const process = [
    {
      step: '1',
      color: 'from-purple-500 to-pink-500',
      title: t('process.audit'),
      description: t('process.auditDesc'),
    },
    {
      step: '2',
      color: 'from-blue-500 to-cyan-500',
      title: t('process.architecture'),
      description: t('process.architectureDesc'),
    },
    {
      step: '3',
      color: 'from-green-500 to-emerald-500',
      title: t('process.migration'),
      description: t('process.migrationDesc'),
    },
    {
      step: '4',
      color: 'from-orange-500 to-red-500',
      title: t('process.optimization'),
      description: t('process.optimizationDesc'),
    },
  ];

  const platforms = ['Bolt', 'Lovable', 'Replit', 'Bubble', 'FlutterFlow', 'Webflow', 'Glide', 'Softr'];

  return (
    <div className="min-h-screen">
      {/* Hero Section avec animations similaires à la page d'accueil */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background gradient blobs comme dans HeroSection */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 dark:bg-indigo-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white border-none">
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {platforms.map((platform) => (
                <Badge 
                  key={platform} 
                  variant="outline"
                  className="hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 hover:border-indigo-500 transition-all duration-300"
                >
                  {platform}
                </Badge>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                asChild
              >
                <Link href="#contact">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#process">
                  {t('hero.ctaSecondary')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider type="wave" fillClassName="fill-gray-50 dark:fill-gray-950/50" />

      {/* Problem Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-950/50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl md:text-4xl font-bold">
                {t('problem.title')}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              {t('problem.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {limitations.map((limitation, index) => (
              <Card 
                key={index} 
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                      {limitation.icon}
                    </div>
                    {limitation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{limitation.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider type="tilt" fillClassName="fill-white dark:fill-gray-900" />

      {/* Solution Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none">
              VibeCodr
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('solution.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('solution.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 group"
              >
                <CardHeader>
                  <div className={`mb-4 w-16 h-16 rounded-2xl ${solution.iconBg} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                    {solution.icon}
                  </div>
                  <CardTitle>{solution.title}</CardTitle>
                  <CardDescription>{solution.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider type="curve" fillClassName="fill-indigo-50 dark:fill-indigo-950/20" />

      {/* Process Section */}
      <section id="process" className="py-16 px-4 bg-indigo-50 dark:bg-indigo-950/20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <GitBranch className="w-8 h-8 text-indigo-600" />
              <h2 className="text-3xl md:text-4xl font-bold">
                {t('process.title')}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              {t('process.subtitle')}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {process.map((step, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform`}>
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider type="wave" fillClassName="fill-white dark:fill-gray-900" />

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('benefits.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle>{t('benefits.speed')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('benefits.speedDesc')}</p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <Rocket className="w-6 h-6" />
                </div>
                <CardTitle>{t('benefits.scalability')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('benefits.scalabilityDesc')}</p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle>{t('benefits.expertise')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('benefits.expertiseDesc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-950/50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('faq.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('faq.subtitle')}
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'].map((key) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-medium">{t(`faq.items.${key}.question`)}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t(`faq.items.${key}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">{t('cta.title')}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              asChild
            >
              <Link href="/fr/mvp-development/discovery">
                {t('cta.button')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/fr/mvp-development">
                {t('cta.buttonSecondary')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 