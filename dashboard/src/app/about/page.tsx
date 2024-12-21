import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-8">À propos du Dashboard Boumerdes</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Notre Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Le Dashboard Boumerdes vise à simplifier et optimiser la gestion des hébergements touristiques dans l'état de Boumerdes. Notre plateforme offre une solution complète pour les propriétaires d'établissements et les autorités locales.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fonctionnalités Clés</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Gestion des hébergements</li>
              <li>Suivi des réservations</li>
              <li>Gestion des résidents</li>
              <li>Liste noire pour la sécurité</li>
              <li>Rapports et statistiques</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pour Qui ?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Notre dashboard est conçu pour :</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Propriétaires d'hébergements touristiques</li>
              <li>Gestionnaires de camps de vacances</li>
              <li>Autorités locales de Boumerdes</li>
              <li>Services de sécurité</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Notre Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Nous nous engageons à fournir une plateforme sécurisée, facile à utiliser et constamment mise à jour pour répondre aux besoins évolutifs du secteur touristique de Boumerdes. Notre équipe travaille en étroite collaboration avec les autorités locales et les propriétaires d'établissements pour garantir que notre solution répond aux exigences réglementaires et opérationnelles.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xl">
          Pour plus d'informations ou pour obtenir de l'aide, n'hésitez pas à nous contacter.
        </p>
      </div>
    </div>
  )
}

