import React from "react";
import Header from "@/components/Header";
import CustomFooter from "@/components/CustomFooter";
import SectionDivider from "@/components/vision-first/SectionDivider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  CodeIcon,
  LayoutIcon,
  BookTextIcon,
  ShieldCheckIcon,
  RocketIcon,
  FileTextIcon,
  UsersIcon,
  MapPinIcon,
  CheckIcon,
  StarIcon
} from "lucide-react";
import { getTranslations } from 'next-intl/server'; // Import pour les traductions serveur
import { locales, defaultLocale } from '../../../../next-intl.config'; // Ajout de cet import

// Décommenter et activer generateMetadata
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params; // Attendre la résolution des paramètres
  const { lang } = resolvedParams;
  const t = await getTranslations({ locale: lang, namespace: 'VisionFirstPage' });

  let metaTitle = "Vibecodr - Approche Vision-First"; 
  let metaDescription = "Découvrez comment structurer et valider votre produit digital avec l'approche Vision-First de Vibecodr.";
  try {
    metaTitle = t('metaTitle');
    metaDescription = t('metaDescription');
  } catch (e) {
    console.error(`Erreur lors de la récupération des métadonnées pour VisionFirstPage (lang: ${lang}):`, e);
  }

  const currentPath = "/vision-first";
  const alternatesLanguages: { [key: string]: string } = {};
  locales.forEach((loc: string) => { // Typage explicite pour loc
    alternatesLanguages[loc] = `/${loc}${currentPath}`;
  });
  alternatesLanguages['x-default'] = `/${defaultLocale}${currentPath}`;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `/${lang}${currentPath}`,
      languages: alternatesLanguages,
    },
    // Vous pouvez ajouter ici des métadonnées OpenGraph spécifiques à cette page si nécessaire,
    // sinon elles hériteront de celles du layout, ce qui est souvent suffisant.
  };
}

