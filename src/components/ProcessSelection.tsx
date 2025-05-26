
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Briefcase, Building, Users } from "lucide-react";

interface ProcessSelectionProps {
  onProcessSelect: (process: any) => void;
  onBack: () => void;
}

const ProcessSelection = ({ onProcessSelect, onBack }: ProcessSelectionProps) => {
  const processes = [
    {
      id: 'visa',
      title: 'Visa Application',
      description: 'Tourist, student, work, or family reunification visas',
      icon: <FileText className="h-8 w-8" />,
      color: 'bg-blue-100 text-blue-600',
      estimatedTime: '2-4 weeks',
      difficulty: 'Medium'
    },
    {
      id: 'internship',
      title: 'Internship Documents',
      description: 'Work permits and documents for internship programs',
      icon: <Briefcase className="h-8 w-8" />,
      color: 'bg-green-100 text-green-600',
      estimatedTime: '1-2 weeks',
      difficulty: 'Easy'
    },
    {
      id: 'government',
      title: 'Government Services',
      description: 'Social security, tax registration, healthcare enrollment',
      icon: <Building className="h-8 w-8" />,
      color: 'bg-purple-100 text-purple-600',
      estimatedTime: '1-3 weeks',
      difficulty: 'Medium'
    },
    {
      id: 'residency',
      title: 'Residency Permit',
      description: 'Temporary or permanent residence applications',
      icon: <Users className="h-8 w-8" />,
      color: 'bg-orange-100 text-orange-600',
      estimatedTime: '3-6 weeks',
      difficulty: 'Hard'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Select Your Process</h1>
            <p className="text-sm text-slate-600">Choose the administrative process you need help with</p>
          </div>
        </div>
      </header>

      {/* Process Grid */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {processes.map((process) => (
              <Card 
                key={process.id} 
                className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-teal-200"
                onClick={() => onProcessSelect(process)}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${process.color}`}>
                    {process.icon}
                  </div>
                  <CardTitle className="text-xl">{process.title}</CardTitle>
                  <CardDescription>{process.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">Est. Time:</span> {process.estimatedTime}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(process.difficulty)}`}>
                      {process.difficulty}
                    </span>
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Start Process
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Help Section */}
          <Card className="mt-8 border-teal-200 bg-teal-50">
            <CardHeader>
              <CardTitle className="text-teal-800">Need help choosing?</CardTitle>
              <CardDescription className="text-teal-700">
                Our smart assistant can help you determine which process you need based on your specific situation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-100">
                Get Personalized Recommendation
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ProcessSelection;
