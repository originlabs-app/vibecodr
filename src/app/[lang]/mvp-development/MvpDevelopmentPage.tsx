'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Rocket, 
  Code, 
  Users, 
  Zap, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Briefcase,
  TrendingUp,
  Sparkles,
  Target,
  Lightbulb,
  X,
  FileCode,
  Smartphone,
  Calculator,
  FileText,
  Lock,
  Scale,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const MvpDevelopmentPage = () => {
  const t = useTranslations('MvpDevelopmentPage');
  const params = useParams();
  const currentLang = params.lang as string || 'fr';

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeIn} className="text-center max-w-6xl mx-auto">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full border border-primary/20"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">{t('hero.badge')}</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block">{t('hero.title.part1')}</span>
              <span className="text-gradient bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {t('hero.title.highlight')}
              </span>
              <span className="block">{t('hero.title.part2')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${currentLang}/mvp-development/discovery`}>
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all">
                  <Rocket className="mr-2 h-5 w-5" />
                  Démarrer mon MVP
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#process">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 hover:bg-primary/5">
                  <Target className="mr-2 h-5 w-5" />
                  {t('hero.cta.discover')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16 max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {t('value.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('value.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Traditional Approach */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full border-2 border-red-200/50 dark:border-red-900/30 bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                      <X className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {t('value.traditional.title')}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-red-500 mt-1 text-xl">✗</span>
                        <span className="text-muted-foreground leading-relaxed">{t(`value.traditional.item${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Our Approach */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="h-full border-2 border-green-200/50 dark:border-green-900/30 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 bg-gradient-to-br from-yellow-400 to-orange-400 text-white rounded-bl-xl">
                  <Sparkles className="h-5 w-5" />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {t('value.our.title')}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground leading-relaxed">{t(`value.our.item${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-gradient-to-b from-muted/30 to-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16 max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('process.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('process.subtitle')}
            </p>
          </motion.div>

          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
          >
            {[
              { icon: Briefcase, key: 'consultation', color: 'from-blue-500 to-cyan-500' },
              { icon: Lightbulb, key: 'planning', color: 'from-purple-500 to-pink-500' },
              { icon: Zap, key: 'development', color: 'from-orange-500 to-red-500' },
              { icon: Shield, key: 'delivery', color: 'from-green-500 to-emerald-500' },
              { icon: TrendingUp, key: 'support', color: 'from-indigo-500 to-purple-500' }
            ].map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{t(`process.steps.${step.key}.title`)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(`process.steps.${step.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
                {index < 4 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 w-6 h-6" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16 max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('features.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              { icon: Rocket, key: 'fast', gradient: 'from-blue-600 to-cyan-600' },
              { icon: Shield, key: 'quality', gradient: 'from-green-600 to-emerald-600' },
              { icon: Users, key: 'support', gradient: 'from-purple-600 to-pink-600' },
              { icon: Code, key: 'tech', gradient: 'from-orange-600 to-red-600' },
              { icon: TrendingUp, key: 'scalable', gradient: 'from-indigo-600 to-purple-600' },
              { icon: Clock, key: 'time', gradient: 'from-pink-600 to-rose-600' }
            ].map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30 group overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  <CardContent className="p-8 relative">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      {t(`features.items.${feature.key}.title`)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`features.items.${feature.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-24 bg-gradient-to-b from-muted/10 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16 max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('guarantees.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('guarantees.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Shield, key: 'satisfaction', color: 'from-green-500 to-emerald-500' },
              { icon: FileCode, key: 'source', color: 'from-blue-500 to-cyan-500' },
              { icon: FileText, key: 'documentation', color: 'from-purple-500 to-pink-500' },
              { icon: Code, key: 'quality', color: 'from-orange-500 to-red-500' },
              { icon: Lock, key: 'rgpd', color: 'from-indigo-500 to-purple-500' },
              { icon: Scale, key: 'legal', color: 'from-teal-500 to-green-500' }
            ].map((guarantee, index) => (
              <motion.div
                key={guarantee.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-primary/30 transition-all">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${guarantee.color} rounded-xl flex items-center justify-center mb-4`}>
                      <guarantee.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      {t(`guarantees.items.${guarantee.key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`guarantees.items.${guarantee.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16 max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('technologies.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('technologies.subtitle')}
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Tech Stack Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
              {[
                { name: 'React', icon: '⚛️' },
                { name: 'Node.js', icon: '🟢' },
                { name: 'TypeScript', icon: '🔷' },
                { name: 'Next.js', icon: '▲' },
                { name: 'PostgreSQL', icon: '🐘' },
                { name: 'Supabase', icon: '⚡' },
                { name: 'Tailwind', icon: '🎨' },
                { name: 'Docker', icon: '🐳' },
                { name: 'AWS', icon: '☁️' },
                { name: 'Vercel', icon: '▲' },
                { name: 'Stripe', icon: '💳' },
                { name: 'OpenAI', icon: '🤖' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex flex-col items-center p-4 bg-card rounded-xl border hover:border-primary/30 transition-all hover:shadow-lg group"
                >
                  <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{tech.icon}</span>
                  <span className="text-sm font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Architecture Diagram */}
            {/* SUPPRIMÉ: Architecture type d'un MVP moderne */}

            {/* Why These Technologies */}
            {/* SUPPRIMÉ: Performance optimale et Évolutivité garantie */}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-24 bg-gradient-to-b from-transparent to-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16 max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t('calculator.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('calculator.subtitle')}
            </p>
          </motion.div>

          {/* Teaser avec 3 chiffres clés */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="text-center p-6 border-2 hover:border-primary/30 transition-all hover:shadow-xl">
                  <CardContent className="p-0">
                    <div className="text-4xl font-bold text-primary mb-2">5 000€</div>
                    <p className="text-sm text-muted-foreground">Prix moyen MVP</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="text-center p-6 border-2 hover:border-green-500/30 transition-all hover:shadow-xl">
                  <CardContent className="p-0">
                    <div className="text-4xl font-bold text-green-600 mb-2">-75%</div>
                    <p className="text-sm text-muted-foreground">Économies vs agence</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="text-center p-6 border-2 hover:border-purple-500/30 transition-all hover:shadow-xl">
                  <CardContent className="p-0">
                    <div className="text-4xl font-bold text-purple-600 mb-2">3 semaines</div>
                    <p className="text-sm text-muted-foreground">Délai moyen</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Link href={`/${currentLang}/mvp-development/calculator`}>
                <Button size="lg" className="h-16 px-12 text-lg shadow-2xl bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90 transition-all duration-300">
                  <Calculator className="mr-3 h-6 w-6" />
                  Calculer mon projet en 30 secondes
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-4 italic">
                Estimation personnalisée instantanée • Sans engagement
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-muted/10 to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16 max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('testimonials.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <Card className="h-full border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl">
                  <CardContent className="p-8">
                    <div className="flex mb-6 gap-1">
                      {[...Array(5)].map((_, index) => (
                        <Star key={index} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic text-lg leading-relaxed">
                      &ldquo;{t(`testimonials.items.testimonial${i}.quote`)}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {t(`testimonials.items.testimonial${i}.name`).charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold">{t(`testimonials.items.testimonial${i}.name`)}</p>
                        <p className="text-sm text-muted-foreground">
                          {t(`testimonials.items.testimonial${i}.role`)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16 max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('pricing.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* MVP Package */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="relative overflow-hidden border-2 border-primary/30 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="absolute top-0 right-0 bg-gradient-to-br from-primary to-purple-600 text-primary-foreground px-6 py-2 text-sm font-bold rounded-bl-2xl shadow-lg">
                  {t('pricing.mvp.badge')}
                </div>
                <CardContent className="p-10">
                  <h3 className="text-3xl font-bold mb-3">{t('pricing.mvp.title')}</h3>
                  <p className="text-muted-foreground mb-6 text-lg">{t('pricing.mvp.subtitle')}</p>
                  <div className="mb-8">
                    <span className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">{t('pricing.mvp.price')}</span>
                    <span className="text-muted-foreground ml-2 text-lg">{t('pricing.mvp.period')}</span>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full mt-0.5">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-foreground/80">{t(`pricing.mvp.features.feature${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${currentLang}/mvp-development/discovery`} className="block">
                    <Button size="lg" className="w-full h-16 text-lg shadow-2xl bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90 transition-all duration-300">
                      <Rocket className="mr-2 h-6 w-6" />
                      Démarrer mon MVP
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Growth Package */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-2 hover:border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-10">
                  <h3 className="text-3xl font-bold mb-3">{t('pricing.growth.title')}</h3>
                  <p className="text-muted-foreground mb-6 text-lg">{t('pricing.growth.subtitle')}</p>
                  <div className="mb-8">
                    <span className="text-5xl font-bold">{t('pricing.growth.price')}</span>
                    <span className="text-muted-foreground ml-2 text-lg">{t('pricing.growth.period')}</span>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="p-1 bg-primary/10 rounded-full mt-0.5">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-foreground/80">{t(`pricing.growth.features.feature${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${currentLang}/mvp-development/discovery`} className="block">
                    <Button size="lg" className="w-full h-16 text-lg shadow-2xl bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90 transition-all duration-300">
                      <Rocket className="mr-2 h-6 w-6" />
                      Démarrer mon MVP
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16 max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('faq.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="max-w-4xl mx-auto">
            {[
              'cost',
              'difference',
              'features',
              'patent',
              'timeline',
              'technologies',
              'ownership',
              'support'
            ].map((key, index) => (
              <AccordionItem key={key} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{t(`faq.items.${key}.question`)}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t(`faq.items.${key}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div {...fadeIn} className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href={`/${currentLang}/mvp-development/discovery`}>
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all h-12 px-8 text-lg">
                  <Rocket className="mr-2 h-5 w-5" />
                  Démarrer mon MVP
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href={`/${currentLang}/contact`}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 hover:bg-primary/5 h-12 px-8 text-lg">
                  {t('cta.button.contact')}
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground italic">
              {t('cta.note')}
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default MvpDevelopmentPage; 