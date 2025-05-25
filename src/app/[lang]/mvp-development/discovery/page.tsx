'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import CustomFooter from '@/components/CustomFooter';
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { 
  Rocket, 
  Code, 
  Users, 
  Shield, 
  Calendar,
  CheckCircle,
  Send,
  Building,
  Mail,
  Phone,
  MessageSquare,
  Euro,
  Timer,
  CheckSquare,
  ChevronRight,
  ChevronLeft,
  Target,
  Briefcase,
  Lock,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';

export default function DiscoveryPage() {
  const t = useTranslations('MvpDevelopmentPage');
  const params = useParams();
  const router = useRouter();
  const currentLang = params.lang as string || 'fr';

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4; // Ajout de l'étape Cal.com
  const [formData, setFormData] = useState({
    // Step 1: Contact Info
    name: '',
    company: '',
    email: '',
    phone: '',
    // Step 2: Project Details
    projectType: '',
    projectStatus: '', // nouveau: où en êtes-vous
    projectDescription: '',
    mainGoal: '',
    // Step 3: Budget & Constraints
    budget: '',
    timeline: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingToSupabase, setIsSubmittingToSupabase] = useState(false);
  
  // Initialiser Cal.com quand on arrive à l'étape 4
  useEffect(() => {
    if (currentStep === 4) {
      (async function () {
        const cal = await getCalApi({"namespace":"mvp-discovery"});
        cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
      })();
    }
  }, [currentStep]);

  const validateStep = (step: number) => {
    const newErrors: any = {};
    
    switch (step) {
      case 1:
        if (!formData.name) newErrors.name = t('discovery.form.errors.required');
        if (!formData.email) newErrors.email = t('discovery.form.errors.required');
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = t('discovery.form.errors.invalidEmail');
        }
        break;
      case 2:
        if (!formData.projectType) newErrors.projectType = t('discovery.form.errors.required');
        if (!formData.projectStatus) newErrors.projectStatus = t('discovery.form.errors.required');
        if (!formData.projectDescription) newErrors.projectDescription = t('discovery.form.errors.required');
        if (!formData.mainGoal) newErrors.mainGoal = t('discovery.form.errors.required');
        break;
      case 3:
        if (!formData.budget) newErrors.budget = t('discovery.form.errors.required');
        if (!formData.timeline) newErrors.timeline = t('discovery.form.errors.required');
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateStep(currentStep)) {
      // Si on passe de l'étape 3 à 4, envoyer les données à Supabase
      if (currentStep === 3) {
        setIsSubmittingToSupabase(true);
        try {
          const response = await fetch('https://lcyucxccfekersehfcmb.supabase.co/rest/v1/mvp_discovery_leads', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjeXVjeGNjZmVrZXJzZWhmY21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTE1MjYsImV4cCI6MjA2MzMyNzUyNn0.LX0aNRfrDKdrMCtwPz97pAOfZ2YpQZFujg73RWsu3OQ',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjeXVjeGNjZmVrZXJzZWhmY21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTE1MjYsImV4cCI6MjA2MzMyNzUyNn0.LX0aNRfrDKdrMCtwPz97pAOfZ2YpQZFujg73RWsu3OQ',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              name: formData.name,
              company: formData.company || null,
              email: formData.email,
              phone: formData.phone || null,
              project_type: formData.projectType,
              project_status: formData.projectStatus,
              project_description: formData.projectDescription,
              main_goal: formData.mainGoal,
              budget: formData.budget,
              timeline: formData.timeline,
              additional_info: formData.additionalInfo || null,
              locale: currentLang,
              source_page: 'mvp-development'
            }),
          });

          if (!response.ok) {
            console.error('Erreur lors de l\'envoi du formulaire');
            // On continue quand même vers Cal.com même si l'enregistrement échoue
          } else {
            console.log('Formulaire enregistré avec succès dans Supabase');
          }
        } catch (error) {
          console.error('Erreur réseau:', error);
          // On continue quand même vers Cal.com
        } finally {
          setIsSubmittingToSupabase(false);
        }
      }
      
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Pour l'étape 4, rien à faire car Cal.com gère tout
    // On pourrait ajouter un tracking ou une notification ici
    console.log('Form completed:', formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">{t('discovery.form.steps.contact.title')}</h3>
              <p className="text-muted-foreground">{t('discovery.form.steps.contact.subtitle')}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4" />
                  {t('discovery.form.fields.name')} *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
                  className={errors.name ? 'border-red-500' : ''}
                  placeholder={t('discovery.form.placeholders.name')}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="company" className="flex items-center gap-2 mb-2">
                  <Building className="h-4 w-4" />
                  {t('discovery.form.fields.company')}
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, company: e.target.value})}
                  placeholder={t('discovery.form.placeholders.company')}
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4" />
                  {t('discovery.form.fields.email')} *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder={t('discovery.form.placeholders.email')}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4" />
                  {t('discovery.form.fields.phone')}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, phone: e.target.value})}
                  placeholder={t('discovery.form.placeholders.phone')}
                />
              </div>
            </div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">{t('discovery.form.steps.project.title')}</h3>
              <p className="text-muted-foreground">{t('discovery.form.steps.project.subtitle')}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectType" className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4" />
                  {t('discovery.form.fields.projectType')} *
                </Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) => setFormData({...formData, projectType: value})}
                >
                  <SelectTrigger className={errors.projectType ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t('discovery.form.placeholders.projectType')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saas">{t('discovery.form.options.projectTypes.saas')}</SelectItem>
                    <SelectItem value="marketplace">{t('discovery.form.options.projectTypes.marketplace')}</SelectItem>
                    <SelectItem value="ecommerce">{t('discovery.form.options.projectTypes.ecommerce')}</SelectItem>
                    <SelectItem value="mobile">{t('discovery.form.options.projectTypes.mobile')}</SelectItem>
                    <SelectItem value="web">{t('discovery.form.options.projectTypes.web')}</SelectItem>
                    <SelectItem value="other">{t('discovery.form.options.projectTypes.other')}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>}
              </div>
              
              <div>
                <Label htmlFor="projectStatus" className="flex items-center gap-2 mb-2">
                  <Rocket className="h-4 w-4" />
                  {t('discovery.form.fields.projectStatus')} *
                </Label>
                <Select
                  value={formData.projectStatus}
                  onValueChange={(value) => setFormData({...formData, projectStatus: value})}
                >
                  <SelectTrigger className={errors.projectStatus ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t('discovery.form.placeholders.projectStatus')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">{t('discovery.form.options.projectStatus.idea')}</SelectItem>
                    <SelectItem value="inProgress">{t('discovery.form.options.projectStatus.inProgress')}</SelectItem>
                    <SelectItem value="readyToDeploy">{t('discovery.form.options.projectStatus.readyToDeploy')}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.projectStatus && <p className="text-red-500 text-sm mt-1">{errors.projectStatus}</p>}
              </div>
            </div>
            
            <div>
              <Label htmlFor="projectDescription" className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4" />
                {t('discovery.form.fields.projectDescription')} *
              </Label>
              <Textarea
                id="projectDescription"
                value={formData.projectDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, projectDescription: e.target.value})}
                className={errors.projectDescription ? 'border-red-500' : ''}
                placeholder={t('discovery.form.placeholders.projectDescription')}
                rows={4}
              />
              {errors.projectDescription && <p className="text-red-500 text-sm mt-1">{errors.projectDescription}</p>}
            </div>
            
            <div>
              <Label htmlFor="mainGoal" className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4" />
                {t('discovery.form.fields.mainGoal')} *
              </Label>
              <Select
                value={formData.mainGoal}
                onValueChange={(value) => setFormData({...formData, mainGoal: value})}
              >
                <SelectTrigger className={errors.mainGoal ? 'border-red-500' : ''}>
                  <SelectValue placeholder={t('discovery.form.placeholders.mainGoal')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="validate">{t('discovery.form.options.goals.validate')}</SelectItem>
                  <SelectItem value="launch">{t('discovery.form.options.goals.launch')}</SelectItem>
                  <SelectItem value="scale">{t('discovery.form.options.goals.scale')}</SelectItem>
                  <SelectItem value="pivot">{t('discovery.form.options.goals.pivot')}</SelectItem>
                  <SelectItem value="fundraise">{t('discovery.form.options.goals.fundraise')}</SelectItem>
                </SelectContent>
              </Select>
              {errors.mainGoal && <p className="text-red-500 text-sm mt-1">{errors.mainGoal}</p>}
            </div>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">{t('discovery.form.steps.budget.title')}</h3>
              <p className="text-muted-foreground">{t('discovery.form.steps.budget.subtitle')}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget" className="flex items-center gap-2 mb-2">
                  <Euro className="h-4 w-4" />
                  {t('discovery.form.fields.budget')} *
                </Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => setFormData({...formData, budget: value})}
                >
                  <SelectTrigger className={errors.budget ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t('discovery.form.placeholders.budget')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<5k">{t('discovery.form.options.budgets.small')}</SelectItem>
                    <SelectItem value="5k-10k">{t('discovery.form.options.budgets.medium')}</SelectItem>
                    <SelectItem value="10k-25k">{t('discovery.form.options.budgets.large')}</SelectItem>
                    <SelectItem value="25k+">{t('discovery.form.options.budgets.enterprise')}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
              </div>
              
              <div>
                <Label htmlFor="timeline" className="flex items-center gap-2 mb-2">
                  <Timer className="h-4 w-4" />
                  {t('discovery.form.fields.timeline')} *
                </Label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value) => setFormData({...formData, timeline: value})}
                >
                  <SelectTrigger className={errors.timeline ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t('discovery.form.placeholders.timeline')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">{t('discovery.form.options.timelines.asap')}</SelectItem>
                    <SelectItem value="1month">{t('discovery.form.options.timelines.month')}</SelectItem>
                    <SelectItem value="3months">{t('discovery.form.options.timelines.quarter')}</SelectItem>
                    <SelectItem value="6months">{t('discovery.form.options.timelines.semester')}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
              </div>
            </div>
            
            <div>
              <Label htmlFor="additionalInfo" className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4" />
                {t('discovery.form.fields.additionalInfo')}
              </Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, additionalInfo: e.target.value})}
                placeholder={t('discovery.form.placeholders.additionalInfo')}
                rows={4}
              />
            </div>
            
            {/* Summary */}
            <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  {t('discovery.form.summary.title')}
                </h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">{t('discovery.form.summary.project')}:</span> {formData.projectType}</p>
                  <p><span className="font-medium">{t('discovery.form.summary.status')}:</span> {formData.projectStatus}</p>
                  <p><span className="font-medium">{t('discovery.form.summary.goal')}:</span> {formData.mainGoal}</p>
                  <p><span className="font-medium">{t('discovery.form.summary.budget')}:</span> {formData.budget}</p>
                  <p><span className="font-medium">{t('discovery.form.summary.timeline')}:</span> {formData.timeline}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
        
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">{t('discovery.form.steps.booking.title')}</h3>
              <p className="text-muted-foreground">{t('discovery.form.steps.booking.subtitle')}</p>
            </div>
            
            <div className="min-h-[800px] rounded-lg overflow-hidden border">
              <Cal 
                namespace="mvp-discovery"
                calLink="vibecodr-mvp/15min"
                style={{width:"100%",height:"800px"}}
                config={{
                  layout:"month_view",
                  theme: "light",
                  name: formData.name,
                  email: formData.email,
                  notes: `
                    Type de projet: ${formData.projectType}
                    Situation: ${formData.projectStatus}
                    Description: ${formData.projectDescription}
                    Objectif: ${formData.mainGoal}
                    Budget: ${formData.budget}
                    Timeline: ${formData.timeline}
                    Info supplémentaires: ${formData.additionalInfo}
                  `
                }}
              />
            </div>
          </motion.div>
        );
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/5 flex items-center justify-center p-4 pt-24">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-blob animation-delay-4000" />
        </div>

        <div className="w-full max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-8">
            {/* Back link - séparé visuellement */}
            <div className="mb-8">
              <Link href={`/${currentLang}/mvp-development`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm">{t('discovery.back')}</span>
              </Link>
            </div>
            
            {/* Main content centered */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full border border-primary/20"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">{t('discovery.badge')}</span>
              </motion.div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {t('discovery.title')}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t('discovery.subtitle')}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{t('discovery.form.step')} {currentStep} / {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          </div>
          
          {/* Form Steps */}
          <Card className="border-2 shadow-xl">
            <CardContent className="p-8 md:p-10">
              {renderStep()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {t('discovery.form.buttons.previous')}
                </Button>
                
                {currentStep < totalSteps && (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmittingToSupabase}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  >
                    {isSubmittingToSupabase ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        {t('discovery.form.buttons.submitting')}
                      </>
                    ) : (
                      <>
                        {t('discovery.form.buttons.next')}
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Trust Indicators */}
          <div className="mt-8 mb-24 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>{t('discovery.form.trust.secure')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>{t('discovery.form.trust.gdpr')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{t('discovery.form.trust.response')}</span>
            </div>
          </div>
        </div>
      </main>
      <CustomFooter />
    </>
  );
} 