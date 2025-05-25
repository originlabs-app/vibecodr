'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Rocket, 
  Calculator,
  Clock,
  Briefcase,
  TrendingUp,
  Sparkles,
  Layers,
  GitBranch,
  FileText,
  Lock,
  Shield,
  Database,
  Server,
  Smartphone,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import CustomFooter from '@/components/CustomFooter';

const CalculatorPage = () => {
  const t = useTranslations('MvpDevelopmentPage');
  const params = useParams();
  const currentLang = params.lang as string || 'fr';

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

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
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <Link href={`/${currentLang}/mvp-development`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" />
              <span>Retour</span>
            </Link>
            
            <motion.div {...fadeIn} className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {t('calculator.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {t('calculator.subtitle')}
              </p>
            </motion.div>
          </div>

          <Card className="max-w-6xl mx-auto shadow-2xl border-2 border-primary/10 bg-gradient-to-br from-background via-background to-purple-50/5 dark:to-purple-950/5">
            <CardContent className="p-8 md:p-12">
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
                <Card className="bg-gradient-to-br from-primary/5 via-purple-500/5 border-2 border-primary/20">
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
                        <div key={_index} className="flex items-center gap-3 p-3 rounded-lg bg-background/5 backdrop-blur">
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
                  
                  <Link href={`/${currentLang}/mvp-development/discovery`} className="block">
                    <Button size="lg" className="w-full h-16 text-lg shadow-2xl bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90 transition-all duration-300">
                      <Rocket className="mr-2 h-6 w-6" />
                      Démarrer mon MVP
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  
                  <p className="text-xs text-center text-muted-foreground mt-6 italic">
                    {t('calculator.disclaimer')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <CustomFooter />
    </>
  );
};

export default CalculatorPage; 