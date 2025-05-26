
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle, FileText, AlertCircle, Volume2 } from "lucide-react";

interface DocumentGuideProps {
  process: any;
  onBack: () => void;
}

const DocumentGuide = ({ process, onBack }: DocumentGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Sample document steps for visa application
  const steps = [
    {
      title: "Passport & Identity",
      documents: [
        { name: "Valid Passport", required: true, description: "Must be valid for at least 6 months beyond intended stay" },
        { name: "Birth Certificate", required: true, description: "Official copy with apostille if from another country" },
        { name: "National ID Card", required: false, description: "If available, can serve as additional identification" }
      ],
      tips: [
        "Make photocopies of all documents",
        "Ensure passport has at least 2 blank pages",
        "Check expiration dates carefully"
      ]
    },
    {
      title: "Financial Documentation",
      documents: [
        { name: "Bank Statements", required: true, description: "Last 3 months showing sufficient funds" },
        { name: "Employment Letter", required: true, description: "From current employer with salary details" },
        { name: "Tax Returns", required: false, description: "Last 2 years if self-employed" }
      ],
      tips: [
        "Bank statements must show consistent income",
        "Have backup financial documents ready",
        "Ensure all documents are recent (within 30 days)"
      ]
    },
    {
      title: "Purpose of Travel",
      documents: [
        { name: "Invitation Letter", required: true, description: "From host country contact or organization" },
        { name: "Travel Itinerary", required: true, description: "Detailed plan of your stay" },
        { name: "Hotel Reservations", required: false, description: "If not staying with host" }
      ],
      tips: [
        "Invitation letter should include host's contact details",
        "Keep travel plans flexible but documented",
        "Include return travel arrangements"
      ]
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center mb-4">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-800">{process.title} Guide</h1>
              <p className="text-sm text-slate-600">Step-by-step document preparation</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => playAudio(`Step ${currentStep + 1}: ${currentStepData.title}`)}
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Audio
            </Button>
          </div>
          
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Progress</span>
              <span className="text-slate-600">Step {currentStep + 1} of {steps.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Process Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      index === currentStep ? 'bg-teal-100 text-teal-700' : 
                      index < currentStep ? 'bg-green-50 text-green-700' : 'text-slate-600'
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === currentStep ? 'bg-teal-600 text-white' :
                      index < currentStep ? 'bg-green-600 text-white' : 'bg-slate-300 text-slate-600'
                    }`}>
                      {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Current Step Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <FileText className="h-6 w-6 mr-2 text-teal-600" />
                  {currentStepData.title}
                </CardTitle>
                <CardDescription>
                  Gather the following documents for this step
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentStepData.documents.map((doc, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      doc.required ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {doc.required ? <AlertCircle className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-slate-800">{doc.name}</h4>
                        <Badge variant={doc.required ? "destructive" : "secondary"} className="text-xs">
                          {doc.required ? "Required" : "Optional"}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{doc.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">💡 Helpful Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {currentStepData.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-blue-700">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button 
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Process
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentGuide;
