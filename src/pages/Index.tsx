
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, MapPin, Volume2, Globe, Search, Languages, Headphones } from "lucide-react";
import ProcessSelection from "@/components/ProcessSelection";
import DocumentGuide from "@/components/DocumentGuide";
import OfficeFinder from "@/components/OfficeFinder";

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [audioEnabled, setAudioEnabled] = useState(false);

  const handleProcessSelect = (process) => {
    setSelectedProcess(process);
    setCurrentView('guide');
  };

  const handleFeatureClick = (featureType) => {
    switch (featureType) {
      case 'documents':
        setCurrentView('processes');
        break;
      case 'offices':
        setCurrentView('offices');
        break;
      case 'language':
        // Toggle through some sample languages
        const languages = ["English", "Spanish", "French", "German", "Arabic", "Chinese"];
        const currentIndex = languages.indexOf(selectedLanguage);
        const nextIndex = (currentIndex + 1) % languages.length;
        setSelectedLanguage(languages[nextIndex]);
        break;
      case 'audio':
        setAudioEnabled(!audioEnabled);
        if (!audioEnabled) {
          // Simulate audio feature
          const utterance = new SpeechSynthesisUtterance("Audio support is now enabled. I can read instructions aloud to help you navigate bureaucracy.");
          speechSynthesis.speak(utterance);
        }
        break;
    }
  };

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Smart Document Guidance",
      description: "Clear, step-by-step instructions for all required documents",
      type: "documents",
      interactive: true
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multi-language Support",
      description: `Get help in your native language (Current: ${selectedLanguage})`,
      type: "language",
      interactive: true
    },
    {
      icon: <Volume2 className="h-6 w-6" />,
      title: "Audio Support",
      description: `Accessible audio guidance for visually impaired users ${audioEnabled ? '(Active)' : '(Click to enable)'}`,
      type: "audio",
      interactive: true
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Office Finder",
      description: "Locate the right government offices near you",
      type: "offices",
      interactive: true
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For demo purposes, redirect to processes with search context
      console.log(`Searching for: ${searchQuery}`);
      setCurrentView('processes');
    }
  };

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
          <div className="flex items-center space-x-4">
            {audioEnabled && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Headphones className="h-3 w-3 mr-1" />
                Audio On
              </Badge>
            )}
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Languages className="h-3 w-3 mr-1" />
              {selectedLanguage}
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Offline Ready
            </Badge>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Quick Search</h2>
            <p className="text-slate-600">Find the process or document you need instantly</p>
          </div>
          <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input 
                type="text"
                placeholder="Search for visa, work permit, residence card..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3"
              />
            </div>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700 px-6">
              Search
            </Button>
          </form>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["Visa Application", "Work Permit", "Residence Card", "Tax Registration", "Health Insurance"].map((term) => (
              <Badge 
                key={term} 
                variant="secondary" 
                className="cursor-pointer hover:bg-teal-100 hover:text-teal-700"
                onClick={() => setSearchQuery(term)}
              >
                {term}
              </Badge>
            ))}
          </div>
        </div>
      </section>

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

      {/* Interactive Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-4">
            Why choose PaperPath?
          </h3>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Click on each feature to see how PaperPath makes bureaucracy accessible and simple
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`text-center transition-all duration-200 ${
                  feature.interactive 
                    ? 'hover:shadow-lg cursor-pointer hover:border-teal-200 hover:scale-105' 
                    : 'hover:shadow-lg'
                } ${
                  (feature.type === 'language' && selectedLanguage !== 'English') ||
                  (feature.type === 'audio' && audioEnabled)
                    ? 'border-teal-200 bg-teal-50'
                    : ''
                }`}
                onClick={() => feature.interactive && handleFeatureClick(feature.type)}
              >
                <CardHeader>
                  <div className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    (feature.type === 'language' && selectedLanguage !== 'English') ||
                    (feature.type === 'audio' && audioEnabled)
                      ? 'bg-teal-600 text-white'
                      : 'bg-teal-100 text-teal-600'
                  }`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{feature.description}</CardDescription>
                  {feature.interactive && (
                    <Badge variant="outline" className="text-teal-600 border-teal-200">
                      Click to try
                    </Badge>
                  )}
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
