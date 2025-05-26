
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, MapPin, Volume2, Globe } from "lucide-react";
import ProcessSelection from "@/components/ProcessSelection";
import DocumentGuide from "@/components/DocumentGuide";
import OfficeFinder from "@/components/OfficeFinder";

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProcess, setSelectedProcess] = useState(null);

  const handleProcessSelect = (process) => {
    setSelectedProcess(process);
    setCurrentView('guide');
  };

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Smart Document Guidance",
      description: "Clear, step-by-step instructions for all required documents"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multi-language Support",
      description: "Get help in your native language"
    },
    {
      icon: <Volume2 className="h-6 w-6" />,
      title: "Audio Support",
      description: "Accessible audio guidance for visually impaired users"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Office Finder",
      description: "Locate the right government offices near you"
    }
  ];

  if (currentView === 'processes') {
    return <ProcessSelection onProcessSelect={handleProcessSelect} onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'guide' && selectedProcess) {
    return <DocumentGuide process={selectedProcess} onBack={() => setCurrentView('processes')} />;
  }

  if (currentView === 'offices') {
    return <OfficeFinder onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/b059634a-e514-4e56-aabb-a9ee24fed262.png" 
              alt="PaperPath Logo" 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">PaperPath</h1>
              <p className="text-sm text-slate-600">Clear steps, smart documents</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Offline Ready
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Navigate bureaucracy with confidence
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            PaperPath simplifies complex administrative processes for foreigners, immigrants, 
            and people in remote areas. Get step-by-step guidance in your language.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3"
              onClick={() => setCurrentView('processes')}
            >
              Start Your Process
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-3"
              onClick={() => setCurrentView('offices')}
            >
              Find Offices
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Why choose PaperPath?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to simplify your paperwork?
          </h3>
          <p className="text-xl mb-8 text-teal-100">
            Join thousands who have successfully completed their administrative processes with PaperPath.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3"
            onClick={() => setCurrentView('processes')}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/lovable-uploads/b059634a-e514-4e56-aabb-a9ee24fed262.png" 
              alt="PaperPath Logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold">PaperPath</span>
          </div>
          <p className="text-slate-400">
            Making bureaucracy accessible for everyone, everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