// Version compatible avec les exigences de Next.js pour les paramètres dynamiques
const VisionFirstPage = async (
  props: { params: { lang: string } }
) => {
  const { lang } = await props.params;
  
  const t = await getTranslations({ locale: lang, namespace: 'VisionFirstPage' });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <Header />
      <main className="flex-grow">
        {/* Section Hero */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="container mx-auto text-center">
            <Badge variant="outline" className="mb-4 border-indigo-200 text-indigo-600 dark:border-indigo-800 dark:text-indigo-400 px-4 py-1 text-sm">
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t('hero.title.span')}
              </span> {t('hero.title.main')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="rounded-full">
                <Link href={`/${lang}/auth?tab=signup`}>{t('hero.cta.startFree')}</Link> 
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full" disabled>
                <Link href="#">{t('hero.cta.exploreCodeGuide')} (bientôt)</Link> 
              </Button>
            </div>
          </div>
        </section>

        <SectionDivider type="wave" fillClassName="fill-white dark:fill-gray-900" />

        {/* Section Problématique */}
        <section className="py-16 bg-white dark:bg-gray-900 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('problem.title')}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('problem.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-red-100 dark:border-red-900/30 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-red-600 dark:text-red-400">
                    <div className="rounded-full bg-red-50 dark:bg-red-900/30 p-3">
                      <FileTextIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('problem.cards.documentation.title')}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('problem.cards.documentation.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-100 dark:border-red-900/30 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-red-600 dark:text-red-400">
                    <div className="rounded-full bg-red-50 dark:bg-red-900/30 p-3">
                      <UsersIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('problem.cards.misunderstanding.title')}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('problem.cards.misunderstanding.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-100 dark:border-red-900/30 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-red-600 dark:text-red-400">
                    <div className="rounded-full bg-red-50 dark:bg-red-900/30 p-3">
                      <RocketIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('problem.cards.unsuitable.title')}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('problem.cards.unsuitable.description')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <SectionDivider type="tilt" fillClassName="fill-indigo-50 dark:fill-indigo-950" />

        {/* Section Notre Approche */}
        <section className="py-16 bg-indigo-50 dark:bg-indigo-950 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('approach.title')}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('approach.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 p-3 text-indigo-600 dark:text-indigo-400">
                      <CodeIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('approach.structuredDefinition.title')}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t('approach.structuredDefinition.description')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{t('approach.structuredDefinition.item1')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{t('approach.structuredDefinition.item2')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{t('approach.structuredDefinition.item3')}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 p-3 text-indigo-600 dark:text-indigo-400">
                      <ShieldCheckIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('approach.smartValidation.title')}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t('approach.smartValidation.description')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{t('approach.smartValidation.item1')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{t('approach.smartValidation.item2')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{t('approach.smartValidation.item3')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 p-3 text-indigo-600 dark:text-indigo-400">
                      <BookTextIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('approach.technicalBlueprint.title')}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t('approach.technicalBlueprint.description')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{t('approach.technicalBlueprint.item1')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{t('approach.technicalBlueprint.item2')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{t('approach.technicalBlueprint.item3')}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 p-3 text-indigo-600 dark:text-indigo-400">
                      <LayoutIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('approach.concreteVisualization.title')}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t('approach.concreteVisualization.description')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{t('approach.concreteVisualization.item1')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{t('approach.concreteVisualization.item2')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{t('approach.concreteVisualization.item3')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider type="curve" fillClassName="fill-white dark:fill-gray-900" />

        {/* Section Outils */}
        <section className="py-16 bg-white dark:bg-gray-900 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('tools.title')}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('tools.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="relative border-gray-100 dark:border-gray-700/50 shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-indigo-50 dark:bg-indigo-900/30 w-12 h-12 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <CodeIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('tools.codeguide.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('tools.codeguide.description')}</p>
                  <div className="absolute bottom-4 right-4 text-4xl font-bold text-gray-100 dark:text-gray-800">1</div>
                  <div className="mt-4">
                    <Button variant="outline" asChild size="sm" className="w-full" disabled>
                      <Link href="#">{t('tools.codeguide.cta')} (bientôt)</Link> 
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative border-gray-100 dark:border-gray-700/50 shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-indigo-50 dark:bg-indigo-900/30 w-12 h-12 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <LayoutIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('tools.wireframeGenerator.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('tools.wireframeGenerator.description')}</p>
                  <div className="absolute bottom-4 right-4 text-4xl font-bold text-gray-100 dark:text-gray-800">2</div>
                  <div className="mt-4">
                    <Button variant="outline" asChild size="sm" className="w-full" disabled>
                      <Link href="#">{t('tools.wireframeGenerator.cta')} (bientôt)</Link> 
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative border-gray-100 dark:border-gray-700/50 shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-indigo-50 dark:bg-indigo-900/30 w-12 h-12 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <BookTextIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('tools.projectBlueprint.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('tools.projectBlueprint.description')}</p>
                  <div className="absolute bottom-4 right-4 text-4xl font-bold text-gray-100 dark:text-gray-800">3</div>
                  <div className="mt-4">
                    <Button variant="outline" asChild size="sm" className="w-full" disabled>
                      <Link href="#">{t('tools.projectBlueprint.cta')} (bientôt)</Link> 
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative border-gray-100 dark:border-gray-700/50 shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-indigo-50 dark:bg-indigo-900/30 w-12 h-12 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <ShieldCheckIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('tools.visionValidator.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('tools.visionValidator.description')}</p>
                  <div className="absolute bottom-4 right-4 text-4xl font-bold text-gray-100 dark:text-gray-800">4</div>
                  <div className="mt-4">
                    <Button variant="outline" asChild size="sm" className="w-full" disabled>
                      <Link href="#">{t('tools.visionValidator.cta')} (bientôt)</Link> 
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative border-gray-100 dark:border-gray-700/50 shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-indigo-50 dark:bg-indigo-900/30 w-12 h-12 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <RocketIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('tools.launchReadiness.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('tools.launchReadiness.description')}</p>
                  <div className="absolute bottom-4 right-4 text-4xl font-bold text-gray-100 dark:text-gray-800">5</div>
                  <div className="mt-4">
                    <Button variant="outline" asChild size="sm" className="w-full" disabled>
                      <Link href="#">{t('tools.launchReadiness.cta')} (bientôt)</Link> 
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <SectionDivider type="tilt" fillClassName="fill-indigo-50 dark:fill-indigo-900/20" />

        {/* Section Témoignages */}
        <section className="py-16 bg-indigo-50 dark:bg-indigo-900/20 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('testimonials.title')}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('testimonials.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-1 mb-4 text-yellow-500">
                      <StarIcon className="h-5 w-5 fill-yellow-500" />
                      <StarIcon className="h-5 w-5 fill-yellow-500" />
                      <StarIcon className="h-5 w-5 fill-yellow-500" />
                      <StarIcon className="h-5 w-5 fill-yellow-500" />
                      <StarIcon className="h-5 w-5 fill-yellow-500" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                      {t('testimonials.frederiqueM.quote')}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" 
                        alt={t('testimonials.frederiqueM.name')} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold">{t('testimonials.frederiqueM.name')}</p>
                      <p className="text-sm text-gray-500">{t('testimonials.frederiqueM.title')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-1 mb-4 text-yellow-500">
                      <StarIcon className="h-5 w-5 fill-yellow-500" />
                      <StarIcon className="h-5 w-5 fill-yellow-500" />
                      <StarIcon className="h-5 w-5 fill-yellow-500" />
                      <StarIcon className="h-5 w-5 fill-yellow-500" />
                      <StarIcon className="h-5 w-5 fill-yellow-500" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                      {t('testimonials.fredericT.quote')}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" 
                        alt={t('testimonials.fredericT.name')} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold">{t('testimonials.fredericT.name')}</p>
                      <p className="text-sm text-gray-500">{t('testimonials.fredericT.title')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-1 mb-4 text-yellow-500">
                      <StarIcon className="h-5 w-5 fill-yellow-500" />
                      <StarIcon className="h-5 w-5 fill-yellow-500" />
                      <StarIcon className="h-5 w-5 fill-yellow-500" />
                      <StarIcon className="h-5 w-5 fill-yellow-500" />
                      <StarIcon className="h-5 w-5 fill-yellow-500" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                      {t('testimonials.fredericL.quote')}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop" 
                        alt={t('testimonials.fredericL.name')} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold">{t('testimonials.fredericL.name')}</p>
                      <p className="text-sm text-gray-500">{t('testimonials.fredericL.title')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <SectionDivider type="wave" fillClassName="fill-white dark:fill-gray-900" />

        {/* Section Demo Interactive */}
        <section className="py-16 bg-white dark:bg-gray-900 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">{t('demo.title')}</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {t('demo.description')}
                </p>
                <div className="pt-4">
                  <Button size="lg" asChild disabled>
                    <Link href="#">{t('demo.cta')} (bientôt)</Link> 
                  </Button>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700/50 shadow-lg">
                <div className="bg-white dark:bg-gray-800 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 bg-red-400 rounded-full"></div>
                      <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
                      <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-500">CodeGuide</div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-indigo-50 dark:bg-gray-700 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-200">
                      {t('demo.chat.user1')}
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-3 rounded-lg text-sm border border-purple-100 dark:border-purple-800/20 text-gray-700 dark:text-gray-200">
                      <p className="mb-2">{t('demo.chat.ai1.line1')}</p>
                      <ol className="list-decimal ml-5 space-y-1">
                        <li>{t('demo.chat.ai1.item1')}</li>
                        <li>{t('demo.chat.ai1.item2')}</li>
                        <li>{t('demo.chat.ai1.item3')}</li>
                        <li>{t('demo.chat.ai1.item4')}</li>
                      </ol>
                      <p className="mt-2">{t('demo.chat.ai1.line2')}</p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-gray-700 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-200">
                      {t('demo.chat.user2')}
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-3 rounded-lg text-sm border border-purple-100 dark:border-purple-800/20 text-gray-700 dark:text-gray-200">
                      <p className="mb-2">{t('demo.chat.ai2.line1')}</p>
                      <ol className="list-decimal ml-5 space-y-1">
                        <li>{t('demo.chat.ai2.item1')}</li>
                        <li>{t('demo.chat.ai2.item2')}</li>
                        <li>{t('demo.chat.ai2.item3')}</li>
                        <li>{t('demo.chat.ai2.item4')}</li>
                      </ol>
                      <p className="mt-2">{t('demo.chat.ai2.line2')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section CTA */}
        <div className="bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950 px-4 md:px-6">
          <div className="container mx-auto py-20 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('cta.title.line1')}
                <span className="text-indigo-600 dark:text-indigo-400">
                  {t('cta.title.span')}
                </span>
                {t('cta.title.line2')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t('cta.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild className="rounded-full text-lg px-8 py-6">
                  <Link href={`/${lang}/auth?tab=signup`}>{t('cta.startFree')}</Link> 
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full text-lg px-8 py-6">
                  <Link href={`/${lang}/contact`}>{t('cta.talkToExpert')}</Link> 
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <CustomFooter />
    </div>
  );
};

export default VisionFirstPage; 