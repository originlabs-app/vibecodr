'use client';

import React, { useState } from 'react';
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
  Calendar,
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
  Database,
  Server,
  Smartphone,
  Calculator,
  Layers,
  GitBranch,
  FileText,
  Lock,
  Scale,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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

  // ROI Calculator Component
  const CalculatorForm = () => {
    const [projectType, setProjectType] = useState('saas');
    const [complexity, setComplexity] = useState([3]);
    const [timeline, setTimeline] = useState('normal');
    const [additionalFeatures, setAdditionalFeatures] = useState({
      payment: false,
      realtime: false,
      api: false,
      analytics: false,
      multiLanguage: false,
      emailNotifications: false,
      fileUpload: false,
      search: false,
      social: false,
      export: false
    });
    
    const optionalFeatureCosts = {
      payment: 1000,           // Stripe/PayPal avec outils IA
      realtime: 800,          // WebSockets générés par IA
      api: 600,               // API REST auto-documentée
      analytics: 500,         // Dashboard avec templates IA
      multiLanguage: 400,     // i18n automatisé
      emailNotifications: 300, // Templates emails IA
      fileUpload: 400,        // Upload optimisé
      search: 500,            // Recherche avec Algolia/ElasticSearch
      social: 600,            // OAuth social providers
      export: 400             // Export avec libraries IA
    };
    
    const calculateROI = () => {
      // Prix de base selon le type de projet (avec développement IA)
      // Prix réalistes pour un MVP complet, pas juste un prototype
      const basePrices = {
        saas: 5000,        // vs 30-50k€ en agence traditionnelle
        ecommerce: 6000,   // vs 40-60k€ en agence traditionnelle
        mobile: 5600,      // vs 40-80k€ en agence traditionnelle
        marketplace: 7000  // vs 60-100k€ en agence traditionnelle
      };
      
      // Multiplicateur de complexité ajusté pour l'IA
      const complexityMultiplier = 0.9 + (complexity[0] * 0.2); // 1.1 à 1.9
      
      // Multiplicateur de délai (urgent = équipe dédiée)
      const timelineMultiplier = timeline === 'urgent' ? 1.3 : 1;
      
      // Calcul du coût des features optionnelles
      const featuresCost = Object.entries(additionalFeatures)
        .filter(([_, selected]) => selected)
        .reduce((sum, [feature]) => sum + optionalFeatureCosts[feature as keyof typeof optionalFeatureCosts], 0);
      
      // Calcul du prix total
      const basePrice = basePrices[projectType as keyof typeof basePrices] || 2500;
      const estimatedCost = Math.round((basePrice + featuresCost) * complexityMultiplier * timelineMultiplier);
      
      // Estimation du temps de développement avec IA
      // 5-10x plus rapide qu'une équipe traditionnelle
      const baseWeeks = timeline === 'urgent' ? 2 : 3;
      const complexityWeeks = Math.ceil((complexity[0] - 3) * 0.3);
      const developmentWeeks = Math.max(2, Math.min(5, baseWeeks + complexityWeeks));
      
      // Calcul des économies réelles
      // Multiplicateur pour les features en agence traditionnelle (2-3x plus cher)
      const traditionalFeatureMultiplier = 2.5;
      const traditionalFeaturesCost = featuresCost * traditionalFeatureMultiplier;
      
      // Coût équipe traditionnelle (dev senior + junior + chef projet)
      const traditionalWeeks = developmentWeeks * 5; // 5x plus long sans IA
      const traditionalDailyRate = 600; // Taux journalier moyen équipe
      const traditionalBaseCost = traditionalWeeks * 5 * traditionalDailyRate;
      const internalTeamCost = Math.round((traditionalBaseCost + traditionalFeaturesCost) * complexityMultiplier * timelineMultiplier);
      
      // Coût agence classique (avec marges)
      const agencyMultiplier = 1.5; // Les agences ajoutent ~50% de marge
      const agencyCost = Math.round(internalTeamCost * agencyMultiplier);
      
      // Économies par rapport à une agence
      const savings = Math.max(0, agencyCost - estimatedCost);
      const savingsPercent = Math.round((savings / agencyCost) * 100);
      
      // ROI basé sur des cas réels de startups
      const roiMultipliers = {
        marketplace: 8,  // Les marketplaces ont un fort potentiel
        ecommerce: 6,    // E-commerce ROI rapide
        saas: 10,        // SaaS = revenus récurrents
        mobile: 5        // Apps mobiles plus variable
      };
      const potentialRevenue = estimatedCost * (roiMultipliers[projectType as keyof typeof roiMultipliers] || 8);
      
      return { 
        estimatedCost, 
        developmentWeeks, 
        potentialRevenue,
        savings,
        savingsPercent,
        agencyCost,
        internalTeamCost,
        traditionalWeeks
      };
    };
    
    const { estimatedCost, developmentWeeks, savings, savingsPercent, agencyCost, internalTeamCost, traditionalWeeks } = calculateROI();
    
    return (
      <div className="space-y-10">
        {/* Section principale */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Type de projet */}
          <div>
            <Label className="text-xl font-bold mb-6 block flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              {t('calculator.form.projectType.label')}
            </Label>
            <RadioGroup value={projectType} onValueChange={setProjectType} className="space-y-4">
              <div className="flex items-center space-x-4 p-4 rounded-xl border-2 hover:border-primary/50 bg-gradient-to-r from-background to-primary/5 hover:to-primary/10 transition-all duration-300">
                <RadioGroupItem value="saas" id="saas" />
                <Label htmlFor="saas" className="cursor-pointer flex-1">
                  <div className="font-semibold text-base">{t('calculator.form.projectType.saas')}</div>
                  <div className="text-sm text-muted-foreground mt-1">{t('calculator.form.projectType.saasIncludes')}</div>
                </Label>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl border-2 hover:border-purple-500/50 bg-gradient-to-r from-background to-purple-500/5 hover:to-purple-500/10 transition-all duration-300">
                <RadioGroupItem value="ecommerce" id="ecommerce" />
                <Label htmlFor="ecommerce" className="cursor-pointer flex-1">
                  <div className="font-semibold text-base">{t('calculator.form.projectType.ecommerce')}</div>
                  <div className="text-sm text-muted-foreground mt-1">{t('calculator.form.projectType.ecommerceIncludes')}</div>
                </Label>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl border-2 hover:border-pink-500/50 bg-gradient-to-r from-background to-pink-500/5 hover:to-pink-500/10 transition-all duration-300">
                <RadioGroupItem value="mobile" id="mobile" />
                <Label htmlFor="mobile" className="cursor-pointer flex-1">
                  <div className="font-semibold text-base">{t('calculator.form.projectType.mobile')}</div>
                  <div className="text-sm text-muted-foreground mt-1">{t('calculator.form.projectType.mobileIncludes')}</div>
                </Label>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl border-2 hover:border-orange-500/50 bg-gradient-to-r from-background to-orange-500/5 hover:to-orange-500/10 transition-all duration-300">
                <RadioGroupItem value="marketplace" id="marketplace" />
                <Label htmlFor="marketplace" className="cursor-pointer flex-1">
                  <div className="font-semibold text-base">{t('calculator.form.projectType.marketplace')}</div>
                  <div className="text-sm text-muted-foreground mt-1">{t('calculator.form.projectType.marketplaceIncludes')}</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Timeline et complexité */}
          <div className="space-y-8">
            {/* Timeline */}
            <div>
              <Label className="text-xl font-bold mb-6 block flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                {t('calculator.form.timeline.label')}
              </Label>
              <RadioGroup value={timeline} onValueChange={setTimeline} className="space-y-4">
                <div className="flex items-center space-x-4 p-4 rounded-xl border-2 hover:border-green-500/50 bg-gradient-to-r from-background to-green-500/5 hover:to-green-500/10 transition-all duration-300">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="cursor-pointer flex-1">
                    <div className="font-semibold text-base">{t('calculator.form.timeline.normal')}</div>
                    <div className="text-sm text-muted-foreground mt-1">{t('calculator.form.timeline.normalDesc')}</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl border-2 hover:border-orange-500/50 bg-gradient-to-r from-background to-orange-500/5 hover:to-orange-500/10 transition-all duration-300">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent" className="cursor-pointer flex-1">
                    <div className="font-semibold text-base">
                      {t('calculator.form.timeline.urgent')}
                      <span className="text-sm text-orange-500 ml-2 font-bold">(+35%)</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{t('calculator.form.timeline.urgentDesc')}</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Complexité */}
            <div>
              <Label className="text-xl font-bold mb-6 block flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <Layers className="h-4 w-4 text-white" />
                </div>
                {t('calculator.form.complexity.label')}
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent ml-auto">{complexity[0]}/5</span>
              </Label>
              <div className="p-6 rounded-xl bg-gradient-to-r from-muted/50 to-purple-100/20 dark:to-purple-900/10 border">
                <Slider
                  value={complexity}
                  onValueChange={setComplexity}
                  max={5}
                  min={1}
                  step={1}
                  className="mb-6"
                />
                <div className="flex justify-between text-sm text-muted-foreground px-2">
                  <span>{t('calculator.form.complexity.simple')}</span>
                  <span>{t('calculator.form.complexity.standard')}</span>
                  <span>{t('calculator.form.complexity.complex')}</span>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  {t('calculator.form.complexity.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features optionnelles */}
        <div>
          <Label className="text-xl font-bold mb-6 block flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            {t('calculator.form.optional.label')}
          </Label>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { key: 'payment', icon: '💳', color: 'from-green-500/10 to-emerald-500/10', border: 'hover:border-green-500/50' },
              { key: 'realtime', icon: '⚡', color: 'from-yellow-500/10 to-orange-500/10', border: 'hover:border-yellow-500/50' },
              { key: 'api', icon: '🔌', color: 'from-blue-500/10 to-cyan-500/10', border: 'hover:border-blue-500/50' },
              { key: 'analytics', icon: '📊', color: 'from-purple-500/10 to-pink-500/10', border: 'hover:border-purple-500/50' },
              { key: 'multiLanguage', icon: '🌍', color: 'from-indigo-500/10 to-purple-500/10', border: 'hover:border-indigo-500/50' },
              { key: 'emailNotifications', icon: '📧', color: 'from-pink-500/10 to-rose-500/10', border: 'hover:border-pink-500/50' },
              { key: 'fileUpload', icon: '📁', color: 'from-teal-500/10 to-green-500/10', border: 'hover:border-teal-500/50' },
              { key: 'search', icon: '🔍', color: 'from-orange-500/10 to-red-500/10', border: 'hover:border-orange-500/50' },
              { key: 'social', icon: '👥', color: 'from-blue-500/10 to-indigo-500/10', border: 'hover:border-blue-500/50' },
              { key: 'export', icon: '📄', color: 'from-gray-500/10 to-slate-500/10', border: 'hover:border-gray-500/50' }
            ].map((feature) => (
              <label 
                key={feature.key}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 ${feature.border} bg-gradient-to-r ${feature.color} transition-all duration-300 cursor-pointer group`}
              >
                <input
                  type="checkbox"
                  checked={additionalFeatures[feature.key as keyof typeof additionalFeatures]}
                  onChange={(e) => setAdditionalFeatures({...additionalFeatures, [feature.key]: e.target.checked})}
                  className="w-5 h-5 rounded"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="font-medium text-sm">
                      {t(`calculator.form.optional.${feature.key}`)}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground ml-10">
                    +{optionalFeatureCosts[feature.key as keyof typeof optionalFeatureCosts]}€
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        {/* Features incluses */}
        <Card className="bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 border-2 border-primary/20">
          <CardContent className="p-8">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              {t('calculator.included.title')}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { icon: Shield, text: t('calculator.included.auth') },
                { icon: Layers, text: t('calculator.included.admin') },
                { icon: Smartphone, text: t('calculator.included.responsive') },
                { icon: Database, text: t('calculator.included.database') },
                { icon: Server, text: t('calculator.included.hosting') },
                { icon: Lock, text: t('calculator.included.ssl') },
                { icon: GitBranch, text: t('calculator.included.versioning') },
                { icon: FileText, text: t('calculator.included.documentation') }
              ].map((item, _index) => (
                <div key={_index} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <item.icon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Résultats */}
        <div className="border-t-2 border-primary/20 pt-10">
          <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {t('calculator.results.title')}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-purple-500/5 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <Calculator className="h-10 w-10 text-primary mx-auto mb-4" />
                <p className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">{estimatedCost}€</p>
                <p className="text-sm text-muted-foreground font-medium">{t('calculator.results.cost')}</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-10 w-10 text-green-500 mx-auto mb-4" />
                <p className="text-5xl font-bold text-green-600 mb-2">-{savingsPercent}%</p>
                <p className="text-sm text-muted-foreground font-medium">{t('calculator.results.savings')}</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-pink-500/5 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <Clock className="h-10 w-10 text-purple-500 mx-auto mb-4" />
                <p className="text-5xl font-bold text-purple-600 mb-2">{developmentWeeks}</p>
                <p className="text-sm text-muted-foreground font-medium">{t('calculator.results.weeks')}</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Comparaison détaillée */}
          <Card className="mb-8 bg-gradient-to-br from-muted/30 to-purple-100/10 dark:to-purple-900/5 border-2 border-primary/10">
            <CardContent className="p-8">
              <h4 className="text-xl font-bold mb-6 text-center">{t('calculator.comparison.title')}</h4>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {/* Agence traditionnelle */}
                <div className="text-center p-4 rounded-lg bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30">
                  <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">{t('calculator.comparison.agency')}</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400 line-through">{Math.round(agencyCost)}€</p>
                  <p className="text-xs text-muted-foreground mt-1">{traditionalWeeks} {t('calculator.results.weeks')}</p>
                </div>
                
                {/* Équipe interne */}
                <div className="text-center p-4 rounded-lg bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30">
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-2">{t('calculator.comparison.internal')}</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 line-through">{Math.round(internalTeamCost)}€</p>
                  <p className="text-xs text-muted-foreground mt-1">{Math.round(traditionalWeeks * 0.8)} {t('calculator.results.weeks')}</p>
                </div>
                
                {/* Vibecodr */}
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-500/50">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">{t('calculator.comparison.vibecodr')}</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{estimatedCost}€</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">{developmentWeeks} {t('calculator.results.weeks')} ⚡</p>
                </div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">{t('calculator.comparison.yourAdvantage')}</p>
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <p className="text-2xl font-bold text-primary">{Math.round(savings)}€</p>
                    <p className="text-xs text-muted-foreground">{t('calculator.comparison.saved')}</p>
                  </div>
                  <div className="text-3xl">+</div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{Math.round(traditionalWeeks - developmentWeeks)}</p>
                    <p className="text-xs text-muted-foreground">{t('calculator.comparison.weeksSaved')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Link href="https://cal.com/vibecodr-mvp/15min" target="_blank" className="block">
            <Button size="lg" className="w-full h-16 text-lg shadow-2xl bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90 transition-all duration-300">
              <Calendar className="mr-3 h-6 w-6" />
              {t('calculator.cta')}
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
          
          <p className="text-xs text-center text-muted-foreground mt-6 italic">
            {t('calculator.disclaimer')}
          </p>
        </div>
      </div>
    );
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
              <Link href={`/${currentLang}/auth?tab=signup`}>
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all">
                  <Rocket className="mr-2 h-5 w-5" />
                  {t('hero.cta.start')}
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
            <Card className="border-2 mb-12">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">{t('technologies.architecture.title')}</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold mb-2">{t('technologies.architecture.frontend.title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('technologies.architecture.frontend.description')}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Server className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold mb-2">{t('technologies.architecture.backend.title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('technologies.architecture.backend.description')}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Database className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold mb-2">{t('technologies.architecture.data.title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('technologies.architecture.data.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why These Technologies */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">{t('technologies.why.performance.title')}</h3>
                  <p className="text-muted-foreground">{t('technologies.why.performance.description')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">{t('technologies.why.scalability.title')}</h3>
                  <p className="text-muted-foreground">{t('technologies.why.scalability.description')}</p>
                </CardContent>
              </Card>
            </div>
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

          <Card className="max-w-6xl mx-auto shadow-2xl border-2 border-primary/10 bg-gradient-to-br from-background via-background to-purple-50/5 dark:to-purple-950/5">
            <CardContent className="p-8 md:p-12">
              <CalculatorForm />
            </CardContent>
          </Card>
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
                  <Link href={`/${currentLang}/auth?tab=signup`}>
                    <Button className="w-full h-12 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all">
                      {t('pricing.mvp.cta')}
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
                  <Link href={`/${currentLang}/auth?tab=signup`}>
                    <Button className="w-full h-12 text-lg" variant="outline" size="lg">
                      {t('pricing.growth.cta')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 bg-gradient-to-b from-muted/10 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16 max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('methodology.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('methodology.subtitle')}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Process Timeline */}
            <Card className="mb-12">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-8 text-center">{t('methodology.timeline.title')}</h3>
                <div className="relative">
                  {[
                    { week: 1, key: 'discovery' },
                    { week: 2, key: 'design' },
                    { week: 3, key: 'development' },
                    { week: 4, key: 'testing' },
                    { week: 5, key: 'launch' }
                  ].map((phase, index) => (
                    <div key={phase.key} className="flex items-center mb-8 last:mb-0">
                      <div className="flex-shrink-0 w-20">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                          {phase.week}
                        </div>
                      </div>
                      <div className="flex-grow pl-8">
                        <h4 className="font-bold text-lg mb-1">
                          {t(`methodology.timeline.phases.${phase.key}.title`)}
                        </h4>
                        <p className="text-muted-foreground">
                          {t(`methodology.timeline.phases.${phase.key}.description`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tools & Methods */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <Layers className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-4">{t('methodology.tools.title')}</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Figma / Framer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>GitHub / GitLab</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Linear / Jira</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Slack / Discord</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <GitBranch className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-4">{t('methodology.deliverables.title')}</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{t('methodology.deliverables.item1')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{t('methodology.deliverables.item2')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{t('methodology.deliverables.item3')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{t('methodology.deliverables.item4')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
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

      {/* After MVP Section */}
      <section className="py-24 bg-gradient-to-b from-transparent to-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16 max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('afterMvp.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('afterMvp.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: TrendingUp, key: 'scaling', gradient: 'from-green-500 to-emerald-500' },
              { icon: Users, key: 'fundraising', gradient: 'from-blue-500 to-cyan-500' },
              { icon: Code, key: 'recruitment', gradient: 'from-purple-500 to-pink-500' },
              { icon: Layers, key: 'architecture', gradient: 'from-orange-500 to-red-500' }
            ].map((service, _index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: _index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                      <service.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      {t(`afterMvp.services.${service.key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t(`afterMvp.services.${service.key}.description`)}
                    </p>
                    <ul className="space-y-1">
                      {[1, 2, 3].map((i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{t(`afterMvp.services.${service.key}.feature${i}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="https://cal.com/vibecodr-mvp/15min" target="_blank">
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                {t('afterMvp.cta')}
              </Button>
            </Link>
          </div>
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
              <Link href={`/${currentLang}/auth?tab=signup`}>
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all h-12 px-8 text-lg">
                  <Rocket className="mr-2 h-5 w-5" />
                  {t('cta.button.start')}
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